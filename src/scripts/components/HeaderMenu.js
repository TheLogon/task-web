const menu = document.querySelector('.header__inner')
if (menu) {
  const menuBtn = document.querySelector('.menu__btn')
  const menuClose = document.querySelector('.header__back_btn')

  menuBtn.addEventListener('click', () => {
    menu.classList.add('active')
  })

  menuClose.addEventListener('click', () => {
    menu.classList.remove('active')
  })
}

const modals = document.body.querySelectorAll('[data-modal]')

export function open(modal) {
  const scrollbarWidth = window.innerWidth - document.body.offsetWidth
  document.body.classList.add('disable-scroll')
  document.body.style.paddingRight = `${scrollbarWidth}px`
  modal?.classList.add('open')
}

export function close(modal) {
  document.body.classList.remove('disable-scroll')
  document.body.style.paddingRight = null
  modal?.classList.remove('open')
}

if (modals) {
  window.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      modals.forEach(modal => {
        close(modal)
      })
    }
  })

  modals.forEach(modal => {
    const closeBtns = modal.querySelectorAll('.close-btn')

    modal.addEventListener('click', e => {
      if (e.target.classList.contains('modal')) {
        close(modal)
      }
    })

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        close(modal)
      })
    })
  })
}

function modalControl(modalSelector, btnSelector) {
  const modal = document.body.querySelector(modalSelector)
  const openBtn = document.body.querySelectorAll(btnSelector)
  const applyBtn = modal?.querySelector('.apply-btn')

  openBtn?.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!modal.classList.contains('open')) {
        modals.forEach(modal => {
          close(modal)
        })
        if (btn.classList.contains('listing-card') && btn.href) {
          return
        }
        open(modal)
      } else {
        close(modal)
      }
    })
  })

  applyBtn?.addEventListener('click', () => {
    close(modal)
  })
}

modalControl(
  '[data-modal="add-user-modal"]',
  '[data-call-modal="add-user-modal"]'
)

modalControl(
  '[data-modal="edit-user-modal"]',
  '[data-call-modal="edit-user-modal"]'
)

modalControl(
  '[data-modal="delete-user-modal"]',
  '[data-call-modal="delete-user-modal"]'
)

modalControl(
  '[data-modal="info-user-modal"]',
  '[data-call-modal="info-user-modal"]'
)

modalControl(
  '[data-modal="add-bid-modal"]',
  '[data-call-modal="add-bid-modal"]'
)

modalControl(
  '[data-modal="edit-bid-modal"]',
  '[data-call-modal="edit-bid-modal"]'
)

modalControl(
  '[data-modal="delete-bid-modal"]',
  '[data-call-modal="delete-bid-modal"]'
)

modalControl(
  '[data-modal="info-bid-modal"]',
  '[data-call-modal="info-bid-modal"]'
)
