// Vue composables for reusable logic

export const useScrollProgress = () => {
  const scrollProgress = ref(0)

  const updateScrollProgress = () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    scrollProgress.value = scrollPercent
  }

  onMounted(() => {
    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScrollProgress)
  })

  return { scrollProgress }
}

export const useIntersectionObserver = () => {
  const observeElements = (callback: IntersectionObserverCallback) => {
    const observer = new IntersectionObserver(callback, { threshold: 0.1 })
    
    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach((section) => observer.observe(section))
    
    return observer
  }

  return { observeElements }
}