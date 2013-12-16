(function() {
	var Game = function(stage, assetQueue) {
		this.initialize(stage, assetQueue);
	}
	
	var p = Game.prototype = new createjs.Container();
	
	p.currentView;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(stage, assetQueue) {
		var gameLevelsArray = [TutorialLevel1];
		
		this.currentView = new GameView(stage.canvas.width, stage.canvas.height, assetQueue, 0, gameLevelsArray);
		
		this.addChild(this.currentView);
	}
	
	p.switchView = function(newView) {
		this.removeChild(this.currentView);
		this.currentView = newView;
		this.addChild(this.currentView);
	}
	
	window.Game = Game;
}())