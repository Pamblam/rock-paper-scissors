class Game{
	
	constructor(ctx){
		this.ctx = ctx;
		this.running = false;
		this.loaded = false;
		this.loading = false;
		this.images = {};
		
		this.players = [];
		
		for(let i=10; i--;) this.players.push(new Player(ctx, 'rock'));
		for(let i=10; i--;) this.players.push(new Player(ctx, 'paper'));
		for(let i=10; i--;) this.players.push(new Player(ctx, 'scissors'));
	}
	
	async start(){
		if(this.running) return false;
		this.running = true;
		var ready = await this.load();
		if(ready === false) return false;
		this.mainLoop();
	}
	
	draw(){
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		for (let i = 0; i < this.players.length; i++) {
			this.ctx.drawImage(
				this.images[this.players[i].state], 
				this.players[i].position.x - (35/2), 
				this.players[i].position.y - (35/2), 
				35, 
				35
			)
		}
	}
	
	update(){
		var rocks = 0;
		var papers = 0;
		var scissors = 0;
		
		for (let i = 0; i < this.players.length; i++) {
			this.players[i].position.update();
			
			for(let n = 0, dx, dy, distance; n < i+1; n++){
				if(i === n) continue;
				
				dx = this.players[i].position.x - this.players[n].position.x;
				dy = this.players[i].position.y - this.players[n].position.y;
				distance = Math.sqrt(dx**2 + dy**2);
				if(distance <= 35){
					if(this.players[i].state == 'rock'){
						if(this.players[n].state == 'paper') this.players[i].state = 'paper';
						if(this.players[n].state == 'scissors') this.players[n].state = 'rock';
					}
					if(this.players[i].state == 'paper'){
						if(this.players[n].state == 'rock') this.players[n].state = 'paper';
						if(this.players[n].state == 'scissors') this.players[i].state = 'scissors';
					}
					if(this.players[i].state == 'scissors'){
						if(this.players[n].state == 'rock') this.players[i].state = 'rock';
						if(this.players[n].state == 'paper') this.players[n].state = 'scissors';
					}
				}
			}
			if(this.players[i].state == 'rock') rocks++;
			if(this.players[i].state == 'paper') papers++;
			if(this.players[i].state == 'scissors') scissors++;
			
		}
		
		if(rocks === 30) {
			alert('Rock wins!');
			this.running = false;
		}
		if(papers === 30) {
			alert('Paper wins!');
			this.running = false;
		}
		if(scissors === 30) {
			alert('Scissors wins!');
			this.running = false;
		}
		
	}
	
	async mainLoop(force=true){
		if(force) this.running = true;
		requestAnimationFrame(()=>{
			if(!this.running) return;
			this.update();
			this.draw();
			setTimeout(()=>this.mainLoop(false));
		});
	}
	
	async load(){
		if(this.loaded) return true;
		if(this.loading) return false;
		this.loading = true;
		var images = await Promise.all([
			this.loadImage("rock.png"),
			this.loadImage("paper.png"),
			this.loadImage("scissors.png")
		]);
		this.images.rock = images[0];
		this.images.paper = images[1];
		this.images.scissors = images[2];
		this.loaded = true;
	}
	
	loadImage(src){
		return new Promise(done=>{
			var img = new Image();
			img.onload = ()=>done(img);
			img.src = src;
		});
	}
	
}


