(function() {
	var Background = function(x, y, width, height, assetQueue) {
		this.initialize(x, y, width, height, assetQueue);
	}
	
	var p = Background.prototype = new createjs.Container;
	
	p.fMatrix;
	p.mMatrix;
	p.bMatrix;
	p.front;
	p.middle;
	p.back;
	p.width;
	p.height;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(x, y, width, height, assetQueue) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	
		this.fMatrix = new createjs.Matrix2D();
		this.fMatrix.translate(0, 25);
		
		this.mMatrix = new createjs.Matrix2D();
		this.mMatrix.translate(0, -25);
		
		this.bMatrix = new createjs.Matrix2D();
		this.bMatrix.translate(0, -25);
		
		this.front = new createjs.Shape();
		this.middle = new createjs.Shape();
		this.back = new createjs.Shape();
		
		var fadedRectangle = new createjs.Shape();
		fadedRectangle.graphics.beginFill("#050").drawRect(0, 0, width, height);
		fadedRectangle.alpha = 0.75;
		
		this.drawBG();
		
		this.addChild(this.back);
		this.addChild(this.middle);
		this.addChild(this.front);
		this.addChild(fadedRectangle);
	}
	
	p.drawBG = function() {
		this.front.graphics.clear().beginBitmapFill(assetQueue.getResult("bg-front"), "repeat", this.fMatrix).drawRect(0, 25, this.width, this.height - 25);
		this.middle.graphics.clear().beginBitmapFill(assetQueue.getResult("bg-middle"), "repeat", this.mMatrix).drawRect(0, 0, this.width, this.height);
		this.back.graphics.clear().beginBitmapFill(assetQueue.getResult("bg-back"), "repeat", this.bMatrix).drawRect(0, 0, this.width, this.height);
	}
	
	p.moveBG = function(offset) {
		this.fMatrix.translate(offset, 0);
		this.mMatrix.translate(offset / 2, 0);
		this.bMatrix.translate(offset / 4, 0);
		
		this.drawBG();
	}
	
	window.Background = Background;
}())