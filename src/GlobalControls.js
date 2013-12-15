(function() {
	var GlobalControls = function() {}
	
	var currentView;
	var isRotatingCCW = false;
	var isRotatingCW = false;
	
	GlobalControls.setView = function(view) {
		currentView = view;
	}
	
	GlobalControls.setIsRotatingCCW = function(value) {
		isRotatingCCW = value;
	}
	
	GlobalControls.setIsRotatingCW = function(value) {
		isRotatingCW = value;
	}
	
	GlobalControls.fire = function() {
		currentView.fireArrow();
	}
	
	GlobalControls.choosePower = function(power) {
		
	}
	
	GlobalControls.usePower = function() {
	
	}
	
	$(document).keydown(function(event) {
		switch(event.which) {
			case 49: // 1
			case 50: // 2
			case 51: // 3
			case 52: // 4
			case 53: // 5
				GlobalControls.choosePower(event.which - 49);
				break;
			case 65: // A
				GlobalControls.setIsRotatingCCW(true);
				break;
			case 68: // D
				GlobalControls.setIsRotatingCW(true);
				break;
			case 70: // F
				GlobalControls.fire();
				break;
			case 87: // W
				GlobalControls.userPower();
				break;
			case 97: // Numpad 1
			case 98: // Numpad 2
			case 99: // Numpad 3
			case 100: // Numpad 4
			case 101: // Numpad 5
				GlobalControls.choosePower(event.which - 97);
				break;
		}
	}).keyup(function(event) {
		switch(event.which) {
			case 65: // A
				GlobalControls.setIsRotatingCCW(false);
				break;
			case 68: // D
				GlobalControls.setIsRotatingCW(false);
				break;
		}
	});
	
	createjs.Ticker.addEventListener("tick", function() {
		if (isRotatingCCW) {
			currentView.rotateCCW();
		}
		
		if (isRotatingCW) {
			currentView.rotateCW();
		}
	});
	
	window.GlobalControls = GlobalControls;
}())