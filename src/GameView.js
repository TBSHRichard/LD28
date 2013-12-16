(function() {
	var GameView = function(width, height, assetQueue, levelIndex, levelClassesArray) {
		this.initialize(width, height, assetQueue, levelIndex, levelClassesArray);
	}
	
	var p = GameView.prototype = new createjs.Container();
	
	p.levelIndex;
	p.levelClassesArray;
	p.background;
	//p.arrowContainer;
	//p.archerilles;
	p.level;
	p.overlay;
	p.assetQueue;
	p.width;
	p.height;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(width, height, assetQueue, levelIndex, levelClassesArray) {
		this.Container_initialize();
		
		this.levelIndex = levelIndex;
		this.levelClassesArray = levelClassesArray;
		this.assetQueue = assetQueue;
		this.width = width;
		this.height = height;
		
		this.background = new Background(0, 66, 544, 180, assetQueue);
		
		//this.arrowContainer = new createjs.Container();
		
		//this.archerilles = new Archerilles(width / 2, height / 2, assetQueue.getResult("archerilles"), assetQueue.getResult("bow"));
		
		this.level = new levelClassesArray[levelIndex](width, height, assetQueue);
		
		var overlay = new IconButtonContainer(width, height, assetQueue);
		this.overlay = overlay;
		
		this.level.data["disabledPowers"].forEach(function(element, index, array) {
			overlay.setTopEnabled(element, false);
		});
		
		this.addChild(this.background);
		//this.addChild(this.arrowContainer);
		//this.addChild(this.archerilles);
		this.addChild(this.level);
		this.addChild(this.overlay);
		//this.addChild(new BeginningOverlay(66, width, height - 66, this.level.getBeginningOverlay(assetQueue)));
	}
	
	p.rotateCCW = function() { this.level.rotateCCW(); }
	p.rotateCW = function() { this.level.rotateCW(); }
	p.fireArrow = function() { this.level.fireArrow(); }
	p.switchPower = function(id) { this.level.switchPower(id); }
	
	/*p.rotateCCW = function() {
		this.archerilles.rotateBow(-1 * this.BOW_SPEED);
	}
	
	p.rotateCW = function() {
		this.archerilles.rotateBow(this.BOW_SPEED);
	}
	
	p.fireArrow = function() {
		var bowAngle = this.archerilles.getBowRotation();
		
		this.arrowContainer.addChild(new Arrow(this.width / 2 + 86 * Math.cos(MathHelper.degreesToRadians(bowAngle)), this.height / 2 + -86 * Math.sin(MathHelper.degreesToRadians(bowAngle)), bowAngle, assetQueue.getResult("arrow")));
	}
	
	p.switchPower = function(id) {
		switch(id) {
			case 0:
				this.archerilles.switchLegs(this.assetQueue.getResult("move-left"));
				break;
			case 1:
				this.archerilles.switchLegs(this.assetQueue.getResult("move-right"));
				break;
			case 2:
				this.archerilles.switchLegs(this.assetQueue.getResult("jump"));
				break;
			case 3:
				this.archerilles.switchLegs(this.assetQueue.getResult("power-shot"));
				break;
			case 4:
				this.archerilles.switchLegs(this.assetQueue.getResult("quiver"));
				break;
		}
	}*/
	
	window.GameView = GameView;
}())