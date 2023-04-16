const OpenModal = () => {
  let ModalBackground = document.getElementById('ModalContainer')
  let Modal = document.getElementById('SignupModalWrapper')
  ModalBackground.style.display = 'flex'
  Modal.style.display = 'flex'
}
const CloseModal = () => {
  let ModalBackground = document.getElementById('ModalContainer')
  let Modal = document.getElementById('SignupModalWrapper')
  Modal.style.display = 'none'
  ModalBackground.style.display = 'none'
}

// 아래는 추가구현
const OpenTokenInput = () => {
  let TokenInput = document.getElementById('ValidationInputWrapper')
  TokenInput.style.display = 'flex'
}
const CloseTokenInput = () => {
  let TokenInput = document.getElementById('ValidationInputWrapper')
  TokenInput.style.display = 'none'
}

