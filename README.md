# Дипломный проект Movies-explorer (Фронтенд). Создан в рамках учебы на курсе ["Веб-разработчик"](https://praktikum.yandex.ru/web/) в  [Яндекс.Практикум](https://praktikum.yandex.ru/).

## Описание:
Репозиторий для приложения проекта `Movies`, включает себя два раздела: 

### Информационную
Содержит информацию о проекте, студенте и его проектах

### Сервис по поиску фильмов
После регистрации и авторизации пользователя появляется возможность осуществлять поиск фильмов, сохранять их и удалять. 
По [ТЗ](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/checklist_react_diplom.pdf) отображение фильмов происходит только после запроса к сервису [beatfilm-movies](https://api.nomoreparties.co/beatfilm-movies). 

## Ссылки

- API доступен по данной [ссылке](https://api.nikolaev.movies.nomoredomains.
- Публичный [домен](https://nikolaev.movies.nomoredomains.icu/)
- Макет в [Figma](https://disk.yandex.ru/d/fVy7WOzH9EjM0Q)
- [ТЗ к дипломной работе](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/checklist_react_diplom.pdf)

## Примененные знания
* Верстка
  - Соверменная верстка с использованием Flexbox и Grid Layout
  - Семантическая верстка
  - Адаптивная верстка
  - Методология БЭМ

* React
  - использование Create React App
  - хуки `useState` и `useEffect`
  - поднятие стейта
  - глобальный стейт через React Context
  - управляемые компоненты в элементах формы
  - использование реф для прямого доступа к DOM-элементам

* React Router
  - реализован функционал  регистрации и авторизации
  - защищенные маршруты
  - авторизация через JWT
  - работа с Local Starage

* Бэкенд
  - Node.js
  - express.js
  - MongoDB
  - Mongoose

### Инструкция по разрёртыванию проекта:
```bash
# клонирование репозитория
$ git clone https://github.com/Egornikolaev97/movies-explorer-frontend.git
# установка зависимостей
$ npm install
# запуск develop-сборки фронтенда
$ npm run start
```
---
