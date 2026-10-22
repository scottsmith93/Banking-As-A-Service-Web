import { useEffect, useRef, useState } from "react";
import type { AnimationItem } from "lottie-web";

export default function BaasCardCelebration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const controller = new AbortController();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: AnimationItem | undefined;
    let disposed = false;

    const applyMotionPreference = () => {
      if (!animation) return;
      if (reducedMotion.matches) animation.goToAndStop(animation.totalFrames - 1, true);
      else animation.goToAndPlay(0, true);
    };

    const load = async () => {
      try {
        // Load the renderer and the original local asset only when success is shown.
        const [renderer, response] = await Promise.all([
          import("lottie-web"),
          fetch("/assets/banking-baas/card-created.json", { signal: controller.signal }),
        ]);
        if (!response.ok) throw new Error("Unable to load celebration artwork");
        const animationData = await response.json();
        if (disposed) return;
        animation = renderer.default.loadAnimation({
          container,
          renderer: "svg",
          animationData,
          loop: false,
          autoplay: false,
          rendererSettings: { preserveAspectRatio: "xMidYMid meet", focusable: false },
        });
        animation.addEventListener("DOMLoaded", () => {
          if (disposed) return;
          applyMotionPreference();
          setIsReady(true);
        });
      } catch {
        // Keep the existing illustration if the optional animation cannot load.
      }
    };

    void load();
    reducedMotion.addEventListener("change", applyMotionPreference);
    return () => {
      disposed = true;
      controller.abort();
      reducedMotion.removeEventListener("change", applyMotionPreference);
      animation?.destroy();
    };
  }, []);

  return (
    <div className="baasCardIssueSuccess__artwork baasCardCelebration" data-animation-ready={isReady} aria-hidden="true">
      <img className="baasCardCelebration__poster" src="/assets/banking-baas/card-created.svg" alt="" width={300} height={300} />
      <div className="baasCardCelebration__player" ref={containerRef} />
    </div>
  );
}
