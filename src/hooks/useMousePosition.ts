import { useEffect, useState } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const middleX = window.innerWidth / 2
  const middleY = window.innerHeight / 2

  const onMouseMove = (event: MouseEvent) => {
    const offsetX = ((event.clientX - middleX) / middleX) * 45
    const offsetY = ((event.clientY - middleY) / middleY) * 45 * -1
    setPosition({
      x: offsetX,
      y: offsetY,
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)

    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return position
}
