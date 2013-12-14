(function() {
	var IconButtonContainer = function(width, height, assetQueue) {
		this.initialize(width, height, assetQueue);
	}
	
	var p = IconButtonContainer.prototype = new createjs.Container();
	
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
		
		topButtons.addChild(new IconButton(startX - 120, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-move-left"), "1", function() {}));
		topButtons.addChild(new IconButton(startX - 60, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-move-right"), "2", function() {}));
		topButtons.addChild(new IconButton(startX, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-jump"), "3", function() {}));
		topButtons.addChild(new IconButton(startX + 60, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-power-shot"), "4", function() {}));
		topButtons.addChild(new IconButton(startX + 120, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-quiver"), "5", function() {}));
		
		var bottomBar = new createjs.Shape();
		bottomBar.graphics.beginBitmapFill(assetQueue.getResult("button-bar"), "repeat", barMatrix).drawRect(0, height - 60, width, 60);
		
		var bottomButtons = new createjs.Container();
		startY = height - 36;
		
		bottomButtons.addChild(new IconButton(30, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-use"), "W", function() {}));
		bottomButtons.addChild(new IconButton(startX - 30, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-rotate-ccw"), "A", function() {}));
		bottomButtons.addChild(new IconButton(startX + 30, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-rotate-cw"), "D", function() {}));
		bottomButtons.addChild(new IconButton(width - 30, startY, assetQueue.getResult("icon-button"), assetQueue.getResult("icon-fire"), "F", function() {}));
		
		this.addChild(background);
		this.addChild(topBar);
		this.addChild(topButtons);
		this.addChild(bottomBar);
		this.addChild(bottomButtons);
	}
	
	window.IconButtonContainer = IconButtonContainer;
}())