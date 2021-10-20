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
        darkenByTenth(e.target.style.background);
        
        /*let base = e.target.style.backgroundColor;
        if(base = "#FFFAF0") {
            e.target.style.backgroundColor = "#ccc8c0";
            console.log(base);
        } else if (base = "#FFFAF0") {
            e.target.style.backgroundColor = "999690";
            console.log(base);
        } else if (base = "999690") {
            e.target.style.backgroundColor = "#4c4b48";
            console.log(base);
        } else if (base = "#4c4b48") {
            e.target.style.backgroundColor = "#000000";
            console.log(base);
        } else {
            e.target.style.backgroundColor = "#ccc8c0";
        };

        //e.target.style.opacity = (parseFloat(e.target.style.opacity) || 0) + 0.2;
        
        //grayScale(e.target.style.backgroundColor);
        //addShade(e); change this so it checks the lightness of the cell and if its higher than the target remove. e.g. if(e.lightness <= 100).
        //console.log(e.target.style.brightness);
        /*let oldC = e.target.style.backgroundColor;
        let opacity = oldC.split("(");
        let rgb = opacity[1].split(",");
        let red = parseFloat(rgb[0]);
        let green = parseFloat(rgb[1]);
        let blue = parseFloat(rgb[2]);
        
        //console.log(red);
        //console.log(blue);
        //console.log(green);
        
        let newShade = `rgb(${red}, ${green}, ${blue})`;
        //e.target.style.backgroundColor = newShade;

        let oldBrightness = e.target.style.filter;
        let breakUp = oldBrightness.split("(", ")");
        console.log(breakUp[0]);
        /*if (brightness > 0) 
        {brightness -= 10
        e.target.style.filter = `brightness(${brightness}%)`;
        };
        

        //let colString = this.style.backgroundColor;
        //let colArray = colString.split(',');
        //console.log(colArray);
        
        //console.log(Number(this.style.backgroundColor));
        /*if (lightness <= 100){
            lightness -=0.10;
            e.target.style.background = `hsl(210, 13%, ${lightness}%)`;
        } else {
            lightness = 100;
            e.target.style.background = `hsl(210, 13%, ${lightness}%)`;
        };*/
    } else {
        e.target.style.background = `#708090`;
    };
};

function getLightness(rgbString){
    let rgbArray = (rgbString.replace(/ /g, ``).slice(4, -1).split(',').map(a => parseInt(a)));
    //console.log(rgbArray);

    let highest = Math.max(...rgbArray);
    let lowest = Math.max(...rgbArray);

    let decimal = ((highest + lowest) / 2 / 255);
    let rounded = +decimal.toFixed(3);

    //console.log(rounded);

    return decimal;
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

function darkenByTenth(rgb){
    let rgbArray = (rgb.replace(/ /g, ``).slice(4, -1).split(',').map(a => parseInt(a)));
    
    console.log(rgbArray);

    const [lowest,middle,highest]=getLowestMiddleHighest(rgbArray);

    if(highest.val===0){
        return rgb;
    }

    const returnArray = [];

    returnArray[highest.index] = highest.val - (Math.min(highest.val, 25.5));
    const decreaseFraction = highest.val - (Math.min(highest.val, 25.5));
    returnArray[middle.index] = middle.val - middle.val * decreaseFraction;
    returnArray[lowest.index] = lowest.val - lowest.val * decreaseFraction;

    console.log(returnArray.join());

    return (`rgb(${returnArray.join()}) `);
}

function addShade(a){
    let shade;
    switch(shade){
        case 0:
        case "null":
            a = "#FFFAF0";
            shade +=1;
            console.log(shade);
            break;
        case 1:
            a = "#ccc8c0";
            shade +=1;
            console.log(shade);
            break;
        case 2:
            a ="999690";
            shade +=1;
            console.log(shade);
            break;
        case 3:
            a = "#4c4b48";
            shade +=1;
            console.log(shade);
            break;
        case 4:
            a = "#000000";
            console.log(shade);
            break;
        default:
            a = "#FFFAF0";
    };
    /*let oldColour = a.target.style.backgroundColor;
    console.log(oldColour);
    let rgb = oldColour.match(/rgb/g);
    console.log(rgb);
    /*if (rgb === null) {
        console.log(rgb.indexOf("("));
        console.log(rgb);
    }
    //a.target.style.background =  `#FFFAF0`;

    /*do {
        this.style.opacity +0.1;
        } while(this.style.opacity >= 1);*/
};

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