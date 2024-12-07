function accordion(accordionSelector, pb) {
  const accordions = document.querySelectorAll(accordionSelector)

  if (accordions) {
    if (accordions[0]) {
      accordions[0].classList.add('open')
      const content = accordions[0].querySelector('.accordion-content')
      content.style.height = `${content.scrollHeight + pb}px`
    }
  }

  accordions?.forEach(accordion => {
    const trigger = accordion.querySelector('.accordion-trigger')
    const content = accordion.querySelector('.accordion-content')
    const contentHeight = content.scrollHeight + pb

    trigger.addEventListener('click', () => {
      if (!accordion.classList.contains('open')) {
        accordions.forEach(accordion => {
          const content = accordion.querySelector('.accordion-content')
          content.style.height = null
          accordion.classList.remove('open')
        })

        content.style.height = `${contentHeight}px`
        accordion.classList.add('open')
      } else {
        accordion.classList.remove('open')
        content.style.height = null
      }
    })
  })
}

accordion('.faq-block .accordion', 16)
accordion('.price-tab .accordion', 0)
