class Game {
	constructor(size = 5) {
		this.player1 = "Player 1";
		this.player2 = "Player 2";
		this.playerTurn = this.player1;
		this.gameFinished = false;
		this.progress = [];
		this.playerTurnProgress = [];
		this.str = "";
		this.size = 0;
		this.generateStr();
		this.scores = {
			'p1': -1,
			'p2': 1,
			'tie': 0
		}
		this.baseMeasure = this.getStrMeasure();
	}

	generateStr(size = 8) { 
		this.size = size;
		this.progress = [];
		this.playerTurnProgress = [];
		this.str = "";
		for (let i = 0; i < this.size; i++) {
			this.str += Number(Math.floor(Math.random() * 9 + 1));
		}
		this.progress.push(this.str);
		this.playerTurnProgress.push(this.playerTurn);
		this.baseMeasure = this.getStrMeasure();
	}

	move(node, i) {
		if (this.gameFinished) return;
		let result = this.checkWinner(this.str);
		if (result !== null) {
			this.gameFinished = true;
			console.log("Game is finished")
			return;
		}
		i = Number(i);
		let sum = Number(node[i]) + Number(node[i+1]);
		if (sum < 7) {
			sum = 3
		} else if (sum == 7) {
			sum = 2;
		} else {
			sum = 1;
		}
		return node.substr(0, i) + sum + node.substr(i+2, node.length-1);
	}

	movePlayer(i) {
		if (this.gameFinished) return;
		let result = this.checkWinner(this.str);
		if (result !== null) {
			this.gameFinished = true;
			return;
		}
		i = Number(i);
		let sum = Number(this.str[i]) + Number(this.str[i+1]);
		if (sum < 7) {
			sum = 3
		} else if (sum == 7) {
			sum = 2;
		} else {
			sum = 1;
		}
		if (this.playerTurn == this.player1) this.playerTurn = this.player2;
		else this.playerTurn = this.player1;
		this.str = this.str.substr(0, i) + sum + this.str.substr(i+2, this.str.length-1);
		this.progress.push(this.str);
		this.playerTurnProgress.push(this.playerTurn);
	}

	moveAi() {
		if (this.gameFinished) return;
		let result = this.checkWinner(this.str);
		if (result !== null) {
			this.gameFinished = true;
			return;
		}

		let bestScore = -Infinity;
		let bestMove = "";
		for (let i = 0; i < this.str.length - 1; i++) {
			let node = this.move(this.str, i)
			let score = this.minimax(node, 0, false);
			if (score > bestScore) {
				bestScore = score;
				bestMove = node; 
			}
		}
		if (this.playerTurn == this.player1) this.playerTurn = this.player2;
		else this.playerTurn = this.player1;
		if (bestMove == "") {
			this.generateStr(this.size);
			this.moveAi();
			return;
		}
		this.str = bestMove;
		this.progress.push(this.str);
		this.playerTurnProgress.push(this.playerTurn);
	}

	minimax(node, depth, isMaximazing) {

		let result = this.checkWinner(node);
		if (result !== null) {
			return this.scores[result];
		}

		if (isMaximazing) {
			let bestScore = -Infinity;
			for (let i = 0; i < node.length - 1; i++) {
				node = this.move(node, i);
				let score = this.minimax(node, depth + 1, false);
				bestScore = Math.max(score, bestScore);
			}
			return bestScore;
		} else {
			let bestScore = Infinity;
			for (let i = 0; i < node.length - 1; i++) {
				node = this.move(node, i);
				let score = this.minimax(node, depth + 1, false);
				bestScore = Math.min(score, bestScore);
			}
			return bestScore;
		}
	}

	generateNodes(str){
		let arr = [];
		for (let i = 0; i < str.length - 1; i++) {
			let result = Number(str[i]) + Number(str[i+1]);
			if (result < 7) {
				result = 3
			} else if (result == 7) {
				result = 2;
			} else {
				result = 1;
			}
			arr.push(
				str.substr(0, i) + result + str.substr(i+2, str.length-1)
				);
		}
		return arr;
	}

	checkWinner(node = this.str) {
		if (node.length == 2 && node[0] > node[1]) {
			return "p1";
		} else if (node.length == 2 && node[0] == node[1]) {
			return "tie";
		} else if (node.length == 2 && node[0] < node[1]) {
			return "p2";
		} else {
			return null;
		}
	}

	getStr() {
		if (!this.gameFinished) return this.str;
		else return;
	}

	getStrMeasure() {
		return this.str.length * 38.40625;
	}
}