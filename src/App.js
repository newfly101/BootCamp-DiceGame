import './App.css';
import {useRef, useState} from "react";

// eslint-disable-next-line no-unused-vars
let scores, currentScore, activePlayer, playing;
const init = () => {
    // 초기화 작업 할 것
    currentScore = 0;
    activePlayer = 1;
    playing = true;

    // player1 또는 2가 승리 시 disabled 한 부분 제거
    // player-active 된 부분 제거
}

// 새 게임 시작 (시작일 수도 또 리셋일수도 있음) 먼저 초기화 작업 해주기
init();

function App() {
    // 게임 시작 버튼을 누르기 전에 Dice의 img가 보이지 않도록 설정
    const [gameStart, setGameStart] = useState(false);
    const [dice, setDice] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [user1Score, setUser1Score] = useState(0);
    const [user2Score, setUser2Score] = useState(0);
    const diceImgRef = useRef();


    const initGame = () => {
        if (gameStart) {
            // 전체 스코어 체크용 비교 후 winner 결정 추후 수정
            // scores = [0, 0];
            // 게임 시작 flag -> false면 더이상 버튼이 동작하지 않도록 구현
            playing = true;
            setGameStart(false);
            // 주사위 roll시 currentScore에 추가해줘야 하기 때문에 매 회차시 더하는 값 초기화
            setCurrentScore(0);
            setDice(0);
            setUser1Score(0);
            setUser2Score(0);
            // 어떤 플레이어가 게임을 진행중인지 체크
            activePlayer = 1;
        }
    }
    const startGame = () => {
        if (!gameStart) {
            setGameStart(true);
        }
        rollDice();
    }

    const holdGame = () => {
        if (activePlayer === 1) {
            setUser1Score(user1Score + currentScore);
        } else {
            setUser2Score(user2Score + currentScore);
        }
        // 사용자 값 초기화
        setCurrentScore(0);
        // 유저 변경
        changePlayer();
        if (user1Score >= 50) {
            playing = false;
            console.log("Player 1이 이겼습니다.");
        } else if (user2Score >= 50){
            playing = false;
            console.log("Player 2가 이겼습니다.");
        }
    }

    const getDiceNumber = () => {
        return Math.trunc(Math.random() * 6) + 1;
    }
    const changePlayer = () => {
        activePlayer = activePlayer === 1 ? 2 : 1;
    }

    const rollDice = () => {
        // console.log("player: ", activePlayer);
        if (playing) {
            let randomDice = getDiceNumber();
            // console.log("dice: ", newDice);
            setDice(randomDice);

            // Update dice image
            console.log("diceImgRef.current: ", diceImgRef.current);
            if (diceImgRef.current) {
                diceImgRef.current.src = `/assets/dice${randomDice}.png`;
            }

            // dice의 눈이 1,2인 경우 게임 종료 및 턴 넘기고, init 진행
            if (randomDice <= 2) {
                // 현재 값 초기화
                setCurrentScore(0);
                // player 차례 바꿔 주는 로직
                changePlayer();
            } else {
                // 현재 값에 Dice 값 추가
                setCurrentScore(currentScore + randomDice);
            }

            console.log("player: ", activePlayer, "dice: ", randomDice, "currentScore: ", currentScore);
        } else {
            // 게임이 종료된 경우 playing = false 인 경우
        }
    }

    return (
        <main>
            <section className="player player-0">
                <h2 className="name" id="name--0">Player 1</h2>
                <p className="score" id="score--0">{user1Score ? user1Score : 0}</p>
                <div className="current">
                    <p className="current-label">Current</p>
                    <p className="current-score" id="current--0">
                        {activePlayer === 1 && gameStart ? currentScore : 0}
                    </p>
                </div>
            </section>
            <section className="player player-1">
                <h2 className="name" id="name--1">Player 2</h2>
                <p className="score" id="score--1">{user2Score ? user2Score : 0}</p>
                <div className="current">
                    <p className="current-label">Current</p>
                    <p className="current-score" id="current--1">
                        {activePlayer === 2 && gameStart ? currentScore : 0}
                    </p>
                </div>
            </section>
            <button className="btn btn--new" onClick={initGame}>🔄 New game</button>
            {gameStart && <img ref={diceImgRef} src={`/assets/dice${dice}.png`} alt="Playing dice" className="dice"/>}
            <button className="btn btn--roll" onClick={startGame}>🎲 Roll dice</button>
            <button className="btn btn--hold" onClick={holdGame}>📥 Hold</button>
        </main>
    );
}

export default App;
