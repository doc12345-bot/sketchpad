const container = document.getElementById('core');
const reset = document.getElementById('reset');
const standard = document.getElementById('standard');
const eraser = document.getElementById('eraser');
const defaultGrid = 16;
var pixel = document.getElementById('pixels');
const setSize = document.getElementById('new-size');
var newSize= '16';
var color = "slategray";

function makeGrid(size) {
    core.style.gridTemplateColumns = `repeat(${size}, 2fr)`;
    core.style.gridTemplateRows = `repeat(${size}, 2fr)`;

    for(var i = 0; i < size*size; i++){
        const div = document.createElement('div');
        div.classList.add('grid');
        container.appendChild(div);
        div.addEventListener('mouseover', () =>{
            div.style.background = color;
        });
        reset.addEventListener('click', () => {
            div.style.background = "floralwhite";
            standard.disabled = false;
            eraser.disabled = false;
            });
    }
};


    standard.addEventListener('click', () => {
        standard.disabled = true;
        eraser.disabled = false;
        color = "slategray";
    });
    eraser.addEventListener('click', () => {
        eraser.disabled = true;
        standard.disabled = false;
        color = "floralwhite";
    });

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