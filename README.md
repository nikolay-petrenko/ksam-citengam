> Для удобства совместной работы на проекте, рекомендуется всем установить в свой редактор плагин [EditorConfig](https://editorconfig.org/#download).

### Установить все зависимости

`npm install` or `npm i`

### Основной таск для разработки

`gulp`

### Таск для деплоя на сервер

`gulp deploy`

### Создать компонент

`gulp make --componentName--option`

`* without option  --pug/scss`

`* option == 1     --pug/sass`

`* option == 2     --pug/scss/js`

`* option == 3     --pug/sass/js`

### Пример подключения js-полифила:

```js
import 'core-js/features/array/includes';
console.log([1, 2, 3, 4].includes(4));
```

Информация о `core-js`: [github](https://github.com/zloirock/core-js).
