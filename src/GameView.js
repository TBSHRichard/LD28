(function() {
	var GameView = function(width, height, assetQueue, levelIndex, levelClassesArray) {
		this.initialize(width, height, assetQueue, levelIndex, levelClassesArray);
	}
	
	var p = GameView.prototype = new createjs.Container();
	
	p.assetQueue;
	p.levelIndex;
	p.levelClassesArray;
	p.hasSelectedPower;
	p.background;
	p.level;
	p.overlay;
	p.assetQueue;
	p.width;
	p.height;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(width, height, assetQueue, levelIndex, levelClassesArray) {
		this.Container_initialize();
		
		this.assetQueue = assetQueue;
		this.levelIndex = levelIndex;
		this.levelClassesArray = levelClassesArray;
		this.hasSelectedPower = false;
		this.assetQueue = assetQueue;
		this.width = width;
		this.height = height;
		
		this.background = new Background(0, 66, 544, 180, assetQueue);
		
		this.level = new levelClassesArray[levelIndex](width, height, assetQueue);
		
		var overlay = new IconButtonContainer(width, height, assetQueue);
		this.overlay = overlay;
		
		this.level.data["disabledPowers"].forEach(function(element, index, array) {
			overlay.setTopEnabled(element, false);
		});
		
		this.addChild(this.background);
		this.addChild(this.level);
		this.addChild(this.overlay);
		this.addChild(new BeginningOverlay(66, width, height - 66, this.level.getBeginningOverlay(assetQueue)));
	}
	
	p.rotateCCW = function() { this.level.rotateCCW(); }
	p.rotateCW = function() { this.level.rotateCW(); }
	p.fireArrow = function() { this.level.fireArrow(); }
	
	p.switchPower = function(id) {
		console.log("out");
		if (!this.hasSelectedPower) {
			console.log("in");
			this.hasSelectedPower = true;
			this.removeChildAt(3);
			
			this.level.switchPower(id);
			
			switch(id) {
				case 0:
					this.overlay.setUsePowerButtonIcon(this.assetQueue.getResult("icon-move-left"));
					break;
				case 1:
					this.overlay.setUsePowerButtonIcon(this.assetQueue.getResult("icon-move-right"));
					break;
				case 2:
					this.overlay.setUsePowerButtonIcon(this.assetQueue.getResult("icon-jump"));
					break;
				case 3:
					this.overlay.setUsePowerButtonIcon(this.assetQueue.getResult("icon-power-shot"));
					break;
				case 4:
					this.overlay.setUsePowerButtonIcon(this.assetQueue.getResult("icon-quiver"));
					this.overlay.setBottomEnabled(0, false);
					break;
			}
		}
	}
	
	p.usePower = function() { this.level.usePower(); }
	p.stopPower = function() { this.level.stopPower(); }
	p.hasSelectedPower = function() { return this.hasSelectedPower; }
	
	window.GameView = GameView;
}())