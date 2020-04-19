IIFE(() => {
  /**
   * @typedef Coordinate
   * @property {number} x
   * @property {number} y
   */
  const elementDimensionCache = new Map()

  window.addEventListener('mousemove', (e) => {
    const mouseCoordinate = {
      x: e.clientX,
      y: e.clientY,
    }
    document.querySelectorAll('.eye').forEach((eyeElement) => {
      const eyeDimension = getDimension(eyeElement)
      const eyeCoordinate = {
        x: eyeDimension.left + eyeDimension.width / 2,
        y: eyeDimension.top + eyeDimension.height / 2,
      }

      const IRIS_RADIUS = 25
      const maxRadiusMovement = eyeDimension.width / 2 - IRIS_RADIUS
      const movement = calculateMovement(
        mouseCoordinate,
        eyeCoordinate,
        IRIS_RADIUS,
        maxRadiusMovement
      )

      eyeElement.style.setProperty('--transform-x', movement.x)
      eyeElement.style.setProperty('--transform-y', movement.y)
    })
  })

  // clearDimensionCache when resize otherwise calculation will be off
  // the reason to do the cache because getBoundingClientRect are
  // causing reflows
  window.addEventListener('resize', () => {
    elementDimensionCache.clear()
  })

  /**
   *
   * @return {DOMRect}
   */
  function getDimension(element) {
    if (!elementDimensionCache.get(element)) {
      elementDimensionCache.set(element, element.getBoundingClientRect())
    }

    return elementDimensionCache.get(element)
  }

  /**
   *
   * @param {Coordinate} mouseCoordinate
   * @param {Coordinate} eyeCoordinate
   * @param {number} offset constant
   * @param {number} maxRadiusMovement constant
   */
  function calculateMovement(mouseCoordinate, eyeCoordinate, offset, maxRadiusMovement) {
    const mouseDistant = {
      x: mouseCoordinate.x - eyeCoordinate.x,
      y: mouseCoordinate.y - eyeCoordinate.y,
    }
    const radius = Math.min(Math.sqrt(mouseDistant.x ** 2 + mouseDistant.y ** 2), maxRadiusMovement)
    const angle = Math.atan2(mouseDistant.x, mouseDistant.y)
    const xMovement = radius * Math.sin(angle) + offset + 'px'
    const yMovement = radius * Math.cos(angle) + offset + 'px'
    return {
      x: xMovement,
      y: yMovement,
    }
  }
})

function IIFE(callback) {
  callback()
}
