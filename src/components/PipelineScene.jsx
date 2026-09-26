import { createContext, useContext, useMemo, useRef, useLayoutEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Line, Html, Edges } from '@react-three/drei'
import * as THREE from 'three'

// A live, 3D picture of what Aman builds:
// raw records (cyan) are extracted from sources, pass through a validation core,
// and land in the warehouse as clean rows (amber).

const AMBER = '#f5b84b'
const CYAN = '#6fd3e8'
const LINE = '#34416b'
const PANEL = '#121a2e'

const SOURCES = [
  new THREE.Vector3(-3.5, 1.45, -0.4),
  new THREE.Vector3(-3.9, 0.45, 0.5),
  new THREE.Vector3(-3.6, -0.6, -0.2),
  new THREE.Vector3(-3.2, -1.55, 0.4),
]
const CORE = new THREE.Vector3(0, 0, 0)
const WAREHOUSE = new THREE.Vector3(3.5, 0, 0)
const SHELVES = [0.62, 0, -0.62]

// DOM node the 3D labels are portalled into (the canvas wrapper).
const LabelRoot = createContext(null)

function makeCurves() {
  const inbound = SOURCES.map(
    (s) =>
      new THREE.QuadraticBezierCurve3(
        s,
        new THREE.Vector3(-1.8, s.y * 0.35, s.z * 0.5 + 0.6),
        CORE.clone(),
      ),
  )
  const outbound = SHELVES.map(
    (y) =>
      new THREE.QuadraticBezierCurve3(
        CORE.clone(),
        new THREE.Vector3(1.8, y * 0.4, 0.7),
        new THREE.Vector3(WAREHOUSE.x - 0.7, y, 0),
      ),
  )
  return { inbound, outbound }
}

function Particles({ curves, count, color, speed, size = 0.05, reduced }) {
  const ref = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        curve: i % curves.length,
        offset: Math.random(),
        speed: speed * (0.75 + Math.random() * 0.5),
      })),
    [count, curves.length, speed],
  )
  const tmp = useMemo(() => new THREE.Vector3(), [])

  const place = (time) => {
    seeds.forEach((p, i) => {
      const t = (p.offset + time * p.speed) % 1
      curves[p.curve].getPoint(t, tmp)
      dummy.position.copy(tmp)
      // shrink near the ends so particles appear/disappear smoothly
      const s = Math.sin(t * Math.PI) * 0.8 + 0.2
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  }

  useLayoutEffect(() => place(0))
  useFrame((state) => {
    if (!reduced) place(state.clock.elapsedTime)
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[size, 10, 10]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </instancedMesh>
  )
}

function Label({ position, children }) {
  const portal = useContext(LabelRoot)
  return (
    <Html portal={portal} position={position} center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
      <span className="whitespace-nowrap rounded border border-line bg-ink/80 px-2 py-0.5 font-mono text-[11px] tracking-wider text-muted">
        {children}
      </span>
    </Html>
  )
}

function Core({ reduced }) {
  const shell = useRef()
  const ring = useRef()
  useFrame((_, dt) => {
    if (reduced) return
    shell.current.rotation.y += dt * 0.35
    shell.current.rotation.x += dt * 0.12
    ring.current.rotation.z += dt * 0.6
  })
  return (
    <group position={CORE}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={AMBER} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.62, 3]} />
        <meshStandardMaterial color="#1a2340" emissive={AMBER} emissiveIntensity={0.35} roughness={0.35} metalness={0.4} flatShading />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.35, 0.012, 8, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

function Warehouse() {
  return (
    <group position={WAREHOUSE}>
      {SHELVES.map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.72, 0.72, 0.4, 40]} />
          <meshStandardMaterial color={PANEL} roughness={0.5} metalness={0.3} />
          <Edges color={AMBER} threshold={20} />
        </mesh>
      ))}
    </group>
  )
}

function Sources() {
  return SOURCES.map((p, i) => (
    <Float key={i} speed={1.4} rotationIntensity={0.6} floatIntensity={0.4}>
      <mesh position={p} rotation={[0.4, 0.6 + i, 0]}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial color={PANEL} roughness={0.4} />
        <Edges color={CYAN} />
      </mesh>
    </Float>
  ))
}

function Rig({ children, reduced }) {
  const group = useRef()
  const { camera, size } = useThree()

  // Fit the ~9-unit-wide pipeline into whatever box the canvas has.
  useLayoutEffect(() => {
    const aspect = size.width / size.height
    const fov = (camera.fov * Math.PI) / 180
    const z = 9.2 / (2 * Math.tan(fov / 2) * aspect)
    camera.position.set(0, 0.4, THREE.MathUtils.clamp(z, 7.5, 18))
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera, size])

  useFrame((state) => {
    if (reduced) return
    const g = group.current
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.28, 0.05)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.14, 0.05)
  })
  return <group ref={group}>{children}</group>
}

export default function PipelineScene({ reduced = false, active = true, labelRoot = null }) {
  const { inbound, outbound } = useMemo(makeCurves, [])
  const frameloop = !active ? 'never' : reduced ? 'demand' : 'always'

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.75]}
      camera={{ fov: 38, position: [0, 0.4, 11] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 2.5]} intensity={18} color={AMBER} distance={8} />
      <directionalLight position={[4, 5, 6]} intensity={1.2} />
      <LabelRoot.Provider value={labelRoot}>
      <Rig reduced={reduced}>
        {inbound.concat(outbound).map((c, i) => (
          <Line key={i} points={c.getPoints(48)} color={LINE} lineWidth={1} transparent opacity={0.9} />
        ))}
        <Sources />
        <Core reduced={reduced} />
        <Warehouse />
        <Particles curves={inbound} count={64} color={CYAN} speed={0.18} reduced={reduced} />
        <Particles curves={outbound} count={42} color={AMBER} speed={0.22} size={0.055} reduced={reduced} />
        <Label position={[0, -1.75, 0]}>validate</Label>
        <Label position={[3.5, -1.35, 0]}>load</Label>
        <Label position={[-3.3, -2.25, 0.4]}>extract</Label>
      </Rig>
      </LabelRoot.Provider>
    </Canvas>
  )
}
