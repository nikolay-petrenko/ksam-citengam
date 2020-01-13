### Установить все зависимости

`npm i`

### Основной таск для разработки

`gulp`

### Таск для деплоя на сервер

`gulp deploy`

### Создать компонент

`gulp make --componentName--option`

`* without option  --html/scss`

`* option == 1     --html/sass`

`* option == 2     --html/scss/js`

`* option == 3     --html/sass/js`

### Пример подключения js-полифила:

```js
import 'core-js/features/array/includes';
console.log([1, 2, 3, 4].includes(4));
```
Информация о `core-js`: [github](https://github.com/zloirock/core-js).