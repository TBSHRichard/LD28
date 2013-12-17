(function() {
	var EndView = function(assetQueue) {
		this.initialize(assetQueue);
	}
	
	var p = EndView.prototype = new createjs.Container();
	
	p.Container_initialize = p.initialize;
	p.initialize = function(assetQueue) {
		this.Container_initialize();
		
		this.addChild(new createjs.Bitmap(assetQueue.getResult("end")));
		this.addChild(new TextButton(339, 241, "To Main Menu", assetQueue, function(event) {
			event.currentTarget.parent.parent.parent.gotoMainMenu();
		}));
	}
	
	window.EndView = EndView;
}())