"use strict";

const canvas = document.querySelector("#game"); // Находим canvas на странице
const ctx = canvas.getContext("2d"); // Инициализируем игровое поле как 2д площадку

const headScore = document.querySelector(".score"); // Находим счётчик на странице

const foodImg = new Image(); // Создаем экземпляр класса Image для отображения еды
foodImg.src = "./assets/images/apple.png"; // Подключаем рисунок еды

let box = 32; // Задаём размер 1-ой ячейки
let score = 0; // Ставим значение счётчика на 0

let food = { // Создаем объект еды
    x: Math.floor((Math.random() * 19)) * box, // Задаём еде случайное значение по Х
    y: Math.floor((Math.random() * 19)) * box // Задаём еде случайное значение по Y
};

let snake = []; // Создаём змейку
snake[0] = { // Указываем положение "головы" змейки
    x: 9 * box, // Х по центру поля
    y: 9 * box // Y по центру поля
};

document.addEventListener("keydown", direction); // Создаём ивент отслеживания нажатий на странице

let dir; // создаём переменную направления движения

function direction(event) { // Функция для корректировки движения
    if (event.keyCode === 37 && dir !== "right") { // Если нажата 37 клавиша и нет движения вправо, то двигаемся влево
        dir = "left";
    } else if (event.keyCode === 38 && dir !== "down") {
        dir = "up";
    } else if (event.keyCode === 39 && dir !== "left") {
        dir = "right";
    } else if (event.keyCode === 40 && dir !== "up") {
        dir = "down";
    }
}

function aetTail(head, arr) { // Функция проверки поедания хвоста
    for (let i = 0; i < arr.length; i++) { // Перебираем всё тело змейки
        if (head.x === arr[i].x && head.y === arr[i].y){ // Проверка на совпадение координат головы и тела змейки
            clearInterval(game); // Завершаем ход игры
            confirm("Игра окончена") ? location.reload() : ""; // выводим окно "конца игры" и перезагружаем страницу
        }
    }
}

function drawGame() { // Основная функция игры
    ctx.fillStyle = '#212837'; // Задаём странице цвет фона
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Отрисовываем фон по новой

    ctx.drawImage(foodImg, food.x, food.y); // Располагаем еду на поле

    for (let i = 0; i < snake.length; i++) { // Перебираем тело змеи
        ctx.fillStyle = "#60CBFF"; // Задаём цвет змеи
        ctx.fillRect(snake[i].x, snake[i].y, box, box); // Рисуем змею
    }

    let snakeX = snake[0].x; // Находим координаты головы змеи по X
    let snakeY = snake[0].y; // Находим координаты головы змеи по Y

    if (snakeX === food.x && snakeY === food.y) { // Проверка съели ли мы еду
        food = {
            x: Math.floor((Math.random() * 19)) * box,
            y: Math.floor((Math.random() * 19)) * box
        };
    } else { // Если нет, то удаляем последний элемент массива змеи
        snake.pop(); // Удаление последнего элемента
    }

    if (snakeX < -box || snakeX > box * 19 || snakeY < -box || snakeY > box * 19) { // Проверка на то не уткнулись ли мы в стену
        clearInterval(game); // Завершаем ход игры
        confirm("Игра окончена") ? location.reload() : ""; // выводим окно "конца игры" и перезагружаем страницу
    }

    if (dir === "left") snakeX -= box; // Проверка траектории движения и выдача пути направления
    if (dir === "right") snakeX += box; // Проверка траектории движения и выдача пути направления
    if (dir === "up") snakeY -= box; // Проверка траектории движения и выдача пути направления
    if (dir === "down") snakeY += box; // Проверка траектории движения и выдача пути направления

    let newHead = { // Создание новой головы
        x: snakeX,
        y: snakeY,
    };

    aetTail(newHead, snake) // Вызов функции "поедания хвоста"

    snake.unshift(newHead); // Добавляем новую голову
}

let game = setInterval(drawGame, 100); // Инициализация запуска игры с интервалом в 1млс
