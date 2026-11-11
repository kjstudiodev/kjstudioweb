"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { ArchitectureScene } from "@/lib/architecture-scene";

export function SoftwareCanvas({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const host = hostRef.current;
    if (!stage || !host) return;
    const desktop = window.matchMedia("(min-width: 681px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let controller: ArchitectureScene | undefined;
    let cancelled = false;
    let loading = false;
    let inView = false;
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const eligible = () => desktop.matches && !motion.matches && !connection?.saveData;

    function destroy() {
      stage!.removeAttribute("data-ready");
      controller?.dispose();
      controller = undefined;
    }
    async function load() {
      if (cancelled || loading || controller || !eligible() || !inView || document.hidden) return;
      loading = true;
      try {
        const { mountArchitectureScene } = await import("@/lib/architecture-scene");
        if (cancelled || !eligible() || !inView || document.hidden) return;
        controller = mountArchitectureScene(host!, destroy);
        stage!.setAttribute("data-ready", "true");
        controller.setVisible(true);
      } catch {
        // Keep the server-rendered image if WebGL or the chunk is unavailable.
        destroy();
      } finally {
        loading = false;
      }
    }
    function schedule() {
      if (cancelled || !eligible() || !inView || controller || loading) return;
      if ("requestIdleCallback" in window) {
        if (idleId !== undefined) window.cancelIdleCallback(idleId);
        idleId = window.requestIdleCallback(() => { void load(); }, { timeout: 1500 });
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => { void load(); }, 250);
      }
    }
    function update() {
      if (!eligible()) destroy();
      else if (controller) controller.setVisible(inView && !document.hidden);
      else if (document.readyState === "complete") schedule();
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { threshold: 0.1 });
    observer.observe(stage);
    desktop.addEventListener("change", update);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("load", schedule);

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      clearTimeout(timer);
      observer.disconnect();
      desktop.removeEventListener("change", update);
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("load", schedule);
      destroy();
    };
  }, []);

  return (
    <div ref={stageRef} className="architecture-stage">
      {children}
      <div ref={hostRef} className="architecture-canvas" />
    </div>
  );
}
