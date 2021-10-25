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
let lightness = 90;

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
            div.style.opacity =
            mode = "standard";
            standard.disabled = false;
            eraser.disabled = false;
            acid.disabled = false;
            pencil.disabled = false;
            });
    }
};

function colourChange(e) {
    if (mode === "acid"){
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        e.target.style.background = `rgb(${red}, ${green}, ${blue})`;
        e.target.style.opacity = 1;
    } else if (mode === "standard"){
        e.target.style.background = `#708090`;
        e.target.style.opacity = 1;
    } else if (mode === "eraser"){
        e.target.style.background = `#FFFAF0`;
        e.target.style.opacity = 1;
    } else if (mode === "random") {
        e.target.style.background = color;
        e.target.style.opacity = 1;
    } else if (mode === "pencil") {
        let baseLightness = getLightness(e.target.style.background) *255;
        console.log(baseLightness);

        let lightened = lightenByTenth(e.target.style.background);
        console.log(lightened)

        let darkened = darkenByTenth(e.target.style.background);
        console.log(darkened);
        e.target.style.background = darkened;
    
    } else {
        e.target.style.background = `#708090`;
    };
};

function getLightness(rgbString){
    let rgbArray = (rgbString.replace(/ /g, ``).slice(4, -1).split(',').map(a => parseInt(a)));

    let highest = Math.max(...rgbArray);
    let lowest = Math.max(...rgbArray);

    let decimal = ((highest + lowest) / 2 / 255);
    let rounded = +decimal.toFixed(3);
    return decimal;
};

function saturation(rgb){
    let rgbArray = (rgb.replace(/ /g, ``).slice(4, -1).split(',').map(a => parseInt(a)));
    const grayVal = getLightness(rgb)*255;
    const [lowest,middle,highest] = getLowestMiddleHighest(rgbArray);

    if(lowest.val===highest.val){return rgb};

    const saturationRange = Math.round(Math.min(255-grayVal,grayVal));
    const maxChange = Math.min((255-highest.val), lowest.val);
    const changeAmount = Math.min(saturationRange/10, maxChange);
    const middleValueRatio = (grayVal-middle.val)/(grayVal-highest.val);

    const returnArray = [];
    returnArray[highest.index] = Math.round(highest.val+changeAmount);
    returnArray[lowest.index] = Math.round(lowest.val-changeAmount);
    returnArray[middle.index] = Math.round(grayVal + (returnArray[highest.index]-grayVal) * middleValueRatio);
    console.log([returnArray].join());

    return ([returnArray].join());
}

function getLowestMiddleHighest(rgbArray){
    let highest = {val:-1, index:-1};
    let lowest = {val: Infinity, index:-1};

    rgbArray.map((val,index)=>{
        if(val > highest.val){
            highest = {val:val, index:index};
        }
        if(val < lowest.val) {
            lowest = {val:val, index:index};
        }
    });

    if(lowest.index === highest.index){
        lowest.index = highest.index+1;
    }

    let middle = {index: (3 - highest.index - lowest.index)};
    middle.val = rgbArray[middle.index];
    return [lowest, middle, highest];
}

function lightenByTenth(rgb) {
    let rgbArray = (rgb.replace(/ /g, ``).slice(4, -1).split(',').map(a => parseInt(a)));
    
    let red = rgbArray[0];
    let green = rgbArray[1];
    let blue = rgbArray[2];

    let newRed = Math.round(red + Math.min(255 - red, 25.5));
    let redDiff = 255 - red;
    let redIncrease = newRed - red;

    let increaseFraction = redIncrease / redDiff;

    let newGreen = Math.round(green + (255 - green) * increaseFraction);
    let newBlue = Math.round (blue + (255 - blue) * increaseFraction);

    return (`rgb(${newRed}, ${newGreen}, ${newBlue})`);
}

function darkenByTenth(rgb){
    let rgbArray = (rgb.replace(/ /g, ``).slice(4, -1).split(',').map(a => parseInt(a)));

    const [lowest,middle,highest] = getLowestMiddleHighest(rgbArray);

    console.log([lowest.val, middle.val ,highest.val]);
    console.log(lowest.index, middle.index, highest.index);

    if(highest.val===0){
        return rgb;
    }

    const returnArray = [];

    returnArray[highest.index] = highest.val - Math.min(highest.val, 25.5);

    const decreaseFraction = (highest.val - returnArray[highest.index]) / (255 - highest.val);
    returnArray[middle.index] = middle.val - middle.val * decreaseFraction;
    returnArray[lowest.index] = lowest.val - lowest.val * decreaseFraction;

    console.log(returnArray.join());

    return (`rgb(${returnArray.join()})`);
}

pencil.addEventListener('click', () => {
    pencil.disabled = true;
    acid.disabled = false;
    standard.disabled = false;
    eraser.disabled = false;
    mode = "pencil";
})

acid.addEventListener('click', () => {
    acid.disabled = true;
    standard.disabled = false;
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