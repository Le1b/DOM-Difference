window.diff = function(dataBefore, dataAfter, result) {
    // Змінна в якій буде зберігатися найдовший масив
    var arr;

    // Ініціалізація функції diff
    if (dataBefore == undefined && dataAfter == undefined) {
        // У змінну dataBefore присвоюємо вміст блока до змін
        // У змінну dataAfter присвоюємо вміст блока після змін
        // У масиві result будуть зберігатися об'єкти змін
        var dataBefore = document.getElementById('before').children,
            dataAfter = document.getElementById('after').children,
            result = new Array();
    }

    // Знаходимо в якому із блоків більше елементів
    arr = dataBefore.length > dataAfter.length ? dataBefore : dataAfter;

    // В циклі зрівнюються елементи на можливі варіанти додавання/видалення/зміни
    for (var i = 0; i < arr.length; i++) {

        // Якщо у блоці ДО елемент відсутній
        if (!dataBefore[i]) {
            // Підсвічуємо елемент у блоці ПІСЛЯ змін як доданий
            dataAfter[i].classList.add('added');
            // Додаємо у масив елемент та вказуємо що він доданий у блок ПІСЛЯ
            result.push({
                type: 'added',
                element: dataAfter[i]
            });

        } else if (!dataAfter[i]) {
            // Підсвічуємо елемент у блоці ДО змін як видалений
            dataBefore[i].classList.add('deleted');
            // Додаємо у масив елемент та вказуємо що він видалений з блоку ДО
            result.push({
                type: 'removed',
                element: dataBefore[i]
            });

        // Перевіряємо чи теги та вміс елементів однакові
        } else if ((dataBefore[i].nodeName == dataAfter[i].nodeName) && (dataBefore[i].innerHTML == dataAfter[i].innerHTML)) {

            // Підсвічуємо елементи
            dataBefore[i].classList.add('equal');
            dataAfter[i].classList.add('equal');

            // Перевіряємо якщо теги однакові, але вміст відрізняється
        } else if ((dataBefore[i].nodeName == dataAfter[i].nodeName) && (dataBefore[i].innerHTML != dataAfter[i].innerHTML)) {

            // Визиваємо рекурсиво ф-цію diff та передаємо дочірні елементи та масив об'єктів
            diff(dataBefore[i].children, dataAfter[i].children, result);

            // Підсвічуємо елементи у блоках ДО та ПІСЛЯ змін як змінені
            dataBefore[i].classList.add('changed');
            dataAfter[i].classList.add('changed');

            // Додаємо у масив змінені елементи та вказуємо на що було змінено вміст елемента ДО
            result.push({
                type: 'changed',
                beforeElement: dataBefore[i],
                afterElement: dataAfter[i],
                html: dataAfter[i].innerHTML
            });

            // Перевіряємо на випадок різних тегів
        } else if (dataBefore[i].nodeName != dataAfter[i].nodeName) {
            // Підсвічуємо елементи у блоках ДО та ПІСЛЯ змін як видалені та додані
            dataBefore[i].classList.add('deleted');
            dataAfter[i].classList.add('added');

            // Додаємо у масив елемент та вказуємо що він доданий у блок ПІСЛЯ
            result.push({
                type: 'added',
                element: dataAfter[i]
            });

            // Додаємо у масив елемент та вказуємо що він видалений з блоку ДО
            result.push({
                type: 'removed',
                element: dataBefore[i]
            });
        }

    }

    // Повертаємо масив знім блоків ДО та ПІСЛЯ
    return result;
};
