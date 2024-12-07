function initTabs(containerSelector) {
  const tabContainer = document.querySelector(containerSelector)
  const tabs = tabContainer?.querySelectorAll('[data-tab]')
  const tabContents = tabContainer?.querySelectorAll('[data-tab-content]')

  tabs?.forEach(tab => {
    tab.addEventListener('click', () => {
      const data = tab.dataset.tab

      tabs.forEach(el => {
        el === tab ? el.classList.add('active') : el.classList.remove('active')
      })

      tabContents.forEach(content => {
        content.dataset.tabContent === data
          ? content.classList.remove('hidden')
          : content.classList.add('hidden')
      })
    })
  })
}

initTabs('.main')
