import './App.css';
import {useEffect, useRef, useState} from "react";
import Toast from "./component/Toast";

function App() {
    // 게임 시작 버튼을 누르기 전에 Dice의 img가 보이지 않도록 설정
    const [gameStart, setGameStart] = useState(true);
    const [dice, setDice] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [activePlayer, setActivePlayer] = useState(1);
    const [userScore, setUserScore] = useState({user1: 0, user2: 0});
    const [winner, setWinner] = useState(null);
    const diceImgRef = useRef(null);

    useEffect(() => {
        if (diceImgRef.current) {
            diceImgRef.current.src = `/assets/dice${dice}.png`;
        }
        checkWinner();
        // console.log("diceImgRef.current: ", diceImgRef.current);
    }, [dice, winner, gameStart, userScore.user1, userScore.user2]);

    // [0] 게임의 진행 여부와 상관 없이 초기화
    const initGame = () => {
        setGameStart(true);
        setCurrentScore(0);
        setDice(0);
        setUserScore({user1: 0, user2: 0});
        setActivePlayer(1);
        setWinner(null);
    }

    // [1] 게임 시작하는 경우
    // View가 처음 렌더링 되는 경우 gameStart = true;
    const startGame = () => {
        gameStart ? rollDice() : setGameStart(true);
    }

    // [2] 주사위 굴리기
    const rollDice = () => {
        checkWinner();
        if (gameStart) {
            let randomDice = getDiceNumber();
            setDice(randomDice);

            // dice의 눈이 1,2인 경우 게임 종료 및 턴 넘기고, init 진행
            if (randomDice <= 0) {
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
        if (gameStart && !winner) {
            setCurrentScore(0); // 현재 굴린 주사위 값 초기화
            setActivePlayer(prevPlayer => (prevPlayer === 1 ? 2 : 1));
        }
    }

    // [4] hold 버튼 누르는 경우 점수 계산해주기
    const holdGame = () => {
        if (gameStart && !winner) {
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
        }
        setCurrentScore(0);
        checkWinner();
        if (!winner) {
            changePlayer();
        }
    }

    // [2-1] 주사위 굴리기 : 랜덤 주사위 숫자
    const getDiceNumber = () => {
        return Math.trunc(Math.random() * 6) + 1;
    }

    // [6] 승리 표기하기
    const checkWinner = () => {
        if (userScore.user1 >= 50) {
            setGameStart(false);
            setWinner(1);
        } else if (userScore.user2 >= 50) {
            setGameStart(false);
            setWinner(2);
        }
    }

    const closeModal = () => {
        setWinner(null);
        initGame();
    }

    return (
        <main>
            <section className={ winner === 1 ?
                "player player--winner" : (gameStart && activePlayer === 1) ? "player player--active" : "player" }>
                <h2 className="name" id="name--0">Player 1</h2>
                <p className="score" id="score--0">{userScore.user1 ? userScore.user1 : 0}</p>
                {winner === 1 && <p className="current-label">PLAYER 1이 이겼습니다.</p>}
                <div className="current">
                    <p className="current-label">Current</p>
                    <p className="current-score" id="current--0">
                        {activePlayer === 1 && gameStart ? currentScore : 0}
                    </p>
                </div>
            </section>
            <section className={ winner === 2 ?
                "player player--winner" : (gameStart && activePlayer === 2) ? "player player--active" : "player" }>
                <h2 className="name" id="name--1">Player 2</h2>
                <p className="score" id="score--1">{userScore.user2 ? userScore.user2 : 0}</p>
                {winner === 2 && <p className="current-label">PLAYER 2가 이겼습니다.</p>}
                <div className="current">
                    <p className="current-label">Current</p>
                    <p className="current-score" id="current--1">
                        {activePlayer === 2 && gameStart ? currentScore : 0}
                    </p>
                </div>
            </section>
            <button className="btn btn--new" onClick={initGame}>🔄 New game</button>
            {dice !== 0 && <img ref={diceImgRef} src={`/assets/dice${dice}.png`} alt="Playing dice" className="dice"/>}
            <button className="btn btn--roll" onClick={startGame} disabled={!gameStart}>🎲 Roll dice</button>
            <button className="btn btn--hold" onClick={holdGame} disabled={!gameStart}>📥 Hold</button>
            {winner !== null && <Toast message={winner} onConfirm={closeModal}/>}
        </main>
    );
}

export default App;
