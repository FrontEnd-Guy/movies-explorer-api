# Базовый образ Node.js
FROM node:16-alpine

# Установка рабочей директории в контейнере
WORKDIR /app

# Копирование файлов package.json и package-lock.json из папки server
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода проекта в контейнер
COPY . ./

# Копирование файла .env в контейнер
COPY .env ./

# Переменная окружения для порта
ENV PORT=3003

# Открываем порт 3001
EXPOSE $PORT

# Команда для запуска приложения
CMD ["npm", "start"]
