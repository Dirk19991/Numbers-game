// Задаем константы
const wrapper = document.querySelector(".wrapper");
const cards = document.querySelectorAll(".card");
const button = document.querySelector("button");

// Функция для перемешивания
function randomizer(nodeList) {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  let i = arr.length;
  let j;
  let temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  let numInArr = 0;
  nodeList.forEach((element) => {
    element.dataset.number = arr[numInArr];
    numInArr++;
  });
}

// При загрузке документа карточкам присваиваются рандомные номера в data-number
document.addEventListener("DOMContentLoaded", randomizer(cards));

wrapper.addEventListener("click", (e) => {
  // исключаем ошибку когда клик не на элементе card
  if (!e.target.classList.contains("card")) return;
  // ничего не делаем если кликнули на элемент с классом closed
  if (e.target.classList.contains("closed")) return;
  /* добавляем класс opened открытым элементам, добавляем в массив и как только в массиве появилось два элемента,
  проверяем, равны ли они*/
  e.target.textContent = e.target.dataset.number;
  e.target.classList.add("opened");
  const openedElems = document.querySelectorAll(".opened");
  let openedArr = [];

  openedElems.forEach((element) => {
    openedArr.push(element.dataset.number);

    if (openedArr.length === 2 && openedArr[0] === openedArr[1]) {
      /* если элементы равны, убираем класс opened, добавляем closed,
    очищаем массив openedArr*/
      const twoOpenedElems = document.querySelectorAll(".opened");
      twoOpenedElems.forEach((element) => {
        element.classList.remove("opened");
        element.classList.add("closed");
      });
      openedArr.pop();
      openedArr.pop();
    }
    if (openedArr.length === 2 && openedArr[0] !== openedArr[1]) {
      /* если элементы неравны, ставим таймаут, чтоб игрок успел запомнить числа,
      убираем класс opened, очищаем textContent,
      очищаем массив openedArr. Когда появилось два неодинаковых элемента,
      добавляем всем элементам класс closed, чтоб игрок не мог открывать другие карточки*/

      const twoOpenedElems = document.querySelectorAll(".opened");
      cards.forEach((element) => {
        element.classList.add("closed");
      });
      setTimeout(() => {
        twoOpenedElems.forEach((element) => {
          element.classList.remove("opened");
          element.textContent = "";
          cards.forEach((element) => element.classList.remove("closed"));
        });
      }, 1000);

      openedArr.pop();
      openedArr.pop();
    }
  });

  // каждый раз проверяем на всех ли карточках есть textContent
  let cardsArr = Array.from(cards);
  if (cardsArr.every((elem) => elem.textContent !== "")) {
    button.classList.remove("hidden");
  }
});

// кнопка делает полный рестарт без перезагрузки страницы
button.addEventListener("click", () => {
  cards.forEach((element) => {
    element.textContent = "";
    element.classList.remove("closed");
    element.classList.remove("opened");
    randomizer(cards);
    button.classList.add("hidden");
  });
});
