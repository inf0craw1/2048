import React, {useState, useEffect} from "react";
import {useSwipeable} from "react-swipeable";
import {Box} from "./components/Box";
import "./css/app.scss";


function App() {
    const [board, setBoard] = Object.freeze(useState(Array.from({length: 4}, () => Array.from({length: 4}, () => 0))));

    useEffect(() => {
        let tmpBoard = board.slice();
        tmpBoard[0][0] = 2;
        setBoard(tmpBoard);
        window.addEventListener("keydown", handleKeyDown);
    }, [])

    function createRandomBox() {
        let nums = [2, 2, 2, 4];
        let createNum = Math.floor(Math.random() * 4);
        let tmpBoard = board.slice();
        let zeroNum = 0;
        let randomPos;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (tmpBoard[i][j] === 0) zeroNum++;
            }
        }
        if (zeroNum === 0) return;
        randomPos = Math.floor(Math.random() * zeroNum);
        let zeroIndex = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (tmpBoard[i][j] === 0) {
                    if (randomPos === zeroIndex) {
                        tmpBoard[i][j] = nums[createNum];
                        setBoard(tmpBoard);
                        return;
                    }
                    zeroIndex++;
                }
            }
        }
    }

    function handleKeyDown(e) {
        let tmpBoard = board.slice();
        if (e.keyCode === 37 || e.swipe === "left") {
            for (let k = 0; k < 3; k++) {
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (tmpBoard[i][j] === tmpBoard[i][j + 1]) {
                            tmpBoard[i][j] *= 2;
                            tmpBoard[i][j + 1] = 0;
                        } else if (tmpBoard[i][j] === 0) {
                            tmpBoard[i][j] = tmpBoard[i][j + 1];
                            tmpBoard[i][j + 1] = 0;
                        }
                    }
                }
            }
            setBoard(tmpBoard);
            createRandomBox();
        } else if (e.keyCode === 38 || e.swipe === "top") {
            for (let k = 0; k < 3; k++) {
                for (let j = 0; j < 4; j++) {
                    for (let i = 0; i < 3; i++) {
                        if (tmpBoard[i][j] === tmpBoard[i + 1][j]) {
                            tmpBoard[i][j] *= 2;
                            tmpBoard[i + 1][j] = 0;
                        } else if (tmpBoard[i][j] === 0) {
                            tmpBoard[i][j] = tmpBoard[i + 1][j];
                            tmpBoard[i + 1][j] = 0;
                        }
                    }
                }
            }
            setBoard(tmpBoard);
            createRandomBox();
        } else if (e.keyCode === 39 || e.swipe === "right") {
            for (let k = 0; k < 3; k++) {
                for (let i = 0; i < 4; i++) {
                    for (let j = 3; j >= 1; j--) {
                        if (tmpBoard[i][j] === tmpBoard[i][j - 1]) {
                            tmpBoard[i][j] *= 2;
                            tmpBoard[i][j - 1] = 0;
                        } else if (tmpBoard[i][j] === 0) {
                            tmpBoard[i][j] = tmpBoard[i][j - 1];
                            tmpBoard[i][j - 1] = 0;
                        }
                    }
                }
            }
            setBoard(tmpBoard);
            createRandomBox();
        } else if (e.keyCode === 40 || e.swipe === "bottom") {
            for (let k = 0; k < 3; k++) {
                for (let j = 0; j < 4; j++) {
                    for (let i = 3; i >= 1; i--) {
                        if (tmpBoard[i][j] === tmpBoard[i - 1][j]) {
                            tmpBoard[i][j] *= 2;
                            tmpBoard[i - 1][j] = 0;
                        } else if (tmpBoard[i][j] === 0) {
                            tmpBoard[i][j] = tmpBoard[i - 1][j];
                            tmpBoard[i - 1][j] = 0;
                        }
                    }
                }
            }
            setBoard(tmpBoard);
            createRandomBox();
        }
    }

    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            if (eventData.absX > eventData.absY) {
                if (eventData.absX > 100) {
                    if (eventData.deltaX < 0) {
                        handleKeyDown({swipe: "left"});
                    } else {
                        handleKeyDown({swipe: "right"});
                    }
                }
            } else {
                if (eventData.absY > 100) {
                    if (eventData.deltaY < 0) {
                        handleKeyDown({swipe: "top"});
                    } else {
                        handleKeyDown({swipe: "bottom"});
                    }
                }
            }
        }
    });

    return (
        <div className="App" {...handlers} >
            <div id="display">
                {board.map((line, lineIndex) => line.map((v, vIndex) => (
                    <Box key={lineIndex + "" + vIndex} value={v}/>
                )))}
            </div>
        </div>
    );
}

export default App;
