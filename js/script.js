const container = document.querySelector(".container");
const gridBtn = document.querySelector("#grid-btn");
const colorBtns = document.querySelectorAll(".color-btn");
let pixels;

gridBtn.addEventListener("click", createNewGrid);
window.addEventListener("resize", sizeCanvas);
colorBtns.forEach(btn =>{
    btn.addEventListener("click", changeGridMode);
});

function changeDivColor(e) { //add class that has different color
    e.target.style.backgroundColor = "#060606";
}

function createNewGrid() {//create a custom "canvas" made of div, arranged in a grid, sort of
    const elementsToRemove = document.querySelectorAll(".pixel");
    elementsToRemove.forEach(element => element.remove());//Clean previous grid
    let lineAndColumnNumber;
    do{
        lineAndColumnNumber = parseInt(prompt("Enter a grid size (2 - 100)"));
    } while (lineAndColumnNumber > 100 || lineAndColumnNumber < 2 || !lineAndColumnNumber);

    for(let i = 0; i < lineAndColumnNumber; i++){//construct the grid with square divs
        for(let j = 0; j < lineAndColumnNumber; j++){
            const block = document.createElement("div");
            block.classList.add(`L${i+1}`, `C${j+1}`, "pixel");
            container.appendChild(block);
        }
    }

    pixels = document.querySelectorAll(".pixel");
    sizeCanvas(); // size the grid in the moment it's created


    pixels.forEach(pixel =>{
        pixel.addEventListener("mouseover", changeDivColor);
    });
}

function sizeCanvas() {//change individual div sizes in order to make a "canvas"
    container.style.width = `${Math.floor(document.documentElement.clientHeight * 0.85)}px`; // make the size of the window a round number, so the elements align correctly
    pixels.forEach(pixel =>{//size pixels elements
        pixel.style.height = `${(container.offsetWidth / Math.sqrt(pixels.length))}px`;
        pixel.style.width = `${(container.offsetWidth / Math.sqrt(pixels.length))}px`;
    });
}

function randomColor(e) {
    e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16); //generate a random hex color value
}

function changeGridMode(e) { //change the way colors behave in the grid
    switch (e.target.id){
        case "single":
            pixels.forEach(pixel =>{
                pixel.removeEventListener("mouseover", randomColor);
            });
            pixels.forEach(pixel =>{
                pixel.addEventListener("mouseover", changeDivColor);
            });
            break;
        case "colorfull":
            pixels.forEach(pixel =>{
                pixel.removeEventListener("mouseover", changeDivColor);
            });
            pixels.forEach(pixel =>{
                pixel.addEventListener("mouseover", randomColor);
            });
            break;
    }
}