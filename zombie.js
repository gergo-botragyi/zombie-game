class Zombie{
    constructor(){
        this.x = Math.floor(Math.random()*(container.width-10));
        this.y = Math.floor(Math.random()*(container.height-10));
        this.svgobject = this.svgbe()
    }

    move(){
        let rand = Math.floor(Math.random()*21)+10;
        rand *= Math.round(Math.random()) ? 1 : -1;
        if(this.x-rand >=0 || this.x+20+rand <=container.width){
            this.x+= rand;
        }
        
        rand = Math.floor(Math.random()*21)+10;
        rand *= Math.round(Math.random()) ? 1 : -1;
        if(this.y-rand >=0 || this.y+20+rand <=container.height){
            this.y+= rand;
        }
    }

    update(){
        this.svgobject.setAttribute("x", this.x);
        this.svgobject.setAttribute("y", this.y);
    }

    svgbe(){
        let svgo = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        svgo.setAttribute('x', this.x);
        svgo.setAttribute('y', this.y);
        svgo.setAttribute('width', "20px");
        svgo.setAttribute('height', "20px");
        svgo.setAttribute('fill', "#32a852");
        return svgo;
    }
}