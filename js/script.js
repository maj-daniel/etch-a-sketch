const container = document.querySelector(".container");
console.log(container);

for(let i = 0; i < 16; i++){
    for(let j = 0; j < 16; j++){
        const block = document.createElement('div');
        block.classList.add(`L${i+1}`, `C${j+1}`, "pixel");
        container.appendChild(block);
    }
}