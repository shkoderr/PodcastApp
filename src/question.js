export class Question {
  static create(question) {
    //Отправим наш вопрос на сервер в Firebase
    return fetch('https://podcast-app-f248d-default-rtdb.europe-west1.firebasedatabase.app/questions.json', {
      method: 'POST', //указываем метод POST - добавление в БД
      body: JSON.stringify(question),//объект, который мы добавляем
      headers: { //оптравляем доп. инф-ию о нашем post-запросе
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        question.id = response.name
        return question
      })
      .then(addToLocalStorage) //добавим наш вопрос в local storage
      .then(Question.renderList) //выводим вопросы в HTML
  }
  //Создадим функцию для вывода наших вопросов в HTML
  static renderList() {
    const questions = getQuestionsFromLocalStorage()

    const html = questions.length //если длина массива не ноль, то...
    ? questions.map(toCard).join('')
    //..то каждый вопрос рендерим в html и соединяем
    : `<div class="mui--text-headline">You haven't asked yet.</div>`
    //в противном случае, выводим такое сообщение в html
    //создадим функционал для отображения вопросов в html:
    const list = document.getElementById('list')

    list.innerHTML = html //заменяем содержимое нашими вопросами
  }
}

//Создадим функцию для добавления вопросов в local storage
function addToLocalStorage(question) {
  const all = getQuestionsFromLocalStorage() //создадим массив с вопросами
  all.push(question) //добавляем новые вопросы в массив
  localStorage.setItem('questions', JSON.stringify(all)) //добавляем их в local storage
}

//Создадим функцию, которая возвращает вопросы из locale storage и парсит их в JS массив
function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

//Формируем структуру нашего html с вопросами
function toCard(question) {
  return `
  <div class="mui--text-black-54">
  ${new Date(question.date).toLocaleDateString()}
  ${new Date(question.date).toLocaleTimeString()}
  </div>
  <div>${question.text}</div>
  <br>
  `
}