import React, { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const buildings = [
  [-13, -20, 5.4, 8.0, '#db889f'], [-19, -19, 5.0, 10, '#f3aa9a'],
  [-13, -10, 5.5, 6.5, '#f4b8a4'], [-19, -8, 5.0, 9, '#b88bb5'],
  [-13, 0, 5.5, 8.5, '#d28da9'], [-19, 1, 5.0, 7.5, '#f2a99d'],
  [-13, 10, 5.5, 6.5, '#e3a4aa'], [-19, 11, 5, 9.5, '#cf86a7'],
  [-13, 20, 5.5, 8, '#eaaa9e'], [-19, 21, 5, 10, '#bb90ac'],
  [13, -20, 5.5, 9.5, '#f5ab9c'], [19, -20, 5.5, 7, '#e69aab'],
  [13, -10, 5.5, 8, '#d486a4'], [19, -10, 5.5, 10, '#ffa995'],
  [13, 0, 5.5, 7, '#f3b5aa'], [19, 1, 5.5, 9, '#c28da9'],
  [13, 10, 5.5, 10.5, '#e79ca5'], [19, 11, 5.5, 7.5, '#e9a6b1'],
  [13, 20, 5.5, 7, '#d68caa'], [19, 20, 5.5, 9, '#f0a5a4'],
]

const landmarks = [
  { id: 'gridsense', label: 'GRIDSENSE', sub: 'AI / ML', color: '#d4ff83', position: [-3.8, 2.2, -14] },
  { id: 'maintenance', label: 'MAINTENANCE AI', sub: 'INDUSTRIAL AI', color: '#ffc785', position: [3.8, 2.2, -20] },
  { id: 'kubernetes', label: 'AI DEVOPS', sub: 'CLOUD', color: '#b6a7ff', position: [3.8, 2.2, -3] },
  { id: 'bhoomiseva', label: 'BHOOMISEVA', sub: 'FULL STACK', color: '#ffb39b', position: [-3.8, 2.2, 8] },
  { id: 'warehouse', label: 'WAREHOUSE OS', sub: 'FULL STACK', color: '#8cdecd', position: [3.8, 2.2, 11] },
  { id: 'nids', label: 'NIDS', sub: 'SECURITY', color: '#8ce4ef', position: [3.8, 2.2, 19] },
]

function Building({ item, i }) {
  const [x, z, width, height, color] = item
  const left = x < 0
  const nearX = x + (left ? width / 2 + 0.06 : -width / 2 - 0.06)
  const rows = Math.floor((height - 1) / 1.45)
  return (
    <group>
      <mesh castShadow receiveShadow position={[x, height / 2, z]}>
        <boxGeometry args={[width, height, 8.4]} />
        <meshStandardMaterial color={color} roughness={0.94}/>
      </mesh>
      <mesh castShadow position={[x, height + 0.18, z]}>
        <boxGeometry args={[width + 0.25, 0.37, 8.65]}/>
        <meshStandardMaterial color={i % 2 ? '#8f668c' : '#ad708d'} roughness={0.8}/>
      </mesh>
      <mesh position={[nearX, 0.62, z]}>
        <boxGeometry args={[0.14, 1.23, 1.2]} />
        <meshStandardMaterial color="#694e79" />
      </mesh>
      {Array.from({ length: rows }).map((_, row) => [-2.3, 0, 2.3].map((offset, col) => (
        <group key={`${row}-${col}`}>
          <mesh position={[nearX, 1.8 + row * 1.43, z + offset]}>
            <boxGeometry args={[0.12, 0.86, 1.18]}/>
            <meshStandardMaterial color={((row + col + i) % 5 === 0) ? '#ffefbc' : '#765f96'} emissive={((row + col + i) % 5 === 0) ? '#f7c39d' : '#282345'} emissiveIntensity={0.28} />
          </mesh>
          <mesh position={[nearX + (left ? 0.09 : -0.09), 1.8 + row * 1.43, z + offset]}>
            <boxGeometry args={[0.05, 0.09, 1.26]} />
            <meshStandardMaterial color="#efbfbc" />
          </mesh>
        </group>
      )))}
      {i % 4 === 0 && <mesh position={[x, height + 0.7, z]}>
        <boxGeometry args={[0.1, 1, 0.1]}/>
        <meshStandardMaterial color="#eed8ca" />
      </mesh>}
    </group>
  )
}

function StreetTree({ x, z, tint = '#b184a9' }) {
  return <group position={[x, 0, z]}>
    <mesh position={[0, 0.8, 0]} castShadow><cylinderGeometry args={[0.1, 0.18, 1.6, 6]}/><meshStandardMaterial color="#75516d"/></mesh>
    <mesh position={[0, 2.15, 0]} castShadow><icosahedronGeometry args={[1.05, 1]}/><meshStandardMaterial color={tint} flatShading roughness={0.96}/></mesh>
    <mesh position={[0.55, 1.72, 0.3]}><icosahedronGeometry args={[0.53, 1]}/><meshStandardMaterial color="#e3a6a8" flatShading/></mesh>
  </group>
}

function StreetLight({ x, z }) {
  return <group position={[x, 0, z]}>
    <mesh position={[0, 1.75, 0]}><cylinderGeometry args={[0.055, 0.09, 3.5, 8]}/><meshStandardMaterial color="#474b78" metalness={0.4} roughness={0.4}/></mesh>
    <mesh position={[0.0, 3.42, 0.28]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.055, 0.055, 0.55, 8]}/><meshStandardMaterial color="#474b78"/></mesh>
    <mesh position={[0, 3.48, 0.5]}><sphereGeometry args={[0.23, 12, 12]}/><meshStandardMaterial color="#fff2d2" emissive="#ffcd8d" emissiveIntensity={1.5}/></mesh>
  </group>
}

function Tower() {
  return <group position={[-22, 0, -29]}>
    {[-1, 1].map((dir) => [-1, 1].map((dir2) => (
      <mesh key={`${dir}-${dir2}`} position={[dir * 1.9, 3.8, dir2 * 1.9]} rotation={[dir2 * 0.15, 0, -dir * 0.31]} castShadow>
        <boxGeometry args={[0.33, 8, 0.35]}/><meshStandardMaterial color="#9f6e8b"/>
      </mesh>
    )))}
    {[2, 5.1, 7.5].map((level, idx) => <mesh key={level} position={[0, level, 0]}>
      <boxGeometry args={[5.6 - idx * 1.7, 0.35, 5.6 - idx * 1.7]}/><meshStandardMaterial color="#a77991"/>
    </mesh>)}
    <mesh position={[0, 9.1, 0]}><coneGeometry args={[1.1, 3.9, 4]}/><meshStandardMaterial color="#9f718e"/></mesh>
    <mesh position={[0, 12.1, 0]}><cylinderGeometry args={[0.05, 0.08, 2.5, 6]}/><meshStandardMaterial color="#ab748e"/></mesh>
  </group>
}

function Motorcycle({ playerRef }) {
  return <group ref={playerRef} position={[0, 0.22, 14]}>
    <group position={[0, 0.25, 0]}>
      {[-0.66, 0.66].map((z) => <group key={z} position={[0.28, 0.09, z]} rotation={[0, Math.PI / 2, 0]}>
        <mesh><torusGeometry args={[0.4, 0.12, 7, 16]}/><meshStandardMaterial color="#34314f" roughness={0.55}/></mesh>
        <mesh><cylinderGeometry args={[0.19, 0.19, 0.1, 12]}/><meshStandardMaterial color="#e6c4c2" metalness={0.2}/></mesh>
      </group>)}
      <mesh position={[0, 0.42, 0.1]} rotation={[0.13, 0, 0]} castShadow><boxGeometry args={[0.44, 0.3, 1.55]}/><meshStandardMaterial color="#d6fc86"/></mesh>
      <mesh position={[0, 0.8, 0.48]}><boxGeometry args={[0.5, 0.13, 0.49]}/><meshStandardMaterial color="#3d3556"/></mesh>
      <mesh position={[0, 0.72, -0.65]} rotation={[0.24, 0, 0]}><boxGeometry args={[0.08, 0.72, 0.08]}/><meshStandardMaterial color="#fce5d7"/></mesh>
      <mesh position={[0, 1.09, -0.66]}><boxGeometry args={[0.7, 0.07, 0.1]}/><meshStandardMaterial color="#fce5d7"/></mesh>
      <mesh position={[0, 1.09, 0.05]} castShadow><sphereGeometry args={[0.38, 10, 10]}/><meshStandardMaterial color="#f7a988"/></mesh>
      <mesh position={[0, 1.45, 0.13]} castShadow><boxGeometry args={[0.64, 0.52, 0.39]}/><meshStandardMaterial color="#383750"/></mesh>
      <mesh position={[0, 1.89, 0.09]} castShadow><sphereGeometry args={[0.35, 12, 12]}/><meshStandardMaterial color="#f3ceb2"/></mesh>
      <mesh position={[0, 2.08, 0.08]}><sphereGeometry args={[0.37, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]}/><meshStandardMaterial color="#3d3257"/></mesh>
      <mesh position={[0, 1.39, 0.41]}><boxGeometry args={[0.44, 0.5, 0.24]}/><meshStandardMaterial color="#a895eb"/></mesh>
    </group>
  </group>
}

function SceneDriver({ explore, playerRef }) {
  const { camera } = useThree()
  const pressed = useRef({})
  const position = useRef(new THREE.Vector3(0, 0.22, 14))
  useEffect(() => {
    const down = (event) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key) && explore) event.preventDefault()
      pressed.current[event.key.toLowerCase()] = true
    }
    const up = (event) => { pressed.current[event.key.toLowerCase()] = false }
    const blur = () => { pressed.current = {} }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('blur', blur)
    const mobileControl = (event) => { pressed.current[event.detail.key] = event.detail.down }
    window.addEventListener('portfolio-control', mobileControl)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', blur); window.removeEventListener('portfolio-control', mobileControl) }
  }, [explore])

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime()
    if (playerRef.current) {
      if (explore) {
        let x = 0, z = 0
        if (pressed.current.w || pressed.current.arrowup) z -= 1
        if (pressed.current.s || pressed.current.arrowdown) z += 1
        if (pressed.current.a || pressed.current.arrowleft) x -= 1
        if (pressed.current.d || pressed.current.arrowright) x += 1
        const magnitude = Math.hypot(x, z) || 1
        const speed = Math.min(delta, 0.05) * 9
        position.current.x = THREE.MathUtils.clamp(position.current.x + x / magnitude * speed, -3.6, 3.6)
        position.current.z = THREE.MathUtils.clamp(position.current.z + z / magnitude * speed, -23, 23)
        if (x || z) playerRef.current.rotation.y = THREE.MathUtils.lerp(playerRef.current.rotation.y, Math.atan2(-x, -z), 0.12)
      } else {
        position.current.x = Math.sin(t * 0.52) * 0.18
        position.current.z = 14 + Math.sin(t * 0.52) * 0.18
        playerRef.current.rotation.y = Math.sin(t * 0.7) * 0.08 + Math.PI
      }
      playerRef.current.position.copy(position.current)
      playerRef.current.position.y = 0.22 + Math.sin(t * 6.2) * 0.018
    }
    const targetPosition = explore
      ? new THREE.Vector3(position.current.x + 7.3, 7.4, position.current.z + 10.6)
      : new THREE.Vector3(29 + Math.sin(t * 0.13) * 2, 17, 27)
    camera.position.lerp(targetPosition, explore ? 0.056 : 0.02)
    const lookTarget = explore
      ? new THREE.Vector3(position.current.x, 1.35, position.current.z - 4)
      : new THREE.Vector3(0, 2, 0)
    const matrix = new THREE.Matrix4().lookAt(camera.position, lookTarget, new THREE.Vector3(0, 1, 0))
    const q = new THREE.Quaternion().setFromRotationMatrix(matrix)
    camera.quaternion.slerp(q, explore ? 0.075 : 0.03)
  })
  return null
}

function City({ explore, onProject }) {
  const playerRef = useRef(null)
  const treePositions = useMemo(() => Array.from({length: 12}, (_, i) => ({z: -22 + i * 4.2, x: i%2 ? 6.3 : -6.3})), [])
  return <>
    <ambientLight intensity={1.35} color="#e2c2df" />
    <hemisphereLight args={['#ffdcd7', '#6c4a78', 2]} />
    <directionalLight position={[-14, 24, -18]} intensity={2.4} color="#ffdabd" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-left={-35} shadow-camera-right={35} shadow-camera-top={35} shadow-camera-bottom={-35}/>
    <fog attach="fog" args={['#b89ab7', 28, 93]} />
    <mesh position={[0, -0.82, 0]} receiveShadow><boxGeometry args={[48, 1.1, 58]}/><meshStandardMaterial color="#b37d9e" roughness={1}/></mesh>
    <mesh position={[0, -0.21, 0]} receiveShadow><boxGeometry args={[10.8, 0.12, 56]}/><meshStandardMaterial color="#77738b" roughness={1}/></mesh>
    {[-7.05, 7.05].map((x) => <mesh key={x} position={[x, -0.14, 0]} receiveShadow><boxGeometry args={[3.4, 0.22, 56]}/><meshStandardMaterial color="#e2a6b3"/></mesh>)}
    {[-4.72, 4.72].map((x) => <mesh key={x} position={[x, -0.09, 0]}><boxGeometry args={[0.13, 0.05, 56]}/><meshStandardMaterial color="#fbcabb"/></mesh>)}
    {Array.from({ length: 16 }).map((_,i) => <mesh key={i} position={[0, -0.12, -24 + i * 3.4]}><boxGeometry args={[0.12, 0.03, 1.6]}/><meshStandardMaterial color="#d1bfcb"/></mesh>)}
    {buildings.map((item, i) => <Building key={i} item={item} i={i}/>)}
    {treePositions.map(({x,z},i) => <StreetTree key={i} x={x} z={z} tint={i%3===0?'#c998b0':i%3===1?'#e2a7b0':'#aa89b5'}/>)}
    {Array.from({length:9}).map((_,i) => <StreetLight key={i} x={i%2===0?-5.0:5.0} z={-20+i*5.4}/>)}
    <Tower />
    <mesh position={[0, 0, -27.7]}><boxGeometry args={[10, 0.2, 0.5]}/><meshStandardMaterial color="#eed5c7" /></mesh>
    <Motorcycle playerRef={playerRef}/>
    <SceneDriver explore={explore} playerRef={playerRef}/>
    <Sparkles count={50} scale={[46, 15, 55]} size={2.1} speed={0.23} color="#fff6d4" opacity={0.6}/>
    {explore && landmarks.map((item) => <group key={item.id} position={item.position}>
      <mesh position={[0, -1.62, 0]}><cylinderGeometry args={[0.8, 0.8, 0.07, 20]}/><meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={0.2}/></mesh>
      <mesh position={[0, -0.9, 0]}><cylinderGeometry args={[0.035, 0.035, 1.55, 8]}/><meshStandardMaterial color={item.color}/></mesh>
      <Html transform={false} center distanceFactor={11}>
        <button className="world-marker" style={{'--pin':item.color}} onClick={(event)=>{event.stopPropagation();onProject(item.id)}}>
          <span className="marker-light" />
          <span className="marker-text"><strong>{item.label}</strong><small>{item.sub}</small></span>
          <span aria-hidden="true">↗</span>
        </button>
      </Html>
    </group>)}
  </>
}

export default function World({ explore = false, onProject = () => {} }) {
  return <Canvas
    aria-label="Interactive pastel low-poly city. In explore mode use WASD or arrow keys to ride through the world and select a project landmark."
    shadows={explore} dpr={[1, 1.6]} camera={{position:[29,17,27], fov:39, near:0.1, far:180}}
    gl={{antialias:true, powerPreference:'high-performance', alpha:true}}
    style={{ width:'100%', height:'100%', touchAction:'pan-y' }}
  >
    <Suspense fallback={null}><City explore={explore} onProject={onProject}/></Suspense>
  </Canvas>
}
