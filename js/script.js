const container = document.querySelector(".container");
console.log(container);

const pixels = document.querySelectorAll(".pixel");
console.log(pixels);

const gridBtn = document.querySelector("#grid-btn");

gridBtn.addEventListener("click", createNewGrid);

pixels.forEach(pixel =>{
    pixel.addEventListener('mouseover', changeDivColor);//check is mouse hovered every pixel in the container
});

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
}