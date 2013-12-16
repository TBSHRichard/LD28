(function() {
	var GlobalControls = function() {}
	
	var currentView;
	var isRotatingCCW = false;
	var isRotatingCW = false;
	var controlsEnabled = {
		power0: true,
		power1: true,
		power2: true,
		power3: true,
		power4: true,
		use: true,
		rotateCCW: true,
		rotateCW: true,
		fire: true};
	
	GlobalControls.setView = function(view) {
		currentView = view;
		
		if (currentView == null) {
			for (var key in controlsEnabled) {
				controlsEnabled[key] = true;
			}
		}
	}
	
	GlobalControls.setEnabled = function(id, value) {
		controlsEnabled[id] = value;
		
		switch(id) {
			case "power0":
				currentView.overlay.setTopEnabled(0, value);
				break;
			case "power1":
				currentView.overlay.setTopEnabled(1, value);
				break;
			case "power2":
				currentView.overlay.setTopEnabled(2, value);
				break;
			case "power3":
				currentView.overlay.setTopEnabled(3, value);
				break;
			case "power4":
				currentView.overlay.setTopEnabled(4, value);
				break;
			case "use":
				currentView.overlay.setBottomEnabled(0, value);
				break;
			case "rotateCCW":
				currentView.overlay.setBottomEnabled(1, value);
				break;
			case "rotateCW":
				currentView.overlay.setBottomEnabled(2, value);
				break;
			case "fire":
				currentView.overlay.setBottomEnabled(3, value);
				break;
		}
	}
	
	GlobalControls.setAllEnabled = function(value) {
		for (var key in controlsEnabled) {
			controlsEnabled[key] = value;
		}
		
		currentView.overlay.setAllEnabled(value);
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
		currentView.switchPower(power);
	}
	
	GlobalControls.usePower = function() {
		currentView.usePower();
	}
	
	GlobalControls.stopPower = function() {
		currentView.stopPower();
	}
	
	$(document).keydown(function(event) {
		if (currentView != null) {
			switch(event.which) {
				case 49: // 1
				case 50: // 2
				case 51: // 3
				case 52: // 4
				case 53: // 5
					if (controlsEnabled["power" + (event.which - 49)])
						GlobalControls.choosePower(event.which - 49);
					break;
				case 65: // A
					if (controlsEnabled["rotateCCW"])
						GlobalControls.setIsRotatingCCW(true);
					break;
				case 68: // D
					if (controlsEnabled["rotateCW"])
						GlobalControls.setIsRotatingCW(true);
					break;
				case 70: // F
					if (controlsEnabled["fire"])
						GlobalControls.fire();
					break;
				case 87: // W
					if (controlsEnabled["use"])
						GlobalControls.usePower();
					break;
				case 97: // Numpad 1
				case 98: // Numpad 2
				case 99: // Numpad 3
				case 100: // Numpad 4
				case 101: // Numpad 5
					if (controlsEnabled["power" + (event.which - 97)])
						GlobalControls.choosePower(event.which - 97);
					break;
			}
		}
	}).keyup(function(event) {
		if (currentView != null) {
			switch(event.which) {
				case 65: // A
					if (controlsEnabled["rotateCCW"])
						GlobalControls.setIsRotatingCCW(false);
					break;
				case 68: // D
					if (controlsEnabled["rotateCW"])
						GlobalControls.setIsRotatingCW(false);
					break;
				case 87: // W
					if (controlsEnabled["use"])
						GlobalControls.stopPower();
					break;
			}
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