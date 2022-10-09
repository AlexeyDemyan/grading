# Как работать над проектом

## Окружение

Для удобства работы над проектом используются инструменты из **Node.js** и **npm**. Все необходимые настройки произведены. Всё, что от вас требуется,— это убедиться, что на рабочем компьютере установлена **Node.js**, а после в терминале перейти в директорию с проектом и _единожды_ запустить команду:

```bash
npm install
```

Данная команда запустит процесс установки зависимостей проекта из **npm**.

После успешной установки зависимостей вы сможете использовать инструменты для разработки, вроде **ESLint** и **Browsersync**, которые идут с проектом. Для этого в файле `package.json` предусмотрены следующие сценарии...

### `npm run start`

Запускает локальный сервер с помощью **Browsersync**. После запуска сайт будет доступен для просмотра в браузере по адресу `http://localhost:3000`.

При сохранении изменений в любом js-файле в директории `/js` страница автоматически перезагрузится в браузере. Таким образом, вы можете следить за разработкой проекта в режиме реального времени.

> Обратите внимание, после запуска **Browsersync** продолжит работу, пока вы самостоятельно не остановите его, нажав в терминале сочетание клавиш `Ctrl` + `C`.

### `npm run lint`

Запускает **ESLint** для линтинга js-файлов в директории `/js` по правилам и требованиям к JavaScript-коду, принятым в Академии.

## Структура проекта

### `css/`, `fonts/`, `img/`

Директории со статическими файлами проекта: стилями, изображениями, шрифтами и т.д.

### `js/`

Ваша главная рабочая директория, в которой будут храниться все скрипты проекта.

### `index.html`

Главная страница проекта.

### `example-pages/`

Пример свёрстанных страниц. Откройте страницу `example-pages/index.html` в браузере, и далее - интересующую вас, чтобы посмотреть, как должен выглядеть интерфейс в том или ином случае.

### Остальное

Все остальные файлы в проекте являются служебными. Пожалуйста, не удаляйте и не изменяйте их самовольно.

### Затраченные часы:

18 часов. Подробнее:

2 часа - организация рабочей среды и изучение ТЗ
1 час - api модуль
3 часа - фильтры и кнопки
1 часа - подключение leaflet и настройка карты
3 часа - попапы на карту, открытие модалки, сообщения об ошибках
2 час - форма покупки и валидация
1 час - форма продажи с переделыванием рассчетов
1 час - валидация пароля и обработка ошибок
1 час - настройка отправки формы и тестирование
1 час - оптимизация формы, показ ошибок, сброс формы
1 час - исправления по внешнему виду в некоторых местах
1 час - чистка линтом, устранение консоль логов и т.д.


