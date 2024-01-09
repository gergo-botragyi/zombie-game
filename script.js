let player;
let batteries = new Array(10);
let zombies = new Array(10);
let running = false;
canvas.addEventListener("mousedown", initialize, false);

function initialize(){
    if(!running){
        player = new Player(container.width/2-25,container.height/2-25);
        canvas.insertBefore(player.svgobject, darkness);
        light.appendChild(player.light);
        light.appendChild(player.rect);

        for (let i = 0; i < batteries.length; i++) {
            batteries[i] = new Battery();
            canvas.insertBefore(batteries[i].svgobject, darkness);
        }

        for (let i = 0; i < zombies.length; i++) {
            zombies[i] = new Zombie();
            canvas.insertBefore(zombies[i].svgobject, darkness);
        }
        setInterval(()=>{
            for (const zombie of zombies) {
                let randX = Math.floor(Math.random()*5);
                randX *= Math.round(Math.random()) ? 1 : -1;
    
                let randY = Math.floor(Math.random()*5);
                randY *= Math.round(Math.random()) ? 1 : -1;
    
                let moved = 0;
    
                var timer = setInterval(function(){
                    if(moved++ == 15){clearInterval(timer)}
                    zombie.move(randX, randY);                                
                },200)
            }
        },3000)


        running = true;
    }
    requestAnimationFrame(update);
}

let globalID;
function update(){
    player.update();
    for (const zombie of zombies) {
        zombie.update();
        /*if(Math.abs(zombie.x-player.x)<50 && Math.abs(zombie.y - player.y)<50 && Math.abs(zombie.x-30 - player.x)<50 && Math.abs(zombie.y-30 - player.y)<50){
            
        }*/
    }    
    for (const battery of batteries) {
        if(Math.abs(battery.x-player.x)<50 && Math.abs(battery.y - player.y)<50 && Math.abs(player.x-battery.x+40)<50 && Math.abs(player.y-battery.y+40)<50){
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
    if(keymap["e"]){player.lightOnOff();}     
};
