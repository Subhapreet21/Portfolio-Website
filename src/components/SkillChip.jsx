import React, { Suspense, useRef, useState, useEffect, useMemo, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  View,
  Preload,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
// import { useGLTF, View, Preload, PerspectiveCamera, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

// Bulk-import the coin GLB
const glbModules = import.meta.glob("../assets/Tech Stack Assets/circle.glb", {
  eager: true,
  query: "?url",
  import: "default",
});
const coinGlbUrl = glbModules["../assets/Tech Stack Assets/circle.glb"];

// Cache prepared model data to avoid recomputing traversal and normalization per instance
const modelCache = new Map();

// Lowering texture size speeds up SVG -> canvas work during startup
const DEFAULT_TEXTURE_SIZE = 256;

// ── SVG to Texture Helper ──────────────────────────────────────────────────
function useSvgTexture(svgUrl) {
  const [texture, setTexture] = useState(null);
  const targetTextureSize = DEFAULT_TEXTURE_SIZE;
  const targetLogoBox = 0.78;

  const findAlphaBounds = (imageData, width, height) => {
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const alpha = imageData[(y * width + x) * 4 + 3];
        if (alpha > 24) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX < minX || maxY < minY) {
      return { minX: 0, minY: 0, maxX: width - 1, maxY: height - 1 };
    }

    return { minX, minY, maxX, maxY };
  };

  useEffect(() => {
    if (!svgUrl) return;
    let disposed = false;

    const image = new Image();
    image.decoding = "async";
    image.crossOrigin = "anonymous";

    image.onload = () => {
      if (disposed) return;

      const size = Math.max(
        image.naturalWidth || 0,
        image.naturalHeight || 0,
        targetTextureSize,
      );
      const sourceCanvas = document.createElement("canvas");
      sourceCanvas.width = size;
      sourceCanvas.height = size;

      const sourceContext = sourceCanvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (!sourceContext) return;

      sourceContext.clearRect(0, 0, size, size);
      sourceContext.drawImage(image, 0, 0, size, size);

      const bounds = findAlphaBounds(
        sourceContext.getImageData(0, 0, size, size).data,
        size,
        size,
      );

      const cropWidth = bounds.maxX - bounds.minX + 1;
      const cropHeight = bounds.maxY - bounds.minY + 1;
      const contentSize = Math.max(cropWidth, cropHeight);
      const destinationSize = targetTextureSize * targetLogoBox;
      const scale = destinationSize / contentSize;
      const drawWidth = cropWidth * scale;
      const drawHeight = cropHeight * scale;
      const drawX = (targetTextureSize - drawWidth) / 2;
      const drawY = (targetTextureSize - drawHeight) / 2;

      const canvas = document.createElement("canvas");
      canvas.width = targetTextureSize;
      canvas.height = targetTextureSize;

      const context = canvas.getContext("2d");
      if (!context) return;

      context.clearRect(0, 0, targetTextureSize, targetTextureSize);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      context.drawImage(
        sourceCanvas,
        bounds.minX,
        bounds.minY,
        cropWidth,
        cropHeight,
        drawX,
        drawY,
        drawWidth,
        drawHeight,
      );

      const tex = new THREE.CanvasTexture(canvas);
      try {
        tex.colorSpace = THREE.SRGBColorSpace;
      } catch {
        tex.encoding = THREE.sRGBEncoding;
      }
      tex.flipY = true;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = 4;
      tex.needsUpdate = true;
      setTexture(tex);
    };

    image.onerror = () => {
      if (!disposed) setTexture(null);
    };

    image.src = svgUrl;

    return () => {
      disposed = true;
    };
  }, [svgUrl, targetTextureSize]);

  return texture;
}

// ── Coin Component ──────────────────────────────────────────────────────────
const CoinModel = ({
  svgUrl,
  interactive = false,
  pointer = { x: 0, y: 0 },
}) => {
  const { scene } = useGLTF(coinGlbUrl);
  const texture = useSvgTexture(svgUrl);
  const groupRef = useRef(null);
  const spinRef = useRef(0);

  const { normalizedScene, logoZOffsetFront, logoZOffsetBack } = useMemo(() => {
    // If we've prepared the model once, reuse the prepared values and clone the scene.
    if (modelCache.has(coinGlbUrl)) {
      const cached = modelCache.get(coinGlbUrl);
      return {
        normalizedScene: cached.normalizedScene.clone(true),
        logoZOffsetFront: cached.logoZOffsetFront,
        logoZOffsetBack: cached.logoZOffsetBack,
      };
    }

    const clone = scene.clone();
    clone.traverse((node) => {
      if (node.isMesh && node.material) {
        node.material = node.material.clone();
        try {
          if (node.material.metalness !== undefined)
            node.material.metalness = Math.max(
              0,
              node.material.metalness ?? 0.5,
            );
          if (node.material.roughness !== undefined)
            node.material.roughness = Math.min(
              1,
              node.material.roughness ?? 0.4,
            );
        } catch {
          // ignore materials that don't expose these properties
        }
        node.material.side = THREE.DoubleSide;
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    clone.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const fitScale = 1.26 / maxDim;
    clone.scale.multiplyScalar(fitScale);
    const fittedBox = new THREE.Box3().setFromObject(clone);
    const frontZ = fittedBox.max.z;
    const backZ = fittedBox.min.z;

    modelCache.set(coinGlbUrl, {
      normalizedScene: clone,
      logoZOffsetFront: frontZ + 0.01,
      logoZOffsetBack: backZ - 0.01,
    });

    return {
      normalizedScene: clone.clone(true),
      logoZOffsetFront: frontZ + 0.01,
      logoZOffsetBack: backZ - 0.01,
    };
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const tiltX = (interactive ? pointer.y : 0) * 0.22;
    const tiltY = (interactive ? pointer.x : 0) * 0.28;
    spinRef.current += delta * 2.0;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      tiltX,
      0.14,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      spinRef.current + tiltY,
      0.12,
    );
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      {/* Use normalized scene transform for stable centering across all chips */}
      <primitive object={normalizedScene} />

      {/* SVG logo planes (front + back) */}
      {texture ? (
        <>
          <mesh position={[0, 0, logoZOffsetFront]} renderOrder={999}>
            <planeGeometry args={[0.9, 0.9]} />
            <meshBasicMaterial
              map={texture}
              transparent={true}
              alphaTest={0.01}
              depthTest={true}
              depthWrite={false}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>

          <mesh
            position={[0, 0, logoZOffsetBack]}
            rotation={[0, Math.PI, 0]}
            renderOrder={999}
          >
            <planeGeometry args={[0.9, 0.9]} />
            <meshBasicMaterial
              map={texture}
              transparent={true}
              alphaTest={0.01}
              depthTest={true}
              depthWrite={false}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      ) : (
        <>
          <mesh position={[0, 0, logoZOffsetFront]} rotation={[0, 0, 0]}>
            <planeGeometry args={[0.9, 0.9]} />
            <meshStandardMaterial
              color={0xcfcfd1}
              metalness={0.2}
              roughness={0.8}
            />
          </mesh>

          <mesh position={[0, 0, logoZOffsetBack]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.9, 0.9]} />
            <meshStandardMaterial
              color={0xcfcfd1}
              metalness={0.2}
              roughness={0.8}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

// ── Scene Setup ─────────────────────────────────────────────────────────────
const CoinScene = ({ svgUrl, interactive, pointer }) => {
  return (
    <Suspense fallback={null}>
      {/* Balanced lighting to reveal coin thickness and reflections */}
      <ambientLight intensity={0.45} />
      <hemisphereLight
        skyColor={0xffffff}
        groundColor={0x444444}
        intensity={0.6}
      />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 1, -4]} intensity={0.8} />

      {/* Front-facing camera keeps the square tile centered in circular chips */}
      <PerspectiveCamera makeDefault position={[0, 0, 3.1]} fov={36} />

      <CoinModel svgUrl={svgUrl} interactive={interactive} pointer={pointer} />
      <Environment preset="city" />
    </Suspense>
  );
};

// Memo with a custom comparator: compare pointer x/y by VALUE, not by reference.
// This prevents all 20 Three.js views from re-rendering when the parent re-renders
// due to a theme toggle (where pointer is always {x:0, y:0} — same values, new object).
export const SkillCoinView = memo(
  ({ trackRef, svgUrl, interactive, pointer }) => (
    <View
      track={trackRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <CoinScene svgUrl={svgUrl} interactive={interactive} pointer={pointer} />
    </View>
  ),
  (prev, next) =>
    prev.svgUrl === next.svgUrl &&
    prev.interactive === next.interactive &&
    prev.pointer.x === next.pointer.x &&
    prev.pointer.y === next.pointer.y,
);

export const SkillsGlobalCanvas = () => (
  <Canvas
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
    performance={{ min: 0.5 }}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
      zIndex: 10,
    }}
    eventSource={typeof document !== "undefined" ? document.body : undefined}
  >
    <View.Port />
    <Preload all />
  </Canvas>
);

function SkillChipFallback() {
  return null;
}

export default SkillChipFallback;
