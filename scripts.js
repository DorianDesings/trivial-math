const question = document.getElementById('question');
const buttonsElement = [...document.querySelectorAll('.container__button')];
const buttons = document.getElementById('buttons');
const info = document.getElementById('questions-info');

let gameData;
let correctAnswer;
let index = 0;

const writeData = () => {
  question.textContent = gameData[index].question;
  for (let i = 0; i < gameData[index].answers.length; i++) {
    buttonsElement[i].setAttribute('data-answer', i);
    buttonsElement[i].textContent = gameData[index].answers[i];
  }
  correctAnswer = gameData[index].correctAnswer;
  info.textContent = `${index + 1} / ${gameData.length}`;
};

const getGameData = async () => {
  const request = await fetch('game.json');
  const data = await request.json();
  gameData = data.gameData;
  writeData();
};

const checkAnswer = userAnswer => {
  if (userAnswer === correctAnswer) {
    console.log('CHUPI');
    index += 1;
    if (index < gameData.length) {
      writeData();
    } else {
      console.log('FIN');
    }
  } else {
    console.log('MAL');
  }
};

window.addEventListener('load', () => {
  getGameData();
});

buttons.addEventListener('click', e => {
  if (e.target.classList.contains('container__button')) {
    checkAnswer(Number(e.target.dataset.answer));
  }
});
