import { useMemo, useRef, useState, useEffect, PointerEvent as ReactPointerEvent } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// devicon CDN — reliable, real brand logos as SVG
const LOGOS = [
  { label: "React", color: "#61DAFB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { label: "Python", color: "#FFD43B", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { label: "TypeScript", color: "#3178C6", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { label: "AWS", color: "#FF9900", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { label: "GCP", color: "#4285F4", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { label: "Docker", color: "#2496ED", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { label: "PyTorch", color: "#EE4C2C", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { label: "TensorFlow", color: "#FF6F00", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { label: "Kubernetes", color: "#326CE5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { label: "Java", color: "#F89820", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
];

interface LogoNodeProps {
  position: [number, number, number];
  logo: typeof LOGOS[number];
}

const LogoNode = ({ position, logo }: LogoNodeProps) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => { document.body.style.cursor = ""; };
  }, [hovered]);

  return (
    <Html
      position={position}
      center
      distanceFactor={8}
      style={{ pointerEvents: "auto" }}
      zIndexRange={[10, 0]}
    >
      <div
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        title={logo.label}
        className="group relative flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          width: 72,
          height: 72,
          transform: hovered ? "scale(1.35)" : "scale(1)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300"
          style={{
            background: logo.color,
            opacity: hovered ? 0.55 : 0.18,
          }}
        />
        <div
          className="relative w-full h-full rounded-2xl flex items-center justify-center backdrop-blur-md border transition-colors duration-300"
          style={{
            background: "rgba(15, 20, 35, 0.7)",
            borderColor: hovered ? logo.color : "rgba(255,255,255,0.08)",
            boxShadow: hovered ? `0 8px 30px ${logo.color}55` : "none",
          }}
        >
          <img
            src={logo.url}
            alt={logo.label}
            draggable={false}
            className="w-10 h-10 object-contain select-none pointer-events-none"
          />
        </div>
        <span
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono whitespace-nowrap transition-opacity duration-200"
          style={{ color: logo.color, opacity: hovered ? 1 : 0 }}
        >
          {logo.label}
        </span>
      </div>
    </Html>
  );
};

/** Convert lon/lat (degrees) to a 3D point on a sphere of given radius. */
const lonLatToVec3 = (lon: number, lat: number, r: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
};

/** Continent / country outlines from a low-res world GeoJSON. */
const Continents = ({ radius }: { radius: number }) => {
  const [lines, setLines] = useState<THREE.BufferGeometry[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json")
      .then((r) => r.json())
      .then(async (topo) => {
        // Decode TopoJSON inline (tiny, no dep needed)
        const t = await import("topojson-client");
        const geo = t.feature(topo, topo.objects.land) as unknown as GeoJSON.FeatureCollection;
        if (cancelled) return;
        const geoms: THREE.BufferGeometry[] = [];
        const r = radius * 1.001;
        const pushRing = (ring: number[][]) => {
          const pts = ring.map(([lon, lat]) => lonLatToVec3(lon, lat, r));
          geoms.push(new THREE.BufferGeometry().setFromPoints(pts));
        };
        for (const f of geo.features) {
          const g = f.geometry;
          if (g.type === "Polygon") g.coordinates.forEach(pushRing);
          else if (g.type === "MultiPolygon")
            g.coordinates.forEach((poly) => poly.forEach(pushRing));
        }
        setLines(geoms);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [radius]);

  return (
    <>
      {lines.map((geo, i) => (
        <line key={i}>
          <primitive object={geo} attach="geometry" />
          <lineBasicMaterial color="#fbbf24" transparent opacity={0.7} />
        </line>
      ))}
    </>
  );
};

/** Planet: solid dark sphere + glowing latitude/longitude grid + continents + halo. */
const Planet = () => {
  const RADIUS = 3.05;

  const latLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    const segments = 96;
    for (let i = 1; i < 12; i++) {
      const phi = (i / 12) * Math.PI;
      const y = RADIUS * Math.cos(phi);
      const r = RADIUS * Math.sin(phi);
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= segments; s++) {
        const t = (s / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(r * Math.cos(t), y, r * Math.sin(t)));
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(pts));
    }
    for (let i = 0; i < 18; i++) {
      const theta = (i / 18) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= segments; s++) {
        const phi = (s / segments) * Math.PI;
        const x = RADIUS * Math.sin(phi) * Math.cos(theta);
        const y = RADIUS * Math.cos(phi);
        const z = RADIUS * Math.sin(phi) * Math.sin(theta);
        pts.push(new THREE.Vector3(x, y, z));
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(pts));
    }
    return lines;
  }, []);

  return (
    <group>
      {/* Solid planet body */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.985, 64, 64]} />
        <meshBasicMaterial color="#0a0f1f" transparent opacity={0.9} />
      </mesh>
      {/* Inner amber glow rim */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.99, 64, 64]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Lat/long grid */}
      {latLines.map((geo, i) => (
        <line key={i}>
          <primitive object={geo} attach="geometry" />
          <lineBasicMaterial color="#f59e0b" transparent opacity={0.25} />
        </line>
      ))}
      {/* Continent outlines */}
      <Continents radius={RADIUS} />
    </group>
  );
};

interface OrbitGroupProps {
  scrollY: React.MutableRefObject<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  velocity: React.MutableRefObject<{ x: number; y: number }>;
  isDragging: React.MutableRefObject<boolean>;
}

const OrbitGroup = ({ scrollY, mouse, velocity, isDragging }: OrbitGroupProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const radius = 3.9;
    const n = LOGOS.length;
    return LOGOS.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ] as [number, number, number];
    });
  }, []);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const dt = Math.min(delta, 1 / 30);

    if (!isDragging.current) {
      const damping = Math.exp(-1.6 * dt);
      velocity.current.x *= damping;
      velocity.current.y *= damping;
      if (Math.abs(velocity.current.x) < 0.0004) velocity.current.x = 0;
      if (Math.abs(velocity.current.y) < 0.0004) velocity.current.y = 0;

      const speed = Math.abs(velocity.current.x) + Math.abs(velocity.current.y);
      const spin = Math.max(0, 0.18 - speed * 10);
      g.rotation.y += spin * dt;
    }

    g.rotation.y += velocity.current.x * dt * 60;
    g.rotation.x += velocity.current.y * dt * 60;
    g.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, g.rotation.x));

    if (!isDragging.current && Math.abs(velocity.current.x) < 0.004) {
      const targetZ = -mouse.current.x * 0.15 + scrollY.current * 0.0005;
      g.rotation.z += (targetZ - g.rotation.z) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <Planet />
      {LOGOS.map((logo, i) => (
        <LogoNode key={logo.label} logo={logo} position={positions[i]} />
      ))}
    </group>
  );
};

const TechOrbit = () => {
  const scrollY = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0.003, y: 0 });
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0, t: 0 });
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY; };
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onUp = () => {
      isDragging.current = false;
      setGrabbing(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    setGrabbing(true);
    lastPointer.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    velocity.current.x = 0;
    velocity.current.y = 0;
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const now = performance.now();
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    const dt = Math.max(now - lastPointer.current.t, 1);

    const sensitivity = 0.005;
    const newVx = (dx * sensitivity * 16) / dt;
    const newVy = (dy * sensitivity * 16) / dt;

    velocity.current.x = velocity.current.x * 0.3 + newVx * 0.7;
    velocity.current.y = velocity.current.y * 0.3 + newVy * 0.7;

    lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
  };

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ cursor: grabbing ? "grabbing" : "grab", touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <ambientLight intensity={1} />
      <OrbitGroup scrollY={scrollY} mouse={mouse} velocity={velocity} isDragging={isDragging} />
    </Canvas>
  );
};

export default TechOrbit;
