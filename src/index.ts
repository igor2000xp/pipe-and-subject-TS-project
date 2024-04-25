import {Subject, Subscription} from 'rxjs';

let counter = 0; // Изначально 0 оборотов.
const subscriptions: Subscription[] = [];

// Создаём экземпляр класса
const eventsArray = new Subject();

// Добавляем в массив, чтобы не забыть отписаться
subscriptions.push(eventsArray.subscribe((newValue: any) => {  // Прикрепляем наше устройство "счётчика" в конец трубы.
    counter++; // Каждый новый оборот = новый мячик, значит мячиков стало на 1 больше.
    console.log(counter);  // Проверяем вывод координат
}));

// Добавляем в массив, чтобы не забыть отписаться
subscriptions.push(eventsArray.subscribe((event: any) => { // Прикрепляем второе наше устройство, которое выводит определённые характеристики того, что выпало из трубы.
    console.log(`x:${event.clientX} y:${event.clientY}`);
}));

const button = document.getElementById('main');

// Каждый раз, когда происходит клик по кнопке, мы будем
button.addEventListener('click', event => {
    // добавлять это событие в массив eventsArray, как бы бросая теннисный мячик в трубу.
    eventsArray.next(event);  // event - это теннисный мячик.
});

const button2 = document.getElementById('removeSub');

button2.addEventListener('click', event => {
    // Отписываемся от всеё подписчиков
    subscriptions.forEach(sub => {
        sub.unsubscribe();
    })
});
