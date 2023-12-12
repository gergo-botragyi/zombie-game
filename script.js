let player;
let running = false;
const container = canvas.getBoundingClientRect();
canvas.addEventListener("mousedown", initialize, false);

function initialize(){
    if(!running){
        player = new Player(100, 85,85,0)
        canvas.appendChild(player.svgobject);
        running = true;
    }
}

let globalID;
function simulation_step(){
    
}

/*
function stepOut(){

}

function update(){
    if(running){
        simulation_step();
        globalID = requestAnimationFrame(update);
    }
}

function start(){
    if(!running){
        initialize();
        animationStart();
    }
}

function animationStart(){
    if(!running){
        globalID = requestAnimationFrame(update);
        running = true;
    }
}*/

document.addEventListener('keydown', (e)=>{
    
    switch (e.key) {
        case 'w':
            globalID = requestAnimationFrame(()=>{player.moveF()});
            break;
        case 's':
            globalID = requestAnimationFrame(()=>{player.moveB()});
            break;
        case 'a':
            globalID = requestAnimationFrame(()=>{player.moveL()});
            break;
        case 'd':
            globalID = requestAnimationFrame(()=>{player.moveR()});
            break;
    } 
});