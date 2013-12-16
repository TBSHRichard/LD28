(function() {
	var BeginningOverlay = function(y, width, height, overlayAsset) {
		this.initialize(y, width, height, overlayAsset);
	}
	
	var p = BeginningOverlay.prototype = new createjs.Container;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(y, width, height, overlayAsset) {
		this.Container_initialize();
	
		this.y = y;
	
		var blackBox = new createjs.Shape();
		blackBox.alpha = 0.75;
		blackBox.graphics.beginFill("#000").drawRect(0, 0, width, height);
		
		var overlay = new createjs.Bitmap(overlayAsset);
		overlay.x = width / 2 - overlayAsset.width / 2;
		overlay.y = height / 2 - overlayAsset.height / 2;
		
		this.addChild(blackBox);
		this.addChild(overlay);
	}
	
	window.BeginningOverlay = BeginningOverlay;
}())