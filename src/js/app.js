const holes = document.querySelectorAll('.field_hole');
const numOfHoles = holes.length;
const randomField = () => Math.floor(Math.random() * numOfHoles);
let position;
let timer;
let loseIterator = 0;
const goblin = document.createElement('img');
goblin.classList.add('field_goblin');

function newPosition() {
  let newField;
  do {
    newField = randomField();
  } while (newField === position);

  position = newField;
}

function reloadTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (goblin.classList.contains('hide')) {
      goblin.classList.remove('hide');
    }
    newPosition();
    holes[position].insertAdjacentElement('afterbegin', goblin);
  }, 1000);
}

function hideGoblin() {
  goblin.classList.add('hide');
}

reloadTimer();

holes.forEach((element) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('field_goblin')) {
      hideGoblin();
      reloadTimer();
    } else if (loseIterator >= 4) {
      clearInterval(timer);
      hideGoblin();
    } else {
      loseIterator += 1;
    }
  });
});
