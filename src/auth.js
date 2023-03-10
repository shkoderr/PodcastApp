export function getAuthForm() {
  return `
    <form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
      <input type="email" id="email" required>
      <label for="email">Email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input type="password" id="password" required>
      <label for="password">Пароль</label>
    </div> 
    <button 
    type="submit" 
    class="mui-btn mui-btn--raised mui-btn--primary" >
    Войти
  </button>
  </form>
  `
}

//Функция для авторизации пользователей
export function authWithEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyDq8buLI6q-9lYzNYGruoMdBT-FHQQEx60' //ключ взяли с Firebase API
  //Отправляем post-запрос на сервер
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      email, password, 
      returnSecureToken: true 
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json()) //возвращаем ответ с сервера в json-формате
    .then(data => data.idToken) //извлекаем токен пользователя из json
}
