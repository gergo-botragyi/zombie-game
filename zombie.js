class Zombie{
    constructor(){
        this.x = Math.floor(Math.random()*(container.width-20));
        this.y = Math.floor(Math.random()*(container.height-20));
        this.svgobject = this.svgbe()
    }

    move(randX, randY){        
        if(!(this.x+randX <0 || this.x+20+randX >container.width)){
            this.x+= randX;
        }            
        if(!(this.y+randY <0 || this.y+20+randY >container.height)){
            this.y+= randY;
        }
    }

    delete(){
        zombies.splice(zombies.indexOf(this), 1);
        this.svgobject.remove();
        delete this;
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