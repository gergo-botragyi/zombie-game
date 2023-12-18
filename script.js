let player;
let batteries = new Array(10);
let zombies = new Array(10);
let running = false;
canvas.addEventListener("mousedown", initialize, false);

function initialize(){
    if(!running){
        player = new Player(100, 85,85);

        for (let i = 0; i < batteries.length; i++) {
            batteries[i] = new Battery();
            canvas.appendChild(batteries[i].svgobject);
        }

        for (let i = 0; i < zombies.length; i++) {
            zombies[i] = new Zombie();
            canvas.appendChild(zombies[i].svgobject);
        }
        setInterval(()=>{
            for (const zombie of zombies) {
                zombie.move();
            }
        },850)

        canvas.appendChild(player.svgobject);

        running = true;
    }
    requestAnimationFrame(update);
}

let globalID;
function update(){
    player.update();
    player.drainBattery();
    for (const zombie of zombies) {
        zombie.update();
    }    
    for (const battery of batteries) {
        if(Math.abs(battery.x-player.x)<50 && Math.abs(battery.y - player.y)<50 && Math.abs(battery.x-40 - player.x)<50 && Math.abs(battery.y-40 - player.y)<50){
            battery.reposition();
        }
    }  
    globalID = requestAnimationFrame(update)
}



/*

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

    if(keymap["w"] || keymap["ArrowUp"]){player.moveF();} 
    if(keymap["s"] || keymap["ArrowDown"]){player.moveB()} 
    if(keymap["a"] || keymap["ArrowLeft"]){player.moveL();} 
    if(keymap["d"] || keymap["ArrowRight"]){player.moveR();}     
};
