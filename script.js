let globalID;
let player;
let batteries;
let zombies;
let running = false;
let time;
let minutes = 0;
let seconds = 0;
let mils = 0;
let bestMils = 100;
let bestSeconds = 61;
let bestMinutes = 61;
var zombieMove;
var zombieMoveRepeater;
var timer;
startbtn.addEventListener("click", initialize, false);

function initialize(){
    if(!running){
        floater.style.display = "none";
        floater.style.zIndex = "-100";

        player = new Player(container.width/2-25,container.height/2-25);
        canvas.insertBefore(player.svgobject, darkness);
        light.appendChild(player.light);
        light.appendChild(player.rect);

        batteries = new Array(10); 
        for (let i = 0; i < batteries.length; i++) {
            batteries[i] = new Battery();
            canvas.insertBefore(batteries[i].svgobject, darkness);
        }

        zombies = new Array(10);
        for (let i = 0; i < zombies.length; i++) {
            zombies[i] = new Zombie();
            canvas.insertBefore(zombies[i].svgobject, darkness);
        }
        zombieMove = setInterval(()=>{
            for (const zombie of zombies) {
                let randX = Math.floor(Math.random()*5);
                randX *= Math.round(Math.random()) * 2 -1;
    
                let randY = Math.floor(Math.random()*5);
                randY *= Math.round(Math.random()) * 2 -1;
    
                let moved = 0;
    
                zombieMoveRepeater = setInterval(function(){
                    if(moved++ == 13){clearInterval(zombieMoveRepeater); return;}else{
                        zombie.move(randX, randY);                                
                    }
                },200)
            }
        },3000)
                
        timer = setInterval(()=>{
            if(++mils==99){seconds++;mils=0;}
            if(seconds==60){minutes++;seconds=0;}
            time = `${minutes<=9?"0":""}${minutes}:${seconds<=9?"0":""}${seconds}:${mils<=9?"0":""}${mils}`;
            stopwatch.innerText = time;
        },10)

        running = true;
    }
    globalID = requestAnimationFrame(update);
}

function update(){
    container = canvas.getBoundingClientRect();
    if(batteries.length == 0){winlose.innerText = "You win!"; winlose.style.color="green"; win(); return;}    
    player.update();
    for (const zombie of zombies) {
        if(Math.abs(zombie.x-player.x)<50 && Math.abs(zombie.y - player.y)<50 && Math.abs(zombie.x-30 - player.x)<50 && Math.abs(zombie.y-30 - player.y)<50){
            winlose.innerText = "You lost!";
            winlose.style.color="red";
            gameStop();
            return;
        }
        zombie.update();
    }    
    for (const battery of batteries) {
        if(Math.abs(battery.x-player.x)<50 && Math.abs(battery.y - player.y)<50 && Math.abs(player.x-battery.x+40)<50 && Math.abs(player.y-battery.y+40)<50){
            battery.delete();
            player.drainFull = 1;
            player.drainHalf = 1;
            player.drained = false;
        }
    }
    batteryCounter.innerText = batteries.length;    
    globalID = requestAnimationFrame(update)
}

function win(){
    if(minutes<bestMinutes || (minutes<=bestMinutes && seconds<bestSeconds) || (minutes<=bestMinutes && seconds<=bestSeconds && mils<bestMils)){
        bestMils = mils;
        bestSeconds = seconds;
        bestMinutes = minutes;
        bestTime.innerText = `${bestMinutes<=9?"0":""}${bestMinutes}:${bestSeconds<=9?"0":""}${bestSeconds}:${bestMils<=9?"0":""}${bestMils}`;
    }
    gameStop();
}

function gameStop(){
    cancelAnimationFrame(globalID);
    running = false;
    deleteEverything();

    clearInterval(timer);
    clearInterval(zombieMove);
    clearInterval(zombieMoveRepeater);
    
    floater.style.display = "flex";
    floater.style.zIndex = "100";

    finalTime.innerText = time;

    minutes = 0;
    seconds = 0;
    mils = 0;
}

function deleteEverything(){
    for (const battery of [...batteries]) {
        battery.delete();
    }
    for (const zombie of [...zombies]) {
        zombie.delete();
    }
    player.delete();
}

let keymap = {};

onkeydown = onkeyup = function(e){
    keymap[e.key] = e.type == 'keydown';
    if(running){
        if(keymap["w"] || keymap["ArrowUp"]){player.moveF();} 
        if(keymap["s"] || keymap["ArrowDown"]){player.moveB()} 
        if(keymap["a"] || keymap["ArrowLeft"]){player.moveL();} 
        if(keymap["d"] || keymap["ArrowRight"]){player.moveR();}
        if(keymap["e"]){player.lightOnOff();}
    }
};
