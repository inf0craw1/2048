import React, { useState, useRef, useEffect } from "react";
import { Box } from "./components/Box";
import "./css/app.scss";

const GAME_SETTING = {
    display: {
        width: 640,
        height: 480,
    }
}


function App() {
        
    const [board, setBoard] = Object.freeze(useState(Array.from({length: 4},()=> Array.from({length: 4}, () => 0))));
    const control = useRef(null);
    useEffect(() => {
        setBoard([
            [32,32,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]);
        window.addEventListener("keydown", handleKeyDown);
        control.current.focus();
    }, [])

    function createRandomBox(){
        let nums = [32,32,32,32];
        let createNum = Math.floor(Math.random()*4);
        let tmpBoard = board.slice();
        let zeroNum = 0;
        let randomPos;
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(tmpBoard[i][j] === 0) zeroNum++;
            }
        }
        if(zeroNum === 0) return;
        randomPos = Math.floor(Math.random()*zeroNum);
        console.log(randomPos);
        let zeroIndex = 0;
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(tmpBoard[i][j] === 0){
                    if(randomPos === zeroIndex){
                        tmpBoard[i][j] = nums[createNum];
                        return;
                    }
                    zeroIndex++;
                }
            }
        }
    }

    function handleKeyDown(e){
        let tmpBoard = board.slice();
        if(e.keyCode === 37){ // left
            for(let k = 0; k < 3; k++){
                for(let i = 0; i < 4; i++){
                    for(let j = 0; j < 3; j++){
                        if(tmpBoard[i][j] === tmpBoard[i][j+1]){
                            tmpBoard[i][j] *=2;
                            tmpBoard[i][j+1] = 0;
                        } else if(tmpBoard[i][j] === 0){
                            tmpBoard[i][j] = tmpBoard[i][j+1];
                            tmpBoard[i][j+1] = 0;
                        }
                    }
                }
            }
            createRandomBox();
        } else if(e.keyCode === 38){ // top
            for(let k = 0; k < 3; k++){
                for(let j = 0; j < 4; j++){
                    for(let i = 0; i < 3; i++){
                        if(tmpBoard[i][j] === tmpBoard[i+1][j]){
                            tmpBoard[i][j] *=2;
                            tmpBoard[i+1][j] = 0;
                        } else if(tmpBoard[i][j] === 0){
                            tmpBoard[i][j] = tmpBoard[i+1][j];
                            tmpBoard[i+1][j] = 0;
                        }
                    }
                }
            }
            createRandomBox();
        } else if(e.keyCode === 39){ // right
            for(let k = 0; k < 3; k++){
                for(let i = 0; i < 4; i++){
                    for(let j = 3; j >= 1; j--){
                        if(tmpBoard[i][j] === tmpBoard[i][j-1]){
                            tmpBoard[i][j] *=2;
                            tmpBoard[i][j-1] = 0;
                        } else if(tmpBoard[i][j] === 0){
                            tmpBoard[i][j] = tmpBoard[i][j-1];
                            tmpBoard[i][j-1] = 0;
                        }
                    }
                }
            }
            createRandomBox();
        } else if(e.keyCode === 40){ // bottom
            for(let k = 0; k < 3; k++){
                for(let j = 0; j < 4; j++){
                    for(let i = 3; i >= 1; i--){
                        if(tmpBoard[i][j] === tmpBoard[i-1][j]){
                            tmpBoard[i][j] *=2;
                            tmpBoard[i-1][j] = 0;
                        } else if(tmpBoard[i][j] === 0){
                            tmpBoard[i][j] = tmpBoard[i-1][j];
                            tmpBoard[i-1][j] = 0;
                        }
                    }
                }
            }
            createRandomBox();
        }
        setBoard(tmpBoard);
    }

    return (
        <div className="App" ref={control} onKeyDown={handleKeyDown}>
            <div id="display">
                {board.map((line, lineIndex) => line.map((v, vIndex) => ( 
                    <Box key={lineIndex + "" + vIndex} value={v} />
                )))}
                <div id="player"></div>
            </div>
            <input type="text" id="control"/>
        </div>
    );
}

export default App;
