"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Props {
  className?: string
}

export function WireframeMesh({ className }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    if (window.innerWidth < 1024) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 5)

    const sphereGeo = new THREE.IcosahedronGeometry(1.8, 4)
    const torusGeo = new THREE.TorusGeometry(1.4, 0.55, 24, 80)

    const spherePositions = sphereGeo.attributes.position.array as Float32Array
    const torusPositions = torusGeo.attributes.position.array as Float32Array

    const vertCount = Math.min(spherePositions.length, torusPositions.length)

    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(vertCount)
    positions.set(spherePositions.slice(0, vertCount))
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.computeVertexNormals()

    const mat = new THREE.MeshBasicMaterial({
      color: 0x0a0a0a,
      wireframe: true,
      transparent: true,
      opacity: 0.10,
    })

    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)
    mesh.position.set(2.2, 0.8, 0)

    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let frameId: number
    const clock = new THREE.Clock()

    const tick = () => {
      const t = clock.getElapsedTime()

      if (!reduced) {
        mesh.rotation.y += 0.0008
        mesh.rotation.x += 0.0003

        const morphT = (Math.sin(t * 0.52) + 1) / 2

        const posAttr = geo.attributes.position as THREE.BufferAttribute
        const arr = posAttr.array as Float32Array

        for (let i = 0; i < vertCount; i++) {
          arr[i] = THREE.MathUtils.lerp(spherePositions[i], torusPositions[i], morphT)
        }
        posAttr.needsUpdate = true
        geo.computeVertexNormals()

        mesh.position.x = 2.2 + mouse.x * 0.18
        mesh.position.y = 0.8 - mouse.y * 0.12
      }

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      sphereGeo.dispose()
      torusGeo.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 75% 35%, black 40%, transparent 80%)',
        maskImage: 'radial-gradient(ellipse 70% 80% at 75% 35%, black 40%, transparent 80%)',
      }}
    />
  )
}
