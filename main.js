(async function main(){
	
	const canvas = document.querySelector("canvas");
	canvas.height = innerHeight;
	canvas.width = innerWidth;
	const ctx = canvas.getContext("2d");
	
	const game = new Game(ctx);
	await game.load();
	game.draw();
	
	document.getElementById('start').addEventListener('click', function(e){
		e.preventDefault();
		document.getElementById('overlay').remove();
		game.start();
	});
	
})();