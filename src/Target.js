(function() {
	var Target = function(x, y, assetQueue) {
		this.initialize(x, y, assetQueue);
	}
	
	var p = Target.prototype = new createjs.Container;
	
	p.isDestroyed;
	p.hitBox;
	p.key;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(x, y, assetQueue) {
		this.Container_initialize();
		
		this.x = x - 20;
		this.y = y - 20;
		
		this.isDestroyed = false;
		
		this.hitBox = new createjs.Shape();
		this.hitBox.graphics.beginFill("#fff").drawRect(-10, -10, 60, 60);
		this.hitBox.alpha = 0.01;
		
		this.key = new createjs.Sprite(new createjs.SpriteSheet({
			images: [assetQueue.getResult("target")],
			frames: {width: 40, height: 40},
			animations: {
				normal: {frames: [0]},
				destroyed: {frames: [1]}
			}
		}), "normal");
		
		this.addChild(this.hitBox);
		this.addChild(this.key);
	}
	
	p.destroyKey = function() {
		this.isDestroyed = true;
		this.key.gotoAndStop("destroyed");
	}
	
	window.Target = Target;
}())