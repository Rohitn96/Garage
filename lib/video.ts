/**
 * Ref callback for background videos. Mobile Safari only autoplays a video
 * that is muted at the moment playback starts, and React sets `muted` as a
 * property rather than an attribute, so this sets both and starts playback
 * explicitly. A rejected play() (power saving, data saver) leaves the poster.
 */
export function startMuted(video: HTMLVideoElement | null) {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  const attempt = video.play();
  if (attempt) attempt.catch(() => undefined);
}
