<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const colorMode = useColorMode()
const canvas = ref<HTMLCanvasElement | null>(null)

const particlesCount = 100
const strokeWeight = 1
const tail = 3

let context: CanvasRenderingContext2D | null = null
let animationFrame = 0
let globalAngle = Math.random() * Math.PI
let angle = (Math.PI / 180) * -90
let particles: Particle[] = []
let width = 0
let height = 0
let backgroundColor = '#ffffff'
let particleColor = '#2563eb'

class Particle {
  x: number
  y: number
  vx = 0
  vy = 0
  ax = 0
  ay = 0
  pastPositions: { x: number; y: number }[]

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.pastPositions = Array.from({ length: tail }, () => ({
      x,
      y
    }))
  }

  update() {
    this.follow()

    this.vx += this.ax
    this.vy += this.ay
    this.x += this.vx
    this.y += this.vy

    this.ax = 0
    this.ay = 0

    this.pastPositions.unshift({
      x: this.x,
      y: this.y
    })

    if (this.pastPositions.length > tail + 1) {
      this.pastPositions.pop()
    }

    const offset = 15

    if (
        this.x > width + offset ||
        this.x < -offset ||
        this.y > height + offset ||
        this.y < -offset
    ) {
      this.regen()
    }
  }

  follow() {
    const currentAngle = globalAngle + angle
    const curveFactor = Math.sin(currentAngle)

    this.ax = Math.cos(currentAngle + curveFactor) * 0.01
    this.ay = Math.sin(currentAngle + curveFactor) * 0.01
  }

  render() {
    if (!context) {
      return
    }

    context.strokeStyle = particleColor
    context.lineWidth = strokeWeight

    for (let i = 0; i < this.pastPositions.length - 1; i++) {
      const current = this.pastPositions[i]
      const next = this.pastPositions[i + 1]

      if (!current || !next) {
        continue
      }

      context.beginPath()
      context.moveTo(current.x, current.y)
      context.lineTo(next.x, next.y)
      context.globalAlpha = Math.max(
          1 - i / this.pastPositions.length,
          0
      )
      context.stroke()
    }

    context.globalAlpha = 1
  }

  regen() {
    const side = Math.floor(Math.random() * 4)

    if (side === 0) {
      this.x = Math.random() * width
      this.y = 0
    } else if (side === 1) {
      this.x = width
      this.y = Math.random() * height
    } else if (side === 2) {
      this.x = Math.random() * width
      this.y = height
    } else {
      this.x = 0
      this.y = Math.random() * height
    }

    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0

    this.pastPositions = Array.from({ length: tail }, () => ({
      x: this.x,
      y: this.y
    }))
  }
}

const updateThemeColors = () => {
  const styles = getComputedStyle(document.documentElement)

  backgroundColor =
      styles.getPropertyValue('--particle-background').trim() || '#ffffff'

  particleColor =
      styles.getPropertyValue('--particle-color').trim() || '#2563eb'
}

const resize = () => {
  if (!canvas.value || !context) {
    return
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  width = window.innerWidth
  height = window.innerHeight

  canvas.value.width = width * dpr
  canvas.value.height = height * dpr
  canvas.value.style.width = `${width}px`
  canvas.value.style.height = `${height}px`

  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.lineCap = 'round'

  particles = Array.from(
      { length: particlesCount },
      () => new Particle(Math.random() * width, Math.random() * height)
  )
}

const animate = () => {
  if (!context) {
    return
  }

  context.fillStyle = backgroundColor
  context.fillRect(0, 0, width, height)

  for (const particle of particles) {
    particle.update()
    particle.render()
  }

  animationFrame = requestAnimationFrame(animate)
}

watch(
    () => colorMode.value,
    () => {
      if (import.meta.client) {
        requestAnimationFrame(updateThemeColors)
      }
    }
)

onMounted(() => {
  if (!canvas.value) {
    return
  }

  context = canvas.value.getContext('2d')

  if (!context) {
    return
  }

  updateThemeColors()
  resize()

  window.addEventListener('resize', resize)

  animationFrame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas
      ref="canvas"
      class="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
  />
</template>