import React from "react";

export function Box(prop){
    const value = prop.value;
    let bg, fc, fs = "50px";

    if(value === 0){
        bg = "#ffffff";
    } else if(value === 2){
        bg = "#aaaaaa";
    } else if(value === 4){
        bg = "#999999";
    } else if(value === 8){
        bg = "#888888";
    } else if(value === 16){
        bg = "#777777";
    } else if(value === 32){
        bg = "#666666";
    } else if(value === 64){
        bg = "#555555";
    } else if(value === 128){
        bg = "#444444";
    } else if(value === 256){
        bg = "#333333";
    } else if(value === 512){
        bg = "#222222";
    } else if(value === 1024){
        fs = "35px";
        bg = "#111111";
    } else if(value === 2048){
        fs = "35px";
        bg = "#000000";
    } else {
        fs = "35px";
        bg = "#000000";
    }
    
    fc = (value >= 128) ? "white" : "black";

    return (
        <div className="box" style={{background: bg, color: fc, fontSize: fs}}>
            <p>{value ? value : null}</p>
        </div>
    )
}