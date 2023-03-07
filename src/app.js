//============Импортируем стили и функции==========
import { Question } from "./question";
import { isValid } from './utils'
import './styles.css'

//==============Объявление переменных==============
const form = document.getElementById('form')
//для оптимизации кода будем проводить поиск дочерних элементов формы в её контексте, однако, у формы нет функции getElementById, поэтому используем querySelector:
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
const modalBtn = document.getElementById('modal-btn') 

//=============Добавляем события==================
window.addEventListener('load', Question.renderList)
//при загрузке страницы рендерим список вопросов
form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value) 
  //кнопка активируется только когда форма валидна
})
modalBtn.addEventListener('click', openModal)


function submitFormHandler(event) {
  event.preventDefault()

  if (isValid(input.value)) { 
    //если текст в форме прошёл валидацию, создаём объект вопроса
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON()
    }

    submitBtn.disabled = true //пока идёт запрос на сервер, пользователь не может спамить
    //async request to server to save question
    Question.create(question).then( () => { //отправляем вопрос на сервер
      input.value = '' //очищаем поле ввода
      input.className = '' //убираем красное подчёркивание поля ввода и других классов
      submitBtn.disabled = false //снова включаем кнопку сабмита
    })
  }
}

function openModal() {
  
}