const container = document.getElementById('core');
const reset = document.getElementById('reset');
const standard = document.getElementById('standard');
const eraser = document.getElementById('eraser');
const random = document.getElementById('random');
const acid = document.getElementById('acid');

const buttons = document.querySelectorAll('button');

const defaultGrid = 16;
var pixel = document.getElementById('pixels');
const setSize = document.getElementById('new-size');
var newSize= '16';
var color = `#708090`;
let red;
let green;
let blue;

function makeGrid(size) {
    core.style.gridTemplateColumns = `repeat(${size}, 2fr)`;
    core.style.gridTemplateRows = `repeat(${size}, 2fr)`;

    for(var i = 0; i < size*size; i++){
        const div = document.createElement('div');
        div.classList.add('grid');
        container.appendChild(div);
        div.addEventListener('mouseover', colourChange);
        /*() =>{
            div.style.background = color;
        });*/
        reset.addEventListener('click', () => {
            div.style.background = `#FFFAF0`;
            standard.disabled = false;
            eraser.disabled = false;
            });

            
    }
};

function colourChange(e) {
    if (acid.disabled === true){
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    } else if (standard.disabled = true){
        e.target.style.backgroundColor = `#708090`;
    } else if (eraser.disabled = true){
        e.target.style.backgroundColor = `#FFFAF0`;
    } else if (random.disabled = true) {
        e.target.style.backgroundColor;
    };
};

function randomC() {
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
}

acid.addEventListener('click', () => {
    buttons.disabled = false;

    acid.disabled = true;
    standard.disabled = false;
    random.disabled = false;
    eraser.disabled = false;
})

standard.addEventListener('click', () => {
    standard.disabled = true;
    eraser.disabled = false;
    acid.disabled = false;
    color = `#708090`;
});

eraser.addEventListener('click', () => {
    eraser.disabled = true;
    standard.disabled = false;
    random.disabled = false;
    acid.disabled = false;
    color = `#FFFAF0`;
});

random.addEventListener('click', () => {
    random.disabled = false;
    eraser.disabled = false;
    standard.disabled = false;
    acid.disabled = false;
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
    color = `rgb(${red}, ${green}, ${blue})`;
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