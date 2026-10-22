import { test } from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { headScript, isOfferLive, isOfferLiveAtBuild, OFFER_END_MS } from "../lib/offer.ts";

test("offer ends at midnight going into 1.1.2027, Helsinki time", () => {
  assert.equal(new Date(OFFER_END_MS).toISOString(), "2026-12-31T22:00:00.000Z");
});

test("live on launch day and on the last day", () => {
  assert.equal(isOfferLive(new Date("2026-10-22T12:00:00+03:00")), true);
  assert.equal(isOfferLive(new Date("2026-12-31T23:59:59+02:00")), true);
});

test("ended from the first second of 2027 in Helsinki", () => {
  assert.equal(isOfferLive(new Date("2027-01-01T00:00:00+02:00")), false);
  assert.equal(isOfferLive(new Date("2027-06-01T12:00:00+03:00")), false);
});

test("a visitor in another timezone sees the same instant", () => {
  // 23:30 UTC on 31.12 is already 01:30 on 1.1 in Helsinki.
  assert.equal(isOfferLive(new Date("2026-12-31T23:30:00Z")), false);
  // 21:30 UTC on 31.12 is 23:30 on 31.12 in Helsinki.
  assert.equal(isOfferLive(new Date("2026-12-31T21:30:00Z")), true);
});

test("build time can be mocked with OFFER_BUILD_TIME", () => {
  const before = process.env.OFFER_BUILD_TIME;
  process.env.OFFER_BUILD_TIME = "2027-01-02T10:00:00+02:00";
  assert.equal(isOfferLiveAtBuild(), false);
  process.env.OFFER_BUILD_TIME = "2026-11-01T10:00:00+02:00";
  assert.equal(isOfferLiveAtBuild(), true);
  if (before === undefined) delete process.env.OFFER_BUILD_TIME;
  else process.env.OFFER_BUILD_TIME = before;
});

/** Runs the real head script against a fake document with a mocked clock. */
function runHead(nowIso: string, hash = "") {
  const attrs: Record<string, string> = {};
  const removed: string[] = [];
  let replacedWith: string | null = null;
  let onReady: (() => void) | null = null;
  const schema = { parentNode: { removeChild: () => removed.push("offer-schema") } };
  const ctx = {
    Date: { now: () => Date.parse(nowIso), parse: Date.parse },
    URLSearchParams,
    localStorage: { getItem: () => null },
    window: { matchMedia: () => ({ matches: false }) },
    location: { search: "", hash, replace: (to: string) => (replacedWith = to) },
    document: {
      documentElement: { setAttribute: (k: string, v: string) => (attrs[k] = v) },
      addEventListener: (_: string, fn: () => void) => (onReady = fn),
      querySelectorAll: () => [schema],
    },
    isNaN,
  };
  runInNewContext(headScript("/yhteystiedot/"), ctx);
  (onReady as (() => void) | null)?.();
  return { attrs, removed, replacedWith };
}

test("head script marks the offer live before the end", () => {
  const r = runHead("2026-12-31T20:00:00Z");
  assert.equal(r.attrs["data-offer"], "live");
  assert.deepEqual(r.removed, []);
});

test("head script ends the offer and removes the Offer schema after the end", () => {
  const r = runHead("2027-01-01T00:00:01+02:00");
  assert.equal(r.attrs["data-offer"], "ended");
  assert.deepEqual(r.removed, ["offer-schema"]);
});

test("head script defaults to dark when the OS has no light preference", () => {
  assert.equal(runHead("2026-11-01T00:00:00Z").attrs["data-theme"], "dark");
});

test("head script sends old pricing anchors to the contact page", () => {
  assert.equal(runHead("2026-11-01T00:00:00Z", "#pricing").replacedWith, "/yhteystiedot/");
  assert.equal(runHead("2026-11-01T00:00:00Z", "#hinnasto").replacedWith, "/yhteystiedot/");
  assert.equal(runHead("2026-11-01T00:00:00Z", "#services").replacedWith, null);
});
