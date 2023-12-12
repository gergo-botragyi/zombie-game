class Player{
    constructor(hp, x, y, angle){
        this.hp = hp;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.svgobject = this.svgbe()
    }

    moveF(){
        this.y-=5;
        this.update();     
    }
    moveB(){
        this.y+=5;
        this.update();
    }
    moveL(){
        this.x-=5;
        this.update();
    }
    moveR(){
        this.x+=5;
        this.update();
    }

    update(){
        this.svgobject.setAttribute('x', this.x);
        this.svgobject.setAttribute('y', this.y);
    }
    
    svgbe(){
        let svgo = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        svgo.setAttribute('x', this.x);
        svgo.setAttribute('y', this.y);
        svgo.setAttribute('width', "50px");
        svgo.setAttribute('height', "50px");
        svgo.setAttribute('fill', "F4F4F4");
        return svgo;
    }
}