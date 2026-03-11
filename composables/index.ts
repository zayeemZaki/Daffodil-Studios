// Vue composables for reusable logic

export const useScrollProgress = () => {
  const scrollProgress = ref(0)
  let ticking = false

  const updateScrollProgress = () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    ticking = false
  }

  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(updateScrollProgress)
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    updateScrollProgress()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { scrollProgress }
}

export const useSectionAnimations = () => {
  let observer: IntersectionObserver | null = null

  const observe = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1'
            entry.target.classList.add('section-animate')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('[data-animate]').forEach((el) => observer!.observe(el))
  }

  onMounted(() => nextTick(observe))

  onUnmounted(() => observer?.disconnect())
}
