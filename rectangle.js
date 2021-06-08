class Rectangle {
	constructor(x, y, w, h, color) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.alpha = 70;
		this.offset = this.h/(Math.tan(this.alpha*Math.PI/180));
		this.visible = true;
	}
	moveLeft(){
		this.x -= 38.40625; 	
	}
	moveRight(){
		this.x += 38.40625; 	
	}
	draw(ctx) {
		let offset = this.h/(Math.tan(this.alpha*Math.PI/180))
		let x = this.x + 8;
		if (this.visible){
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.moveTo(x, this.y);
			ctx.lineTo(x+this.w, this.y);
			ctx.lineTo(x+this.w-offset, this.y+this.h);
			ctx.lineTo(x-offset, this.y+this.h);
			ctx.lineTo(x, this.y);
			ctx.fill();
		}
	}
}