import { SITE } from "../site.config.ts";

/**
 * The launch offer's clock.
 *
 * The site is a static export, so "is the offer live" is answered twice:
 *
 *   1. At build time, by `isOfferLiveAtBuild()`. Server and client both read the
 *      same inlined build timestamp (OFFER_BUILD_TIME, set in next.config.mjs),
 *      so hydration never disagrees with the HTML. A build made after the end
 *      date leaves the offer out of the HTML entirely.
 *   2. In the visitor's browser, before first paint, by the head script from
 *      `headScript()`. It sets `data-offer` on <html>; CSS hides whichever
 *      variant does not apply, and the script turns the Offer JSON-LD into an
 *      inert text/plain block. That is what makes the offer expire on time with
 *      no code change and no rebuild.
 *
 * The schema block is neutralised in place, never removed: deleting a node
 * React rendered makes hydration fail, and React then re-renders the whole
 * document, which puts the live state straight back.
 */

/** First millisecond after the offer, as epoch ms. */
export const OFFER_END_MS = Date.parse(SITE.offer.endsAt);

export function isOfferLive(now: Date | number): boolean {
  const ms = typeof now === "number" ? now : now.getTime();
  return ms < OFFER_END_MS;
}

/**
 * The build's notion of "now". OFFER_BUILD_TIME is inlined by next.config.mjs
 * and can be mocked with OFFER_NOW at build time to test expiry.
 */
function buildTime(): Date {
  const stamp = process.env.OFFER_BUILD_TIME;
  const parsed = stamp ? Date.parse(stamp) : NaN;
  return Number.isNaN(parsed) ? new Date() : new Date(parsed);
}

export function isOfferLiveAtBuild(): boolean {
  return isOfferLive(buildTime());
}

/**
 * The inline <head> script: theme, offer state and legacy anchors, all before
 * first paint. Kept tiny and dependency free; it runs on every page load.
 *
 * `?offer-now=2027-01-02` overrides the clock, for testing expiry in a browser.
 */
export function headScript(contactPath: string): string {
  return `(function(){var d=document.documentElement;var t=null;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.setAttribute("data-theme",t);var n=Date.now();try{var q=new URLSearchParams(location.search).get("offer-now");if(q){var p=Date.parse(q);if(!isNaN(p))n=p}}catch(e){}var live=n<${OFFER_END_MS};d.setAttribute("data-offer",live?"live":"ended");if(!live){document.addEventListener("DOMContentLoaded",function(){var s=document.querySelectorAll("script[data-offer-schema]");for(var i=0;i<s.length;i++)s[i].setAttribute("type","text/plain")})}var h=location.hash;if(h==="#pricing"||h==="#hinnasto"||h==="#contact"){location.replace(${JSON.stringify(contactPath)})}})();`;
}
