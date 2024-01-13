let container = canvas.getBoundingClientRect();
let lightSwitch = false;

class Player{
    constructor(x, y){        
        this.x = x;
        this.y = y;
        this.drainFull = 1;
        this.drainHalf = 1;
        this.drained = false;      
        this.direction = 0; 
        this.svgobject = this.makeSvg()
        this.light = this.makeLight()
        this.rect = this.makeRect()
    }

    moveF(){
        if(!this.stepOut("F")){this.y-=5; this.direction=0;}     
    }
    moveB(){
        if(!this.stepOut("B")){this.y+=5;this.direction=2;}
    }
    moveL(){
        if(!this.stepOut("L")){this.x-=5;this.direction=3;}
    }
    moveR(){
        if(!this.stepOut("R")){this.x+=5;this.direction=1;}
    }

    update(){
        this.svgobject.setAttribute('x', this.x);
        this.svgobject.setAttribute('y', this.y);
        if(lightSwitch && this.drainFull-0.0005>0){this.drainFull -= 0.0005; this.drainHalf -= 0.00025;console.log("light")}     
        this.light.setAttribute('points', `${this.x},${this.y} ${this.x-Math.floor(50*this.drainFull)},${this.y-Math.floor(200*this.drainFull)} ${this.x+Math.floor(100*this.drainHalf)},${this.y-Math.floor(200*this.drainFull)} ${this.x+50},${this.y}`)
        this.light.setAttribute('transform', `rotate(${this.direction*90} ${this.x+25} ${this.y+25})`);
        this.rect.setAttribute('x', `${this.x-2}`)
        this.rect.setAttribute('y', `${this.y-2}`)
        if(this.drainFull-0.0005<0 && !this.drained){
            this.light.setAttribute('fill', 'white')
            this.rect.setAttribute('fill', 'white')
            this.drained = true;
            lightSwitch = false;
        }
    }

    delete(){
        lightSwitch = false;
        this.svgobject.remove();
        this.light.remove();
        this.rect.remove();
        delete this;
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
    makeSvg(){
        let svgo = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        svgo.setAttribute('x', this.x);
        svgo.setAttribute('y', this.y);
        svgo.setAttribute('width', '50px');
        svgo.setAttribute('height', '50px');
        svgo.setAttribute('fill', '#45423f');
        return svgo;
    }

    makeLight(){
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');;
        polygon.setAttribute('points', `${this.x},${this.y} ${this.x},${this.y} ${this.x},${this.y} ${this.x+50},${this.y}`)
        polygon.setAttribute('fill', 'white');        

        return polygon;
    }

    lightOnOff(){
        if(!lightSwitch && !this.drained){
            this.light.setAttribute('fill', 'grey')
            this.rect.setAttribute('fill', 'grey')
            lightSwitch = true;
        }else{
            this.light.setAttribute('fill', 'white')
            this.rect.setAttribute('fill', 'white')
            lightSwitch = false;
        }
    }

    makeRect(){
        let svgo = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        svgo.setAttribute('x', this.x);
        svgo.setAttribute('y', this.y);
        svgo.setAttribute('width', '54px');
        svgo.setAttribute('height', '54px');
        svgo.setAttribute('fill', 'white');
        return svgo;
    }
}