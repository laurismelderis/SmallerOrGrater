let pvp = new PVP();

function getMode() {
	if (currentMode === "pvp-mode") {
		return new PVP();
	} else if (currentMode === "pvc-mode") {
		return new PVC();
	} else if (currentMode === "cvp-mode") {
		return new CVP();
	} else if (currentMode === "cvc-mode") {
		return new CVC();
	} else {
		return new PVP();
	}
}

let currentMode = "main-menu";
let mode = pvp;

function switchMode(id) {
	let delay = 250;
	$("#" + currentMode).fadeOut(delay);
	switch(id){
		case "menuBtn":
			currentMode = "main-menu";
			break;
		case "pvpBtn":
			currentMode = "pvp-mode";
			break;
		case "pvcBtn":
			currentMode = "pvc-mode";
			break;
		case "cvpBtn":
			currentMode = "cvp-mode";
			break;
		case "cvcBtn":
			currentMode = "cvc-mode";
			break;
		case "rulesBtn":
			currentMode = "rules-mode";
			break;
		default:
			currentMode = "main-menu";
			break
	}
	mode = getMode();
	$("#" + currentMode).delay(delay).fadeIn(delay);
}