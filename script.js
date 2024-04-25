class EventsArray
{
    array = [];
    subscribers = []; // Наш подписчик/устройство в конце трубы.

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    push(newValue){
        this.array.push(newValue);
        this.subscribers.forEach((subscriber) => {
            subscriber(newValue);
        });
    }
}

counter = 0; // Изначально 0 оборотов.
eventsArray = new EventsArray(); // Массив eventsArray - это наша труба.
eventsArray.subscribe((newValue) => { // Прикрепляем наше устройство "счётчика" в конец трубы.
    counter++; // Каждый новый оборот = новый мячик, значит мячиков стало на 1 больше.
    console.log(counter); // Проверяем вывод координат
});

eventsArray.subscribe((newValue) => { // Прикрепляем второе наше устройство, которое выводит определённые характеристики того, что выпало из трубы.
    console.log({x: newValue.clientX, y: newValue.clientY});
});

const button = document.getElementById('main');
// Каждый раз, когда происходит клик по кнопке, мы будем
button.addEventListener('click', event => {
    // добавлять это событие в массив eventsArray, как бы бросая теннисный мячик в трубу.
    eventsArray.push(event); // event - это теннисный мячик.
});
