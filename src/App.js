import './App.css';

const player1 = document.querySelector('.player-0');
const player2 = document.querySelector('.player-1');
const score1 = document.querySelector('.score--0');
const score2 = document.querySelector('.score--1');
const current1 = document.querySelector('.current-0');
const current2 = document.querySelector('.current-1');

const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// eslint-disable-next-line no-unused-vars
let scores, currentScore, activePlayer, playing, gameStart;

const init = () => {
    // 초기화 작업 할 것
    // 전체 스코어 체크용 비교 후 winner 결정
    scores = [0, 0];
    // 주사위 roll시 currentScore에 추가해줘야 하기 때문에 매 회차시 더하는 값 초기화
    currentScore = 0;
    // 어떤 플레이어가 게임을 진행중인지 체크
    activePlayer = 1;
    // 게임 시작 flag -> false면 더이상 버튼이 동작하지 않도록 구현
    playing = true;

    // 각 element의 값을 0으로 초기화 해줌
    // score1.textContent = 0;
    // score2.textContent = 0;
    // current1.textContent = 0;
    // current2.textContent = 0;

    // 게임 시작 버튼을 누르기 전에 Dice의 img가 보이지 않도록 설정
    gameStart = false; //flag 값으로 설정할 예정

    // player1 또는 2가 승리 시 disabled 한 부분 제거
    // player-active 된 부분 제거
}

init();

// 사용자가 주사위를 던짐
    // 주사위 숫자가 무작위로 나옴 Math.Random()
// if (math.random() == 1 or 2)
    // 현재 점수 초기화
// else if 3,4,5,6 인가?
    // 현재 점수에 주사위 숫자를 더한다
    // 게임을 계속 진행함
// else
    // 사용자가 점수를 홀드한다
    // 현재 점수를 누적 점수에 더한다
// if 누적 점수가 50점을 넘는가?
    // 게임을 종료
// else 차례를 바꾼다.

// 새 게임 시작 (시작일 수도 또 리셋일수도 있음) 먼저 초기화 작업 해주기
btnNew.addEventListener('click', init);


function App() {
  return (
    <body>
    <main>
        <section className="player player-0">
            <h2 className="name" id="name--0">Player 1</h2>
            <p className="score" id="score--0">0</p>
            <div className="current">
                <p className="current-label">Current</p>
                <p className="current-score" id="current--0">0</p>
            </div>
        </section>
        <section className="player player-1">
            <h2 className="name" id="name--1">Player 2</h2>
            <p className="score" id="score--1">0</p>
            <div className="current">
                <p className="current-label">Current</p>
                <p className="current-score" id="current--1">0</p>
            </div>
        </section>
        {gameStart && <img src={`${process.env.PUBLIC_URL}/assets/dice3.png`} alt="Playing dice" className="dice"/>}
        <button className="btn btn--new">🔄 New game</button>
        <button className="btn btn--roll">🎲 Roll dice</button>
        <button className="btn btn--hold">📥 Hold</button>
    </main>
    </body>
  );
}

export default App;
