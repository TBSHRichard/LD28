(function() {
	var Archerilles = function(x, y, archerillesAsset, bowAsset) {
		this.initialize(x, y, archerillesAsset, bowAsset);
	}
	
	var p = Archerilles.prototype = new createjs.Container();
	
	p.character;
	p.bow;
	p.arrows;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(x, y, archerillesAsset, bowAsset) {
		this.Container_initialize();
		
		this.x = x;
		this.y = y;
		this.arrows = 1;
		
		var character = new createjs.Bitmap(archerillesAsset);
		character.regX = 30;
		character.regY = 50;
		this.character = character;
		
		var bow = new createjs.Sprite(new createjs.SpriteSheet({
			images: [bowAsset],
			frames: {width: 60, height: 60},
			animations: {
				drawn: [0],
				fired: [1]}}), "drawn");
		bow.regX = -30;
		bow.regY = 30;
		this.bow = bow;
		
		this.addChild(this.character);
		this.addChild(this.bow);
	}
	
	p.rotateBow = function(angle) {
		this.bow.rotation += angle;
		
		if (this.bow.rotation < -180)
			this.bow.rotation += 360;
		else if (this.bow.rotation > 180)
			this.bow.rotation -= 360;
		
		if (Math.floor(Math.abs(this.bow.rotation)) % 181 < 90) {
			this.character.scaleX = 1;
		}
		else {
			this.character.scaleX = -1;
		}
	}
	
	p.getBowRotation = function() { return -1 * this.bow.rotation; }
	p.setArrows = function(num) { this.arrows = num; }
	p.fireArrow = function() {
		this.arrows--;
		this.bow.gotoAndStop("fired");
	}
	
	window.Archerilles = Archerilles;
}())