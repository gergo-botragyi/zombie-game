class Battery{
    constructor(){
        this.x = Math.floor(Math.random()*(container.width-10));
        this.y = Math.floor(Math.random()*(container.height-10));
        this.svgobject = this.svgbe()
    }

    reposition(){
        this.x = Math.floor(Math.random()*(container.width-10));
        this.y = Math.floor(Math.random()*(container.height-10));
    }

    svgbe(){
        let svgo = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        svgo.setAttribute('x', this.x);
        svgo.setAttribute('y', this.y);
        svgo.setAttribute('width', "10px");
        svgo.setAttribute('height', "10px");
        svgo.setAttribute('fill', "#FC7703");
        return svgo;
    }
}