const container = document.getElementById('core');
const reset = document.getElementById('reset');
const standard = document.getElementById('standard');
const eraser = document.getElementById('eraser');
const random = document.getElementById('random');
const acid = document.getElementById('acid');
const pencil = document.getElementById('pencil');

let mode = "standard";

const buttons = document.querySelectorAll('button');

const defaultGrid = 16;
var pixel = document.getElementById('pixels');
const setSize = document.getElementById('new-size');
var newSize= '16';
var color = `#708090`;
let red;
let green;
let blue;
let lightness = 100;

function makeGrid(size) {
    core.style.gridTemplateColumns = `repeat(${size}, 2fr)`;
    core.style.gridTemplateRows = `repeat(${size}, 2fr)`;

    for(var i = 0; i < size*size; i++){
        const div = document.createElement('div');
        div.classList.add('grid');
        container.appendChild(div);
        div.addEventListener('mouseover', colourChange);
        reset.addEventListener('click', () => {
            div.style.background = `#FFFAF0`;
            mode = "standard";
            standard.disabled = false;
            eraser.disabled = false;
            acid.disabled = false;
            });
    }
};

function colourChange(e) {
    if (mode === "acid"){
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        e.target.style.background = `rgb(${red}, ${green}, ${blue})`;
    } else if (mode === "standard"){
        e.target.style.background = `#708090`;
    } else if (mode === "eraser"){
        e.target.style.background = `#FFFAF0`;
    } else if (mode === "random") {
        e.target.style.background = color;
    } else if (mode === "pencil") {
        
        if (lightness <= 100){
            lightness -0.10;
            e.target.style.background = `hsl(210, 13%, ${lightness}%)`;
        } else {
            lightness = 100;
            e.target.style.background = `hsl(210, 13%, ${lightness}%)`;
        };
    } else {
        e.target.style.background = `#708090`;
    };
};

function addShade(){
    do {
        this.style.opacity +0.1;
        } while(this.style.opacity >= 1)
};

pencil.addEventListener('click', () => {
    pencil.disabled = true;
    acid.disabled = false;
    standard.disabled = false;
    random.disabled = false;
    eraser.disabled = false;
    mode = "pencil";
})

acid.addEventListener('click', () => {
    acid.disabled = true;
    standard.disabled = false;
    random.disabled = false;
    eraser.disabled = false;
    pencil.disabled = false;
    mode = "acid";
})

standard.addEventListener('click', () => {
    standard.disabled = true;
    eraser.disabled = false;
    acid.disabled = false;
    pencil.disabled = false;
    color = `#708090`;
    mode = "standard";
});

eraser.addEventListener('click', () => {
    eraser.disabled = true;
    standard.disabled = false;
    acid.disabled = false;
    pencil.disabled = false;
    color = `#FFFAF0`;
    mode = "eraser";
});

random.addEventListener('click', () => {
    eraser.disabled = false;
    standard.disabled = false;
    acid.disabled = false;
    pencil.disabled = false;
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
    color = `rgb(${red}, ${green}, ${blue})`;
    mode = "random";
})

function updateValueBox(val) {
    document.getElementById('text-input').value = val;
};

function updatePixelRange(val) {
    document.getElementById('pixels').value = val;
};

pixel.addEventListener("input", function() {
    newSize = this.value;
});

setSize.addEventListener('click', function(){
    container.innerHTML = "";
    makeGrid(newSize);
});

window.onload = () => {
    makeGrid(defaultGrid);
};