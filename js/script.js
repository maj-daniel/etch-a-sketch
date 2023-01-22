const container = document.querySelector(".container");
const gridBtn = document.querySelector("#grid-btn");
let pixels;

gridBtn.addEventListener("click", createNewGrid);
window.addEventListener("resize", sizeCanvas);

function changeDivColor(e) { //add class that has diferent color
    e.target.classList.add("hovered");
}

function createNewGrid() {
    const elementsToRemove = document.querySelectorAll('.pixel');
    elementsToRemove.forEach(element => element.remove());//Clean previous grid
    let lineAndColumnNumber;
    do{
        lineAndColumnNumber = parseInt(prompt("Enter a grid size (2 - 100)"));
    } while (lineAndColumnNumber > 100 || lineAndColumnNumber < 2 || !lineAndColumnNumber);

    for(let i = 0; i < lineAndColumnNumber; i++){//construct the grid with square divs
        for(let j = 0; j < lineAndColumnNumber; j++){
            const block = document.createElement('div');
            block.classList.add(`L${i+1}`, `C${j+1}`, "pixel");
            container.appendChild(block);
        }
    }
    pixels = document.querySelectorAll(".pixel");
    sizeCanvas();
    pixels.forEach(pixel =>{
        pixel.addEventListener('mouseover', changeDivColor);//check is mouse hovered every pixel in the container
    });
}

function sizeCanvas() {
    container.style.width = `${Math.floor(document.documentElement.clientHeight * 0.85)}px`; // make the size of the window a round number
    pixels.forEach(pixel =>{//size pixels elements
        pixel.style.height = `${(container.offsetWidth / Math.sqrt(pixels.length))}px`;
        pixel.style.width = `${(container.offsetWidth / Math.sqrt(pixels.length))}px`;
    });
}