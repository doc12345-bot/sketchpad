const container = document.getElementById('core');
const reset = document.getElementById('reset');
const defaultGrid = 16;

function makeGrid(size) {
    core.style.gridTemplateColumns = `repeat(${size}, 2fr)`;
    core.style.gridTemplateRows = `repeat(${size}, 2fr)`;

    for(var i = 0; i < size*size; i++){
        const div = document.createElement('div');
        div.classList.add('grid');
        container.appendChild(div);
        div.addEventListener('mouseover', () =>{
            div.style.background = "slategray";
        });
        reset.addEventListener('click', () => {
            div.style.background = "white";
            });
    }
}

window.onload = () => {
    makeGrid(defaultGrid);
}