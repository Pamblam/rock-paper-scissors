class Player{
	
	constructor(ctx, state){
		this.state = state;
		this.position = new RandomMovement(ctx, 35, 3);
	}
	
	getRandomInt(min, max){
		return Math.floor(Math.random() * (max - min)) + min;
	}
}