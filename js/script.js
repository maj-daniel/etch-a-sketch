const container = document.querySelector(".container");
const gridBtn = document.querySelector("#grid-btn");
const colorBtns = document.querySelectorAll(".color-btn");
const containerBG = document.querySelector(".background");

let pixels = null;

sizeCanvas(70);

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
        lineAndColumnNumber = parseInt(prompt("Enter a grid size (2 - 64)"));
    } while (lineAndColumnNumber > 64 || lineAndColumnNumber < 2 || !lineAndColumnNumber);

    for(let i = 0; i < lineAndColumnNumber; i++){//construct the grid with square divs
        for(let j = 0; j < lineAndColumnNumber; j++){
            const block = document.createElement("div");
            block.classList.add(`L${i+1}`, `C${j+1}`, "pixel");
            container.appendChild(block);
        }
    }

    pixels = document.querySelectorAll(".pixel");
    sizeCanvas(70); // size the grid in the moment it's created


    pixels.forEach(pixel =>{
        pixel.addEventListener("mouseover", changeDivColor);
    });
    pixels.forEach(pixel =>{
        pixel.style.backgroundColor = "rgb(250,250,250)";
    })
}

function sizeCanvas(gridSize) {//change individual div sizes in order to make a "canvas", enter gridSize as a percentage of the screen
    container.style.width = `${Math.floor(document.documentElement.clientHeight * gridSize / 100)}px`; // make the size of the window a round number, so the elements align correctly
    containerBG.style.width = `${(container.offsetWidth)}px`;
    containerBG.style.height = `${(container.offsetWidth)}px`;

    if(!pixels) return;
    pixels.forEach(pixel =>{//size pixels elements
        pixel.style.height = `${(container.offsetWidth / Math.sqrt(pixels.length))}px`;
        pixel.style.width = `${(container.offsetWidth / Math.sqrt(pixels.length))}px`;
    });
}

function getRandomColor(e) {
    e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16); //generate a random hex color value
}

function removelightness(e) {
    //extract color of div
    let color = getComputedStyle(e.target, null).getPropertyValue("background-color");
    let newColor = "#FFFFFF";
    color = color.replace(/ /g, "").slice(4,-1).split(",").map(value => parseInt(value));
    //subtract an amount of each color (r,g,b)
    for(let i = 0; i < 3; i++){
        color[i] -= 25;
    }

    color.forEach(value =>{
            //if value is <= 0, exit function
        if (value <= 0) return;
    });

    //else make a string "rgb(r,g,b)" with the new values
    for (let i = 0; i < 3; i++){
        if(i === 0){
            newColor = "rgb(";
        }
        if(i === 2){
            newColor += `${color[i]})`;
            break;
        }
        newColor += `${color[i]},`;
    }

    //assign new color to div
    e.target.style.backgroundColor = newColor;
}

function changeGridMode(e) { //change the way colors behave in the grid
    switch (e.target.id){
        case "single":
            pixels.forEach(pixel =>{
                pixel.removeEventListener("mouseover", getRandomColor);
                pixel.removeEventListener("mouseover", removelightness);
                pixel.addEventListener("mouseover", changeDivColor);
            });
            break;
        case "colorfull":
            pixels.forEach(pixel =>{
                pixel.removeEventListener("mouseover", removelightness);
                pixel.removeEventListener("mouseover", changeDivColor);
                pixel.addEventListener("mouseover", getRandomColor);
            });
            break;
        case "modern":
            pixels.forEach(pixel => {
                pixel.removeEventListener("mouseover", getRandomColor);
                pixel.removeEventListener("mouseover", changeDivColor);
                pixel.addEventListener("mouseover", removelightness);
            })
    }
}