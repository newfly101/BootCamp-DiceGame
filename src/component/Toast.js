import React from 'react';
import ReactDOM from "react-dom";
import classes from "./Toast.module.css";

const Toast = (props) => {
    return (
    <div>
        {ReactDOM.createPortal(
            <span></span>,
            document.getElementById('backdrop-root')
        )}
        <div className={classes.backdrop}/>
        <div className={`${classes.card} ${classes.modal}`}>
            <header className={classes.header}>
                {/*<h2>승리</h2>*/}
            </header>
            <div className={classes.content}>
                <p>PLAYER {props.message}{props.message === 1 ? '이' : '가'} 이겼습니다.</p>
            </div>
            <footer className={classes.actions}>
                <button
                    className={classes.button}
                    onClick={props.onConfirm}
                >
                    Okay
                </button>
            </footer>
        </div>
    </div>
)
    ;

};

export default Toast;