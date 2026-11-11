import * as THREE from "three";
import { createArchitectureModel } from "./architecture-model";

export type ArchitectureScene = ReturnType<typeof mountArchitectureScene>;

export function mountArchitectureScene(host: HTMLDivElement, onUnavailable: () => void) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setClearColor(0x050a14, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 4, -4, 0.1, 60);
  camera.position.set(8, 7.5, 10);
  camera.lookAt(0, 0.2, 0);
  scene.add(new THREE.HemisphereLight(0xddeaff, 0x24304b, 2.6));
  const key = new THREE.DirectionalLight(0xffffff, 3.4);
  key.position.set(-3, 8, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x709bff, 2.8);
  rim.position.set(5, 3, -4);
  scene.add(rim);
  const model = createArchitectureModel();
  scene.add(model.root);

  let disposed = false;
  let visible = false;
  let frame = 0;
  let time = 0;
  let lastTime = 0;
  let lastPaint = 0;
  let pointerX = 0;
  let pointerY = 0;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  function resize() {
    if (disposed) return;
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5, Math.sqrt(600_000 / (width * height))));
    renderer.setSize(width, height, false);
    const halfHeight = 3;
    camera.left = -halfHeight * width / height;
    camera.right = halfHeight * width / height;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    model.update(time, time < 2);
    renderer.render(scene, camera);
  }

  function animate(now: number) {
    if (disposed || !visible) return;
    frame = requestAnimationFrame(animate);
    if (now - lastPaint < 1000 / 30) return;
    const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.1) : 0;
    lastTime = now;
    lastPaint = now;
    time += delta;
    model.root.rotation.y = THREE.MathUtils.damp(model.root.rotation.y, pointerX * 0.13, 5, delta);
    model.root.rotation.x = THREE.MathUtils.damp(model.root.rotation.x, pointerY * 0.06, 5, delta);
    model.update(time, time < 2);
    renderer.render(scene, camera);
  }

  function onPointerMove(event: PointerEvent) {
    if (!finePointer.matches) return;
    const bounds = host.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    pointerY = (event.clientY - bounds.top) / bounds.height * 2 - 1;
  }
  function onPointerLeave() {
    pointerX = 0;
    pointerY = 0;
  }
  function setVisible(next: boolean) {
    if (disposed || visible === next) return;
    visible = next;
    cancelAnimationFrame(frame);
    lastTime = 0;
    if (visible) frame = requestAnimationFrame(animate);
  }
  function onContextLost(event: Event) {
    event.preventDefault();
    setVisible(false);
    onUnavailable();
  }

  const observer = new ResizeObserver(resize);
  observer.observe(host);
  host.addEventListener("pointermove", onPointerMove, { passive: true });
  host.addEventListener("pointerleave", onPointerLeave);
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);
  resize();

  return {
    setVisible,
    dispose() {
      if (disposed) return;
      setVisible(false);
      disposed = true;
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      model.dispose();
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
