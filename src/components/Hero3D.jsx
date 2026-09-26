import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react'

// The 3D scene is code-split so the page text paints first.
const PipelineScene = lazy(() => import('./PipelineScene.jsx'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

// Static stand-in for devices without WebGL: same pipeline, drawn flat.
function Fallback() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" role="img" aria-label="Data flows from sources through validation into a warehouse">
      <g fill="none" stroke="#34416b" strokeWidth="1.5">
        {[40, 85, 130, 175].map((y) => (
          <path key={y} d={`M60 ${y} Q130 ${(y + 110) / 2} 200 110`} />
        ))}
        {[80, 110, 140].map((y) => (
          <path key={y} d={`M200 110 Q270 ${(y + 110) / 2} 320 ${y}`} />
        ))}
      </g>
      {[40, 85, 130, 175].map((y) => (
        <rect key={y} x="46" y={y - 10} width="20" height="20" fill="#121a2e" stroke="#6fd3e8" />
      ))}
      <circle cx="200" cy="110" r="30" fill="#121a2e" stroke="#f5b84b" strokeWidth="2" />
      {[80, 110, 140].map((y) => (
        <rect key={y} x="315" y={y - 10} width="46" height="18" rx="9" fill="#121a2e" stroke="#f5b84b" />
      ))}
    </svg>
  )
}

export default function Hero3D() {
  const box = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [webgl] = useState(hasWebGL)
  const [visible, setVisible] = useState(true)

  // Stop rendering when the hero is scrolled away (saves battery on laptops/phones).
  useEffect(() => {
    if (!box.current || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(box.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={box} className="relative h-full w-full">
      {webgl ? (
        <SceneBoundary fallback={<Fallback />}>
          <Suspense fallback={<Fallback />}>
            <PipelineScene reduced={reduced} active={visible} labelRoot={box} />
          </Suspense>
        </SceneBoundary>
      ) : (
        <Fallback />
      )}
    </div>
  )
}
