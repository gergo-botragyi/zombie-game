let player;
let batteries = new Array(10);
let running = false;
canvas.addEventListener("mousedown", initialize, false);

function initialize(){
    if(!running){
        player = new Player(100, 85,85);
        for (let item of batteries) {
            item = new Battery();
            canvas.appendChild(item.svgobject);
        }
        canvas.appendChild(player.svgobject);
        running = true;
    }
    requestAnimationFrame(update);
}

let globalID;
function update(){
    player.drainBattery();
    /*batteries.forEach(item => {
        if(item.x < player.a && item.y < player.b){item.reposition();}
    });*/
    globalID = requestAnimationFrame(update)
}

/*

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

let keymap = {};

onkeydown = onkeyup = function(e){
    keymap[e.key] = e.type == 'keydown';

    if(keymap["w"] || keymap["ArrowUp"]){globalID = requestAnimationFrame(()=>{player.moveF()});} 
    if(keymap["s"] || keymap["ArrowDown"]){globalID = requestAnimationFrame(()=>{player.moveB()});} 
    if(keymap["a"] || keymap["ArrowLeft"]){globalID = requestAnimationFrame(()=>{player.moveL()});} 
    if(keymap["d"] || keymap["ArrowRight"]){globalID = requestAnimationFrame(()=>{player.moveR()});}     
};
