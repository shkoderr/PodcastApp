//валидация для формы ввода (работает, если больше 10 символов)
export function isValid(value) {
  return value.length >= 10
}

//создаём модальное окно
export function createModal(title, cont) {
  const modal = document.createElement('div')
  modal.classList.add('modal')

  mui.overlay('on', modal)
}