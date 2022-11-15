;(() => {
  // variable

  const isMobile = /Android|iPad|iPhone|iPod/i.test(navigator.userAgent)
  const maxWidth = 750
  const rem = 100

  // function

  const calc = (): number => {
    const Width = window.innerWidth || document.documentElement.clientWidth

    let width = Math.min(Width, maxWidth)
    if (!isMobile) {
      const Height = window.innerHeight || document.documentElement.clientHeight
      width = (width * Height) / 1334
    }
    return Math.trunc(width / (maxWidth / rem))
  }

  const init = () => {
    register()
    resize()
  }

  const register = () => {
    window.addEventListener('resize', resize)
    window.addEventListener('orientationchange', resize)
    document.addEventListener('DomContentLoaded', resize)
  }

  const resize = () => {
    const $el = document.documentElement
    let fontSize = calc()

    $el.style.fontSize = `${fontSize}px`

    const fs = parseFloat(window.getComputedStyle($el).fontSize)

    if (fs !== fontSize) {
      fontSize *= fontSize / fs
      $el.style.fontSize = `${fontSize}px`
    }
  }

  // execute
  init()
})()
