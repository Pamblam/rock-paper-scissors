(async function main(){
	
	const canvas = document.querySelector("canvas");
	canvas.height = innerHeight;
	canvas.width = innerWidth;
	const ctx = canvas.getContext("2d");
	
	alert("Rock Paper Scissors Battle Royale...");
	
	const game = new Game(ctx);
	await game.load();
	game.draw();
	
	//game.start();
	
})();