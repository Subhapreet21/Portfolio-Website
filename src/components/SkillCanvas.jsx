import React, { Suspense, useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Point useGLTF to the official DRACO decoder CDN
useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

// ─── Global Canvas Pool ──────────────────────────────────────────────────────
// Browsers allow ~16 WebGL contexts. We manage a queue so at most MAX_ACTIVE
// canvases are mounted simultaneously.
const MAX_ACTIVE = 9;
const waitingQueue = new Set();      // tiles waiting to be activated
const activeSet = new Set();         // tiles currently showing a Canvas
const listeners = new Map();         // id → callback(shouldMount)

let idCounter = 0;
function nextId() { return ++idCounter; }

function tryActivate() {
  if (activeSet.size >= MAX_ACTIVE) return;
  for (const id of waitingQueue) {
    if (activeSet.size >= MAX_ACTIVE) break;
    waitingQueue.delete(id);
    activeSet.add(id);
    listeners.get(id)?.(true);
  }
}

function registerTile(id, cb) {
  listeners.set(id, cb);
}

function requestMount(id) {
  if (activeSet.has(id)) return;
  waitingQueue.add(id);
  tryActivate();
}

function releaseMount(id) {
  activeSet.delete(id);
  waitingQueue.delete(id);
  listeners.get(id)?.(false);
  tryActivate(); // let next waiting tile in
}

function unregisterTile(id) {
  releaseMount(id);
  listeners.delete(id);
}

// ─── 3D Model ────────────────────────────────────────────────────────────────
const RotatingModel = ({ url }) => {
  const { scene } = useGLTF(url);
  const groupRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (!scene) return;
    try {
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      scene.position.set(-center.x, -center.y, -center.z);
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim === 0) return;
      const fov = camera.fov * (Math.PI / 180);
      const dist = (maxDim / (2 * Math.tan(fov / 2))) * 1.8;
      camera.position.set(0, 0, Math.max(dist, 0.1));
      camera.near = 0.001;
      camera.far = 10000;
      camera.updateProjectionMatrix();
    } catch (e) {
      console.warn("Bounding box error:", url, e);
    }
  }, [scene, camera, url]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.65;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

// ─── Error Boundary ───────────────────────────────────────────────────────────
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err) {
    console.warn("SkillCanvas error:", err.message);
    this.props.onError?.();
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

// ─── SkillCanvas ─────────────────────────────────────────────────────────────
const SkillCanvas = ({ modelUrl, fallback, color }) => {
  const tileId = useRef(nextId()).current;
  const containerRef = useRef();
  const [shouldMount, setShouldMount] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    registerTile(tileId, setShouldMount);

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger activation by tile index to avoid all 18 racing at once
          const delay = (tileId % MAX_ACTIVE) * 60;
          setTimeout(() => requestMount(tileId), delay);
        } else {
          if (activeSet.has(tileId)) {
            releaseMount(tileId);
          }
        }
      },
      { rootMargin: "80px", threshold: 0.1 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      unregisterTile(tileId);
    };
  }, [tileId]);

  // No URL → static icon
  if (!modelUrl) {
    return (
      <span style={{ color, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {fallback}
      </span>
    );
  }

  // GLB failed to parse → static icon
  if (hasError) {
    return (
      <span style={{ color, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
        {fallback}
      </span>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    >
      {shouldMount && (
        <CanvasErrorBoundary onError={() => setHasError(true)}>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ fov: 45, position: [0, 0, 5] }}
            gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
            style={{ width: "100%", height: "100%", display: "block" }}
            onCreated={({ gl }) => {
              // Gracefully handle context-lost instead of crashing
              gl.domElement.addEventListener("webglcontextlost", (e) => {
                e.preventDefault();
                setHasError(true);
              });
            }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} />
            <directionalLight position={[-3, -3, -3]} intensity={0.6} color="#00bcd4" />
            <pointLight position={[0, 3, 3]} intensity={1.0} />
            <Suspense fallback={null}>
              <RotatingModel url={modelUrl} />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      )}
    </div>
  );
};

export default SkillCanvas;
