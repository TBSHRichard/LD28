(function() {
	var MainMenuView = function(assetQueue) {
		this.initialize(assetQueue);
	}
	
	var p = MainMenuView.prototype = new createjs.Container();
	
	p.Container_initialize = p.initialize;
	p.initialize = function(assetQueue) {
		this.Container_initialize();
		
		this.addChild(new createjs.Bitmap(assetQueue.getResult("main-menu")));
		this.addChild(new TextButton(339, 241, "Play Game", assetQueue, function(event) {
			event.currentTarget.parent.parent.parent.gotoLevel(0);
		}));
	}
	
	window.MainMenuView = MainMenuView;
}())