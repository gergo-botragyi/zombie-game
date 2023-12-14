let container = canvas.getBoundingClientRect();

class Player{
    constructor(hp, x, y){
        this.hp = hp;
        this.x = x;
        this.y = y;
        this.a = x+50;
        this.b = y+50;
        this.svgobject = this.svgbe()
    }

    moveF(){
        if(!this.stepOut("F")){this.y-=5;}
        this.update();     
    }
    moveB(){
        if(!this.stepOut("B")){this.y+=5;}
        this.update();
    }
    moveL(){
        if(!this.stepOut("L")){this.x-=5;}
        this.update();
    }
    moveR(){
        if(!this.stepOut("R")){this.x+=5;}
        this.update();
    }

    update(){
        this.svgobject.setAttribute('x', this.x);
        this.svgobject.setAttribute('y', this.y);
    }

    stepOut(dir){
        if(dir=="F" && this.y-5 < 0){
            return true;
        }
        if(dir=="B" && this.y+55 > container.height){
            return true;
        }
        if(dir=="L" && this.x-5 < 0){
            return true;
        }
        if(dir=="R" && this.x+55 > container.width){
            return true;
        }
    }

    drainBattery(){
        this.hp -= 0.01;
    }
    
    svgbe(){
        let svgo = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        svgo.setAttribute('x', this.x);
        svgo.setAttribute('y', this.y);
        svgo.setAttribute('width', "50px");
        svgo.setAttribute('height', "50px");
        svgo.setAttribute('fill', "#45423f");
        return svgo;
    }
}