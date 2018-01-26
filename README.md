тестовое задание для Симбирсофта. делал 24 часа.

в качестве бэкенда используется модуль json-server: https://github.com/typicode/json-server 
он в общих чертах имитирует REST, но при этом все данные хранятся на клиенте в формате JSON. они находятся в корне проекта в файлк db.json

есть примитивная система авторизации/регистрации

проект запускается командой: npm run all 
она поочерёдно запускает ангуляровский сервер и json-server

в /src/app/config.ts содержатся самые общие настройки проекта. в частности:
хост, используемый в каждом ajax-запросе,
период обновления списка заданий(60 сек),
время показа всплывающих окон.
это удобно потому что не придётся метаться по всему коду проекта, если понадобится изменить глобальные настройки.

обновление списка задач я реализовал средствами библиотеки rxjs, но вообще говоря это не правильный подход потому что можно свалить сервер.
правильнее использовать сокеты, но я с ними никогда не работал и разбирался бы долго. для тестового задания сойдёт и так



использовалась такая среда:

Angular CLI: 1.6.5
Node: 8.9.4
OS: linux x64
Angular: 5.2.2
... animations, common, compiler, compiler-cli, core, forms
... http, language-service, platform-browser
... platform-browser-dynamic, router

@angular/cdk: 5.1.0
@angular/cli: 1.6.5
@angular/material: 5.1.0
@angular-devkit/build-optimizer: 0.0.42
@angular-devkit/core: 0.0.29
@angular-devkit/schematics: 0.0.52
@ngtools/json-schema: 1.1.0
@ngtools/webpack: 1.9.5
@schematics/angular: 0.1.17
typescript: 2.5.3
webpack: 3.10.0
