let player;
let running = false;
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

//w 87
//arrowup 38

//a 65
//arrowleft 37

//s 83
//arrowdown 40

//d 68
//arrowright 39

let keymap = {};

onkeydown = onkeyup = function(e){
    keymap[e.code] = e.type == 'keydown'; 
    console.log(e.key);   
};
/*document.addEventListener('keydown', (e)=>{
    keymap[e.code] = true;
    
});
document.addEventListener('keyup', (e)=>{
    delete this.keymap[e.code];
});*/

if(keymap[38] || keymap[87]){globalID = requestAnimationFrame(()=>{player.moveF()});
} if(keymap[40] || keymap[83]){globalID = requestAnimationFrame(()=>{player.moveB()});
} if(keymap[37] || keymap[65]){globalID = requestAnimationFrame(()=>{player.moveL()});
} if(keymap[39] || keymap[68]){globalID = requestAnimationFrame(()=>{player.moveR()});}     