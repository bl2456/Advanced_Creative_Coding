class Ball {
    constructor(id,x,y, xS, yS, r){
        this.id = id;
        this.x = x;
        this.y = y;
        //need speed to determine direction
        //positive to go right/up, negative to go left/down
        this.radius = r;
        this.xSpeed = xS;
        this.ySpeed = yS;
    }

    //logic, where it will be
    move(xCoords,yCoords, updateCoords){
        //check if ball is hitting wall to move opposite direction
        if (this.x + this.radius > width || this.x - this.radius < 0) {
            this.xSpeed = -this.xSpeed;
            //console.log("change in xSpeed");
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
            this.ySpeed = -this.ySpeed;
            //console.log("change in ySpeed");
        }
        
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        xCoords[id] = this.x;
        yCoords[id] = this.y;
        updateCoords(this.id, this.x,this.y);
    }

    //this function should only contain methods that impact the drawing
    //ex) stroke(), fill(), circle(), text()
    // no logic here
    render(){
        fill(0);
        circle(this.x, this.y, this.radius*2);
        console.log(this.ySpeed);
    }
}