(function() {
	var GameView = function(width, height, assetQueue) {
		this.initialize(width, height, assetQueue);
	}
	
	var p = GameView.prototype = new createjs.Container();
	
	p.BOW_SPEED = 10;
	p.arrowContainer;
	p.archerilles;
	p.overlay;
	p.width;
	p.height;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(width, height, assetQueue) {
		this.Container_initialize();
		
		this.width = width;
		this.height = height;
		
		this.arrowContainer = new createjs.Container();
		
		this.archerilles = new Archerilles(width / 2, height / 2, assetQueue.getResult("archerilles"), assetQueue.getResult("bow"));
		
		this.overlay = new IconButtonContainer(width, height, assetQueue);
		
		this.addChild(this.arrowContainer);
		this.addChild(this.archerilles);
		this.addChild(this.overlay);
	}
	
	p.rotateCCW = function() {
		this.archerilles.rotateBow(-1 * this.BOW_SPEED);
	}
	
	p.rotateCW = function() {
		this.archerilles.rotateBow(this.BOW_SPEED);
	}
	
	p.fireArrow = function() {
		var bowAngle = this.archerilles.getBowRotation();
		
		this.arrowContainer.addChild(new Arrow(this.width / 2 + 86 * Math.cos(MathHelper.degreesToRadians(bowAngle)), this.height / 2 + -86 * Math.sin(MathHelper.degreesToRadians(bowAngle)), bowAngle, assetQueue.getResult("arrow")));
	}
	
	window.GameView = GameView;
}())