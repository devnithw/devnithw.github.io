// Shared theme setup for the notes section (kept in sync with style-3.js)
const fontname = "Roboto+Mono";
const fontweights = [300, 400];

const basecolor = "#777";
const accentcolor = "#007";
const highlightcolor = "#111";

const bodyfontweight = 300;
const bodyfontsize = "12pt";
const backgroundcolor = "#FFFAF0";

document.head.insertAdjacentHTML("beforeend",
    `<link href="https://fonts.googleapis.com/css2?family=${fontname}:wght@${fontweights.join(';')}&display=swap" rel="stylesheet" type="text/css">`);

document.body.style.fontFamily = fontname;
document.body.style.color = basecolor;
document.body.style.fontWeight = bodyfontweight;
document.body.style.fontSize = bodyfontsize;
document.body.style.backgroundColor = backgroundcolor;
