import React from "react";

export function Box(prop) {
    const value = prop.value;
    let bg, fc, fs = "50px";

    if (value === 0) {
        bg = "#ffffff";
    } else if (value === 2) {
        bg = "#E6EFEA";
    } else if (value === 4) {
        bg = "#D8E5E1";
    } else if (value === 8) {
        bg = "#CBDCD7";
    } else if (value === 16) {
        bg = "#BDD2CD";
    } else if (value === 32) {
        bg = "#AFC8C3";
    } else if (value === 64) {
        bg = "#A1BEBA";
    } else if (value === 128) {
        bg = "#93B4B0";
    } else if (value === 256) {
        bg = "#85AAA6";
    } else if (value === 512) {
        bg = "#78A19C";
    } else if (value === 1024) {
        fs = "35px";
        bg = "#6A9793";
    } else if (value === 2048) {
        fs = "35px";
        bg = "#5C8D89";
    } else {
        fs = "35px";
        bg = "#5C8D89";
    }

    fc = (value >= 128) ? "white" : "black";

    return (
        <div className="box blob" style={{background: bg, color: fc, fontSize: fs}}>
            <p>{value ? value : null}</p>
        </div>
    )
}