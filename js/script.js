const container = document.querySelector(".container");
console.log(container);

for(let i = 0; i < 16; i++){//construct the grid with square divs
    for(let j = 0; j < 16; j++){
        const block = document.createElement('div');
        block.classList.add(`L${i+1}`, `C${j+1}`, "pixel");
        container.appendChild(block);
    }
}

const pixels = document.querySelectorAll(".pixel");
console.log(pixels);

pixels.forEach(pixel =>{
    pixel.addEventListener('mouseover', changeDivColor);
});

function changeDivColor(e) {
    e.target.classList.add("hovered");
}