let container = canvas.getBoundingClientRect();
let lightSwitch = false;

class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
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
        this.light.setAttribute('points', `${this.x},${this.y} ${this.x-50},${this.y-200} ${this.x+100},${this.y-200} ${this.x+50},${this.y}`)
        this.light.setAttribute('transform', `rotate(${this.direction*90} ${this.x+25} ${this.y+25})`);
        this.rect.setAttribute('x', `${this.x-2}`)
        this.rect.setAttribute('y', `${this.y-2}`)
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
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
  
        polygon.setAttribute('points', `${this.x},${this.y} ${this.x-50},${this.y-200} ${this.x+100},${this.y-200} ${this.x+50},${this.y}`)
        polygon.setAttribute('fill', 'white');        

        return polygon;
    }

    lightOnOff(){
        if(!lightSwitch){
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
        svgo.setAttribute('x', this.x-2);
        svgo.setAttribute('y', this.y-2);
        svgo.setAttribute('width', '54px');
        svgo.setAttribute('height', '54px');
        svgo.setAttribute('fill', 'white');
        return svgo;
    }
}