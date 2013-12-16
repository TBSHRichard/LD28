(function() {
	var IconButtonContainer = function(width, height, assetQueue) {
		this.initialize(width, height, assetQueue);
	}
	
	var p = IconButtonContainer.prototype = new createjs.Container();
	
	p.topButtons;
	p.bottomButtons;
	p.usePowerButton;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(width, height, assetQueue) {
		this.Container_initialize();
		
		var background = new createjs.Shape();
		background.graphics.beginFill("#000").drawRect(0, 0, width, 6);
		
		var barMatrix = new createjs.Matrix2D();
		barMatrix.translate(0, 6);
		
		var topBar = new createjs.Shape();
		topBar.graphics.beginBitmapFill(assetQueue.getResult("button-bar"), "repeat", barMatrix).drawRect(0, 6, width, 60);
		
		var topButtons = new createjs.Container();
		var startX = width / 2;
		var startY = 30;
		
		topButtons.addChild(new IconButton(startX - 120, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-move-left"), "1", function() { GlobalControls.choosePower(0); }));
		topButtons.addChild(new IconButton(startX - 60, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-move-right"), "2", function() { GlobalControls.choosePower(1); }));
		topButtons.addChild(new IconButton(startX, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-jump"), "3", function() { GlobalControls.choosePower(2); }));
		topButtons.addChild(new IconButton(startX + 60, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-power-shot"), "4", function() { GlobalControls.choosePower(3); }));
		topButtons.addChild(new IconButton(startX + 120, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-quiver"), "5", function() { GlobalControls.choosePower(4); }));
		
		this.topButtons = topButtons;
		
		var bottomBar = new createjs.Shape();
		bottomBar.graphics.beginBitmapFill(assetQueue.getResult("button-bar"), "repeat", barMatrix).drawRect(0, height - 60, width, 60);
		
		var bottomButtons = new createjs.Container();
		startY = height - 36;
		
		var ccwButton = new IconButton(startX - 30, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-rotate-ccw"), "A", function() {});
		ccwButton.addEventListener("mousedown", function(event) { if (event.currentTarget.enabled) GlobalControls.setIsRotatingCCW(true); });
		ccwButton.addEventListener("pressup", function(event) { if (event.currentTarget.enabled) GlobalControls.setIsRotatingCCW(false); });
		
		var cwButton = new IconButton(startX + 30, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-rotate-cw"), "D", function() {});
		cwButton.addEventListener("mousedown", function(event) { if (event.currentTarget.enabled) GlobalControls.setIsRotatingCW(true); });
		cwButton.addEventListener("pressup", function(event) { if (event.currentTarget.enabled) GlobalControls.setIsRotatingCW(false); });
		
		this.usePowerButton = new IconButton(30, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-use"), "W", function() {});
		this.usePowerButton.addEventListener("mousedown", function(event) { if (event.currentTarget.enabled) GlobalControls.usePower(); });
		this.usePowerButton.addEventListener("pressup", function(event) { if (event.currentTarget.enabled) GlobalControls.stopPower(); });
		
		bottomButtons.addChild(this.usePowerButton);
		bottomButtons.addChild(ccwButton);
		bottomButtons.addChild(cwButton);
		bottomButtons.addChild(new IconButton(width - 30, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-fire"), "F", function() { GlobalControls.fire(); }));
		
		this.bottomButtons = bottomButtons;
		
		this.addChild(background);
		this.addChild(topBar);
		this.addChild(topButtons);
		this.addChild(bottomBar);
		this.addChild(bottomButtons);
	}
	
	p.setUsePowerButtonIcon = function(newIconAsset) {
		this.usePowerButton.setIcon(newIconAsset);
	}
	
	p.setTopEnabled = function(id, value) {
		this.topButtons.getChildAt(id).setEnabled(value);
	}
	
	p.setBottomEnabled = function(id, value) {
		this.bottomButtons.getChildAt(id).setEnabled(value);
	}
	
	p.setAllEnabled = function(value) {
		this.topButtons.children.forEach(function(element, index, array) {
			element.setEnabled(value);
		});
		
		this.bottomButtons.children.forEach(function(element, index, array) {
			element.setEnabled(value);
		});
	}
	
	window.IconButtonContainer = IconButtonContainer;
}())