import './App.css';
import {useEffect, useRef, useState} from "react";

// eslint-disable-next-line no-unused-vars
let currentScore, activePlayer, playing;
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
    const [userScore, setUserScore] = useState({user1: 0, user2: 0});
    const [winner, setWinner] = useState(null);
    const diceImgRef = useRef(null);

    useEffect(() => {
        if (diceImgRef.current) {
            diceImgRef.current.src = `/assets/dice${dice}.png`;
        }
        console.log("diceImgRef.current: ", diceImgRef.current);

        // 50점 이상인 경우 승리 표시하기
        if(playing) {
            checkWinner();
        }
        if (winner) {
            changePlayer();
        }
    }, [dice, winner, userScore.user1, userScore.user2]);

    const initGame = () => {
        if (gameStart) {
            playing = true;
            setGameStart(false);
            setCurrentScore(0);
            setDice(0);
            setUserScore({user1: 0, user2: 0});
            activePlayer = 1;
            setWinner(null);
        }
    }
    // [1] 게임 시작하는 경우
    // View가 처음 렌더링 되는 경우 gameStart = false;
    const startGame = () => {
        if (!gameStart) {
            setGameStart(true);
        }
        rollDice();
    }

    // [2] 주사위 굴리기
    const rollDice = () => {
        checkWinner();
        if (playing) {
            let randomDice = getDiceNumber();
            setDice(randomDice);

            // dice의 눈이 1,2인 경우 게임 종료 및 턴 넘기고, init 진행
            if (randomDice <= 2) {
                changePlayer();
            } else {
                // 현재 값에 Dice 값 추가
                setCurrentScore(currentScore + randomDice);
            }
        }
    }

    // [3] 주사위의 눈이 1,2인 경우 턴 교체
    // [5] hold 버튼 누르는 경우 턴 교체
    const changePlayer = () => {
        if (playing) {
            setCurrentScore(0); // 현재 굴린 주사위 값 초기화
            activePlayer = activePlayer === 1 ? 2 : 1;
        }
    }

    // [4] hold 버튼 누르는 경우 점수 계산해주기
    const holdGame = () => {
        if (activePlayer === 1) {
            let score = userScore.user1 + currentScore;
            setUserScore({
                user1: score,
                user2: userScore.user2,
            })
        } else {
            let score = userScore.user2 + currentScore;
            setUserScore({
                user1: userScore.user1,
                user2: score
            })
        }
        changePlayer();
    }

    // [2-1] 주사위 굴리기 : 랜덤 주사위 숫자
    const getDiceNumber = () => {
        return Math.trunc(Math.random() * 6) + 1;
    }

    // [6] 승리 표기하기
    const checkWinner = () => {
        if (userScore.user1 >= 50) {
            playing = false;
            setWinner(1);
        } else if (userScore.user2 >= 50) {
            playing = false;
            setWinner(2);
        }
    }

    return (
        <main>
            <section className={ winner === 1 ?
                "player player--winner" : activePlayer === 1 ? "player player--active" : "player" }>
                <h2 className="name" id="name--0">Player 1</h2>
                <p className="score" id="score--0">{userScore.user1 ? userScore.user1 : 0}</p>
                {winner === 1 && <p>1번 PLAYER 이겼습니다.</p>}
                <div className="current">
                    <p className="current-label">Current</p>
                    <p className="current-score" id="current--0">
                        {activePlayer === 1 && gameStart ? currentScore : 0}
                    </p>
                </div>
            </section>
            <section className={ winner === 2 ?
                "player player--winner" : activePlayer === 2 ? "player player--active" : "player" }>
                <h2 className="name" id="name--1">Player 2</h2>
                <p className="score" id="score--1">{userScore.user2 ? userScore.user2 : 0}</p>
                {winner === 2 && <p>2번 PLAYER 이겼습니다.</p>}
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
