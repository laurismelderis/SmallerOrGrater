$('canvas').keydown(function(e) {
	if (e.keyCode == 37) { // left
		// Move the selective box one character to left
		if (mode.selectiveBox.x > 10) {
			mode.selectiveBox.moveLeft();
			mode.selection -= 1;
		}
	}
	if (e.keyCode == 39) { // right
		// Move the selective box one character to right
		if (mode.selectiveBox.x < mode.game.getStrMeasure() + 10 - mode.selectiveBox.w) {
			mode.selectiveBox.moveRight();
			mode.selection += 1;
		}
	}
	if ((e.keyCode == 13 && mode.selectiveBox.visible) ||
		(mode.constructor.name === "CVC" && e.keyCode == 13)) { // return
		mode.update(mode.selection);
	}
});
$(".restartPVP").click(() => {
	mode.createNewGame();
});
$("#cvc-len-btn").click(() => {
	let len = Number($("#cvc-len").val());
	if (len > 13 || len < 3) return;
	mode.setGameStrLength(len);
});

function drawLine(x1, y1, x2, y2){
	mode.ctx.beginPath();
	mode.ctx.lineWidth = 1;
	mode.ctx.strokeStyle = 'black';
	mode.ctx.moveTo(x1, y1);
	mode.ctx.lineTo(x2, y2);
	mode.ctx.stroke();
}

function drawRect(x, y, w, h, color = "black") {
	mode.ctx.beginPath();
	mode.ctx.lineWidth = "6";
	mode.ctx.fillStyle = color;
	mode.ctx.rect(x, y, w, h);
	mode.ctx.fill();
}

function fillText(x, y, text, size, color = "black"){
	mode.ctx.font = size + "px Courier New";
	mode.ctx.fillStyle = color;
	mode.ctx.fillText(text, x, y);
}

function animate() {
	mode.ctx.clearRect(0, 0, mode.W, mode.H);
	for (let i = mode.game.progress.length-1; i >= 0; i--) {
		fillText(10, 64*(mode.game.progress.length-i), (mode.game.progress[i]), 64);
	}
	for (let i = mode.game.playerTurnProgress.length-1; i >= 0; i--) {
		fillText(mode.game.baseMeasure+30, 54*(mode.game.playerTurnProgress.length-i)+(10*(mode.game.playerTurnProgress.length-i-1)), (mode.game.playerTurnProgress[i]), 32);
	}

	if (mode.game.str.length > 2) {
		mode.selectiveBox.draw(mode.ctx);
	} else {
		let text = "";
		if (mode.game.checkWinner() === 'p1') {
			text = mode.game.player1 + " wins!";
		} else if (mode.game.checkWinner() === 'p2') {
			text = mode.game.player2 + " wins!";
		} else {
			text = "Draw!";
		}
		let textMeasure = mode.ctx.measureText(text).width;
		drawRect(mode.W/2-(mode.W - 80)/2, mode.H/2-(mode.H - 80)/2, mode.W - 100, mode.H - 100, "rgba(0,0,0,0.5)");
		drawRect(mode.W/2-(mode.W - 100)/2, mode.H/2-(mode.H - 100)/2, mode.W - 100, mode.H - 100, "rgba(22,206,193,0.7)");
		fillText(mode.W/2-textMeasure/2, mode.H/2, text, 32, "White");
		
	}
	requestAnimationFrame(animate);
}
animate();