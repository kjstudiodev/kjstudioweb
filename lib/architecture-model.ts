import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export function createArchitectureModel() {
  const root = new THREE.Group();
  const resources: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(resource: T) => {
    resources.push(resource);
    return resource;
  };
  const material = (color: number, metalness = 0.25, roughness = 0.5) =>
    track(new THREE.MeshStandardMaterial({ color, metalness, roughness }));
  const graphite = material(0x172235);
  const surface = material(0x25334a);
  const silver = material(0xa8b6cc, 0.45, 0.35);
  const paper = material(0xd9e3ef, 0.2, 0.5);
  const blue = material(0x2563eb, 0.2, 0.35);
  blue.emissive.setHex(0x123aab);
  blue.emissiveIntensity = 0.25;
  const lightBlue = track(new THREE.MeshBasicMaterial({ color: 0x719fff }));
  const edge = track(new THREE.LineBasicMaterial({ color: 0x657791 }));
  const gridMaterial = track(new THREE.LineBasicMaterial({ color: 0x293951 }));
  const circuitMaterial = track(new THREE.MeshBasicMaterial({ color: 0x3c5984 }));
  const geometryCache = new Map<string, THREE.BufferGeometry>();

  function box(parent: THREE.Group, size: [number, number, number], position: [number, number, number], finish: THREE.Material = graphite, outlined = false) {
    const key = size.join();
    let geometry = geometryCache.get(key);
    if (!geometry) {
      geometry = track(new RoundedBoxGeometry(...size, 2, Math.min(...size) * 0.18));
      geometryCache.set(key, geometry);
    }
    const mesh = new THREE.Mesh(geometry, finish);
    mesh.position.set(...position);
    parent.add(mesh);
    if (outlined) {
      const lines = new THREE.LineSegments(track(new THREE.EdgesGeometry(geometry, 24)), edge);
      lines.position.copy(mesh.position);
      parent.add(lines);
    }
    return mesh;
  }

  // The board and etched grid remain still while the modules assemble above it.
  const board = new THREE.Group();
  root.add(board);
  box(board, [7.2, 0.16, 4.5], [0, -0.2, 0], graphite, true);
  box(board, [6.85, 0.035, 4.15], [0, -0.095, 0], surface);
  const gridVertices: number[] = [];
  for (let x = -3; x <= 3; x += 0.5) gridVertices.push(x, -0.074, -1.85, x, -0.074, 1.85);
  for (let z = -1.5; z <= 1.5; z += 0.5) gridVertices.push(-3.2, -0.074, z, 3.2, -0.074, z);
  const gridGeometry = track(new THREE.BufferGeometry());
  gridGeometry.setAttribute("position", new THREE.Float32BufferAttribute(gridVertices, 3));
  board.add(new THREE.LineSegments(gridGeometry, gridMaterial));
  for (const x of [-3.3, 3.3]) {
    for (const z of [-1.95, 1.95]) box(board, [0.09, 0.018, 0.09], [x, -0.065, z], silver);
  }

  const modules: { group: THREE.Group; delay: number }[] = [];
  function moduleAt(x: number, z: number, delay: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    root.add(group);
    modules.push({ group, delay });
    return group;
  }

  const app = moduleAt(-2.2, 0.5, 0);
  box(app, [1.95, 0.12, 1.7], [0, 0.08, 0], surface, true);
  box(app, [1.95, 0.12, 1.7], [0, 0.29, 0], graphite, true);
  box(app, [1.95, 0.12, 1.7], [0, 0.5, 0], paper);
  box(app, [1.73, 0.035, 1.47], [0, 0.58, 0], graphite);
  box(app, [1.57, 0.025, 0.13], [0, 0.61, -0.55], surface);
  for (let i = 0; i < 3; i++) box(app, [0.06, 0.03, 0.06], [-0.65 + i * 0.13, 0.63, -0.55], i === 0 ? blue : silver);
  box(app, [0.3, 0.025, 0.94], [-0.61, 0.61, 0.1], surface);
  box(app, [0.86, 0.03, 0.3], [0.18, 0.62, -0.18], surface);
  box(app, [0.57, 0.04, 0.08], [0.03, 0.65, -0.2], silver);
  for (let i = 0; i < 3; i++) box(app, [0.86 - i * 0.13, 0.025, 0.035], [0.18 - i * 0.065, 0.62, 0.13 + i * 0.12], silver);
  box(app, [0.42, 0.04, 0.15], [-0.04, 0.63, 0.55], blue);

  // Three suspended service layers, with instanced pins around the core.
  const api = moduleAt(0, -0.15, 0.16);
  box(api, [1.95, 0.1, 1.95], [0, 0.04, 0], surface, true);
  const coreLayers = [0.3, 0.67, 1.04].map((y, index) => {
    const group = new THREE.Group();
    group.position.y = y;
    api.add(group);
    box(group, [1.62, 0.2, 1.62], [0, 0, 0], index === 1 ? blue : graphite, index !== 1);
    return { group, y };
  });
  const coreLid = coreLayers[2].group;
  box(coreLid, [1.4, 0.025, 1.4], [0, 0.115, 0], surface);
  const pinGeometry = track(new THREE.BoxGeometry(0.1, 0.055, 0.2));
  const pins = track(new THREE.InstancedMesh(pinGeometry, silver, 24));
  const matrix = new THREE.Matrix4();
  for (let i = 0; i < 6; i++) {
    const p = -0.66 + i * 0.264;
    for (let side = 0; side < 4; side++) {
      matrix.makeRotationY(side < 2 ? 0 : Math.PI / 2);
      matrix.setPosition(side < 2 ? p : (side === 2 ? -1 : 1), 0.1, side < 2 ? (side === 0 ? -1 : 1) : p);
      pins.setMatrixAt(i * 4 + side, matrix);
    }
  }
  api.add(pins);
  const glyphVertices = [
    -0.28, 0.14, -0.29, -0.47, 0.14, -0.1,
    -0.47, 0.14, -0.1, -0.28, 0.14, 0.09,
    0.28, 0.14, -0.29, 0.47, 0.14, -0.1,
    0.47, 0.14, -0.1, 0.28, 0.14, 0.09,
    0.13, 0.14, -0.37, -0.13, 0.14, 0.17,
  ];
  const glyphGeometry = track(new THREE.BufferGeometry());
  glyphGeometry.setAttribute("position", new THREE.Float32BufferAttribute(glyphVertices, 3));
  coreLid.add(new THREE.LineSegments(glyphGeometry, track(new THREE.LineBasicMaterial({ color: 0xcad9f0 }))));
  box(coreLid, [0.35, 0.025, 0.04], [0, 0.14, 0.45], blue);

  const data = moduleAt(2.25, -0.65, 0.32);
  box(data, [1.7, 0.1, 1.7], [0, 0.02, 0], surface, true);
  const disk = track(new THREE.CylinderGeometry(0.65, 0.65, 0.22, 40));
  const diskEdge = track(new THREE.EdgesGeometry(disk, 25));
  for (let i = 0; i < 4; i++) {
    const mesh = new THREE.Mesh(disk, i === 3 ? silver : graphite);
    mesh.position.y = 0.25 + i * 0.29;
    data.add(mesh);
    const outline = new THREE.LineSegments(diskEdge, edge);
    outline.position.copy(mesh.position);
    data.add(outline);
  }
  const ring = new THREE.Mesh(track(new THREE.TorusGeometry(0.653, 0.015, 4, 48)), lightBlue);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.61;
  data.add(ring);

  const routePoints = [
    [[-1.22, 0.02, 0.65], [-0.95, 0.02, 0.65], [-0.95, 0.02, 1.38], [0.25, 0.02, 1.38], [0.25, 0.02, 0.82]],
    [[0.98, 0.02, -0.4], [1.36, 0.02, -0.4], [1.36, 0.02, -0.65], [1.6, 0.02, -0.65]],
    [[-2.2, 0.02, -0.4], [-2.2, 0.02, -1.5], [-0.3, 0.02, -1.5], [-0.3, 0.02, -1.12]],
  ];
  const packets = routePoints.map((points, index) => {
    const route = new THREE.CurvePath<THREE.Vector3>();
    for (let i = 1; i < points.length; i++) {
      route.add(new THREE.LineCurve3(new THREE.Vector3(...points[i - 1]), new THREE.Vector3(...points[i])));
    }
    board.add(new THREE.Mesh(track(new THREE.TubeGeometry(route, 48, 0.012, 4, false)), circuitMaterial));
    const packet = box(board, [0.1, 0.055, 0.1], [0, 0.02, 0], lightBlue);
    return { mesh: packet, route, offset: index * 0.31 };
  });

  const service = moduleAt(-1.25, -1.5, 0.24);
  box(service, [0.64, 0.16, 0.54], [0, 0.12, 0], graphite, true);
  box(service, [0.4, 0.04, 0.3], [0, 0.22, 0], silver);

  return {
    root,
    update(time: number, assembling: boolean) {
      for (const { group, delay } of modules) {
        const progress = THREE.MathUtils.clamp((time - delay) / 1.35, 0, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        group.position.y = assembling ? (1 - ease) * 1.8 : 0;
        group.scale.setScalar(assembling ? 0.88 + ease * 0.12 : 1);
      }
      for (const [index, { group, y }] of coreLayers.entries()) {
        const progress = THREE.MathUtils.clamp((time - index * 0.14) / 1.4, 0, 1);
        group.position.y = y + (assembling ? Math.pow(1 - progress, 3) * index * 0.5 : Math.sin(time * 0.8 + index * 0.7) * 0.035);
      }
      for (const packet of packets) packet.mesh.position.copy(packet.route.getPointAt((time * 0.16 + packet.offset) % 1));
    },
    dispose() {
      for (const resource of resources) resource.dispose();
      root.clear();
    },
  };
}
