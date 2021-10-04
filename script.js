const container = document.getElementById('core');

for(var i = 0; i < 256; i++) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    container.appendChild(grid);
    grid.addEventListener('hover', function(e){
        e.target.style.background = "slategray";
    });
}

