const player = {
  currentScore: 0,
  totalScore: 0,
  rolls: 0,
};

const computer = {
  currentScore: 0,
  totalScore: 0,
  rolls: 0,
};


function rollDie(diceId) {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  const diceImagePath = `images/dice${diceValue}.png`;
  const diceElement = document.getElementById(diceId);
  const diceImageElement = document.createElement('img');
  diceImageElement.src = diceImagePath;
  diceImageElement.alt = `Dice ${diceValue}`;
  diceImageElement.class = 'diceimg'
  diceElement.innerHTML = '';
  diceElement.appendChild(diceImageElement);
  return diceValue;
}


function updateScores() {
  const playerDice1 = rollDie('player-dice-1');
  const playerDice2 = rollDie('player-dice-2');
  const computerDice1 = rollDie('computer-dice-1');
  const computerDice2 = rollDie('computer-dice-2');

  player.rolls++;
  computer.rolls++;

  let playerScoreThisRound, computerScoreThisRound;

  if (playerDice1 === 1 || playerDice2 === 1) {
    playerScoreThisRound = 0;
  } else if (playerDice1 === playerDice2) {
    playerScoreThisRound = (playerDice1 + playerDice2) * 2;
  } else {
    playerScoreThisRound = playerDice1 + playerDice2;
  }

  if (computerDice1 === 1 || computerDice2 === 1) {
    computerScoreThisRound = 0;
  } else if (computerDice1 === computerDice2) {
    computerScoreThisRound = (computerDice1 + computerDice2) * 2;
  } else {
    computerScoreThisRound = computerDice1 + computerDice2;
  }

  player.currentScore = playerScoreThisRound;
  computer.currentScore = computerScoreThisRound;

  player.totalScore += playerScoreThisRound;
  computer.totalScore += computerScoreThisRound;


  document.getElementById('player-current-score').textContent = player.currentScore;
  document.getElementById('computer-current-score').textContent = computer.currentScore;

  document.getElementById('player-total-score').textContent = player.totalScore;
  document.getElementById('computer-total-score').textContent = computer.totalScore;

  if (player.rolls === 3 && computer.rolls === 3) {

    player.totalScore += playerScoreThisRound;
    computer.totalScore += computerScoreThisRound;

    let resultMessage = 'It\'s a tie!';
    if (player.totalScore > computer.totalScore) {
      resultMessage = 'player';
      setTimeout(() => {
        showGameOverPopup(resultMessage, 'Thanks for playing!');
      }, 1000);

    } else if (player.totalScore < computer.totalScore) {
      resultMessage = 'Computer wins!';

      setTimeout(() => {
        showGameOverPopup(resultMessage, 'Thanks for playing!');
      }, 1000);
    }


    document.getElementById('roll-dice-btn').setAttribute('disabled', 'disabled');
  }
}


function resetGame() {
  player.totalScore = 0;
  player.currentScore = 0;
  player.rolls = 0;
  computer.totalScore = 0;
  computer.currentScore = 0;
  computer.rolls = 0;


  document.getElementById('player-current-score').textContent = '0';
  document.getElementById('player-total-score').textContent = '0';
  document.getElementById('computer-current-score').textContent = '0';
  document.getElementById('computer-total-score').textContent = '0';


  document.getElementById('roll-dice-btn').removeAttribute('disabled');


  document.querySelectorAll('.dice').forEach((dice) => {
    dice.innerHTML = '';
  });
}


function showGameOverPopup(winner, message) {
  const winnerMessage = winner === 'player' ? 'Congratulations! You win!' : 'Computer wins!';
  document.getElementById('winner-message').textContent = winnerMessage;
  document.getElementById('personal-message').textContent = message;
  document.getElementById('game-over-popup').style.display = 'flex';
}


function closeGameOverPopup() {
  document.getElementById('game-over-popup').style.display = 'none';
  setTimeout(() => {
    resetGame()
  }, 4000);;
}

function showSections() {
  const rulesSection = document.querySelector('.rules');
  const howToPlaySection = document.querySelector('.how-to-play');

  rulesSection.classList.add('show');
  howToPlaySection.classList.add('show');
}

setTimeout(showSections, 1000);


document.getElementById('close-popup-btn').addEventListener('click', closeGameOverPopup);



document.getElementById('roll-dice-btn').addEventListener('click', updateScores);
document.getElementById('reset-btn').addEventListener('click', resetGame);


resetGame();