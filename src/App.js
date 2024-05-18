import './App.css';

const init = () => {
    // 초기화 작업 할 것
}

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
init();



function App() {
  return (
    <body>
    <main>
        <section className="player">
            <h2 className="name" id="name--0">Player 1</h2>
            <p className="score" id="score--0">0</p>
            <div className="current">
                <p className="current-label">Current</p>
                <p className="current-score" id="current--0">0</p>
            </div>
        </section>
        <section className="player">
            <h2 className="name" id="name--1">Player 2</h2>
            <p className="score" id="score--1">0</p>
            <div className="current">
                <p className="current-label">Current</p>
                <p className="current-score" id="current--1">0</p>
            </div>
        </section>
        <img src={`${process.env.PUBLIC_URL}/assets/dice3.png`} alt="Playing dice" className="dice"/>
        <button className="btn btn--new">🔄 New game</button>
        <button className="btn btn--roll">🎲 Roll dice</button>
        <button className="btn btn--hold">📥 Hold</button>
    </main>
    </body>
  );
}

export default App;
