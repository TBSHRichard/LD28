(function() {
	var Game = function(stage, assetQueue) {
		this.initialize(stage, assetQueue);
	}
	
	var p = Game.prototype = new createjs.Container();
	
	p.gameLevelArray;
	p.currentView;
	p.stage;
	p.assetQueue;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(stage, assetQueue) {
		this.gameLevelsArray = [TutorialLevel1];
		
		this.currentView = new GameView(stage.canvas.width, stage.canvas.height, assetQueue, 0, this.gameLevelsArray);
		this.stage = stage;
		this.assetQueue = assetQueue;
		
		this.addChild(this.currentView);
	}
	
	p.switchView = function(newView) {
		this.removeChild(this.currentView);
		this.currentView = newView;
		this.addChild(this.currentView);
	}
	
	p.gotoMainMenu = function() {
	
	}
	
	p.gotoLevel = function(levelId, power) {
		if (levelId < 12)
			this.switchView(new GameView(stage.canvas.width, stage.canvas.height, assetQueue, levelId, this.gameLevelsArray));
		else
			console.log("TODO: to end screen");
			
		if (typeof power !== 'undefined') {
			this.currentView.switchPower(power);
		}
	}
	
	window.Game = Game;
}())