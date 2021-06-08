class CVC {
	constructor(){
		this.canvas = document.getElementById('cvc-canvas');
		this.W = this.canvas.width = 800;
		this.H = this.canvas.height = 500;
		this.ctx = this.canvas.getContext('2d');

		this.gameStrLength = 8;

		this.game = new Game(this.gameStrLength);
		this.selectiveBox = new Rectangle(10, 15, 80, 60, 'rgba(255, 255, 102, 0.5)');
		this.game.player1 = "Computer AI 1";
		this.game.player2 = "Computer AI 2";
		this.game.playerTurn = "Computer AI 1";
		this.selection = 0;
		this.selectiveBox.visible = false;
		this.createNewGame();
	}

	setGameStrLength(len) {
		this.gameStrLength = len;
		this.createNewGame();
	}

	createNewGame() {
		this.game.player1 = "Computer AI 1";
		this.game.player2 = "Computer AI 2";
		this.game.playerTurn = "Computer AI 1";
		this.game.generateStr(this.gameStrLength);
	}

	update(selection){
		let game = this.game;
		game.scores.p1 = -game.scores.p1;
		game.scores.p2 = -game.scores.p2;
		game.moveAi();
		this.selection = 0;
		this.selectiveBox.x = 10;
	}
}