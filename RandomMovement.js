class RandomMovement{
	
	constructor(ctx, size, speed){
		this.x = this.getRandomInt(0, ctx.canvas.width);
		this.y = this.getRandomInt(0, ctx.canvas.height);
		this.action = 'moving'; // moving, turning, stopping
		this.distance_to_turn = 0;
		this.remaining_turns = 0;
		this.turn_speed = 0;
		this.turn_direction = 1;
		this.direction = this.getRandomInt(0, 360) % 360; // angle in degrees
		this.size = size; // width in pixels
		this.speed = speed; // pixels to move per loop
		this.ctx = ctx;
		this.move();
	}
	
	update(){
		if(this.action === 'turning' && !this.remaining_turns) this.move();
		if(this.action === 'moving' && this.distance_to_turn <= 0) this.turn();
		if(this.action === 'moving'){
			this.distance_to_turn -= this.speed;
		}else{
			this.direction += (this.turn_speed * this.turn_direction);
			this.remaining_turns--;
		}
		var radians = this.direction * Math.PI / 180;
		this.x += (this.speed * Math.cos(radians));
		this.y += (this.speed * Math.sin(radians));
		this.checkBorder();
		if(this.x < this.size/2) this.x = this.size/2;
		if(this.x > this.ctx.canvas.width - (this.size/2)) this.x = this.ctx.canvas.width - (this.size/2);
		if(this.y < this.size/2) this.y = this.size/2;
		if(this.y > this.ctx.canvas.height - (this.size/2)) this.y = this.ctx.canvas.height - (this.size/2);
		
	}
	
	getRandomInt(min, max){
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
	coinFlip() {
		return (Math.floor(Math.random() * 2) == 0);
	}
	
	move(){
		this.action = 'moving';
		this.turn_speed = 0;
		this.remaining_turns = 0;
		var dist_to_edge = Math.max(
			this.x,
			this.ctx.canvas.width - this.x,
			this.y,
			this.ctx.canvas.height - this.y
		);
		this.distance_to_turn = this.getRandomInt(0, dist_to_edge);
	}
	
	turn(){
		this.action = 'turning';
		this.distance_to_turn = 0;
		this.remaining_turns = this.getRandomInt(1, 50);
		this.turn_speed = this.getRandomInt(1, 9);
		this.turn_direction = this.coinFlip() ? 1 : -1;
	}
	
	checkBorder(){
		if(this.x <= 0 + (this.size/2)){
			this.x = this.ctx.canvas.width - (this.size/2) - 1;
			this.move();
		}
		if(this.x >= this.ctx.canvas.width - (this.size/2)){
			this.x = 0 + (this.size/2) + 1;
			this.move();
		}
		if(this.y <= 0 + (this.size/2)){
			this.y = this.ctx.canvas.height - (this.size/2) - 1;
			this.move();
		}
		if(this.y >= this.ctx.canvas.height - (this.size/2)){
			this.y = 0 + (this.size/2) +1;
			this.move();
		}
	}
}
