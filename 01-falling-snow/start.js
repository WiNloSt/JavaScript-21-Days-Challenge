IIFE(() => {
  /**
   * @typedef SnowBall
   * @property {number} x x origin
   * @property {number} y y origin
   * @property {number} vx x axis speed vector
   * @property {number} vy y axis speed vector
   * @property {number} radius radius
   * @property {number} opacity
   * @property {typeof move} move
   */

  const SNOWBALL_PER_10000_PIXEL_SQUARE = 7
  const PRINT_FPS = false

  /** @type {HTMLCanvasElement} */
  const canvas = document.querySelector('#falling-snow-canvas')

  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext('2d')

  function startSnowing() {
    setUp()
    loop()
  }

  let start
  let debugFrameTimestamp
  let numberOfSnowballs
  let snowballs
  function setUp() {
    start = null
    debugFrameTimestamp = []
    numberOfSnowballs = Math.floor(
      (window.innerWidth * window.innerHeight * SNOWBALL_PER_10000_PIXEL_SQUARE) / 10000
    )
    fitCanvasToWindow()
    snowballs = createSnowBalls()
  }

  /** @returns {SnowBall[]} */
  function createSnowBalls() {
    return Array(numberOfSnowballs)
      .fill(null)
      .map(() => {
        return {
          x: randomNumber(0, canvas.width),
          y: randomNumber(0, canvas.height),
          vx: randomNumber(-1, 1),
          vy: randomNumber(7, 10) / 10,
          radius: randomNumber(2, 5),
          opacity: randomNumber(5, 10) / 10,
          move,
        }
      })
  }

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min
  }

  function move() {
    this.x += this.vx
    this.y += this.vy

    if (this.x > canvas.width || this.x < 0) {
      this.x = (this.x + canvas.width) % canvas.width
    }

    if (this.y > canvas.height || this.y < 0) {
      this.y = (this.y + canvas.height) % canvas.height
    }
  }

  function fitCanvasToWindow() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function loop(timestamp) {
    if (!start) {
      start = timestamp
    }

    // perf debug
    if (PRINT_FPS) {
      printFps(timestamp)
    }

    moveSnowBalls(snowballs)
    renderSnowBalls(snowballs)
    requestAnimationFrame(loop)
  }

  function printFps(timestamp) {
    debugFrameTimestamp.push(timestamp)
    debugFrameTimestamp = debugFrameTimestamp.filter(
      (oldTimestamp) => timestamp - oldTimestamp < 1000
    )
    const debugFps = debugFrameTimestamp.length
    console.log(`painting at ${debugFps} FPS`)
  }

  /** @param {SnowBall[]} snowballs */
  function moveSnowBalls(snowballs) {
    snowballs.forEach(moveSnowBall)
  }

  /** @param {SnowBall} snowball */
  function moveSnowBall(snowball) {
    snowball.move()
  }

  /** @param {SnowBall[]} snowballs */
  function renderSnowBalls(snowballs) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    snowballs.forEach(renderSnowBall)
  }

  /** @param {SnowBall} snowball */
  function renderSnowBall(snowball) {
    ctx.beginPath()
    ctx.fillStyle = `rgba(255,255,255,${snowball.opacity})`
    ctx.arc(snowball.x, snowball.y, snowball.radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  // Let it go, let it go, can't hold it back anymore.
  startSnowing()

  window.addEventListener('resize', () => {
    setUp()
  })
})

function IIFE(func) {
  func()
}
