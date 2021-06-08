class PVC {
	constructor(){
		this.canvas = document.getElementById('pvc-canvas');
		this.W = this.canvas.width = 800;
		this.H = this.canvas.height = 500;
		this.ctx = this.canvas.getContext('2d');

		this.gameStrLength = 8;

		this.game = new Game(this.gameStrLength);
		this.selectiveBox = new Rectangle(10, 15, 80, 60, 'rgba(255, 255, 102, 0.5)');
		this.game.player2 = "Computer AI";
		this.selection = 0;
	}

	createNewGame() {
		this.game.generateStr(this.gameStrLength);
		this.game.playerTurn = "Player 1"
	}

	update(selection){
		let game = this.game;
		this.game.movePlayer(selection);
		this.selectiveBox.visible = false;
		setTimeout(() => {
			game.moveAi();
			this.selection = 0;
			this.selectiveBox.x = 10;
			this.selectiveBox.visible = true;
		}, 2000);
	}
}