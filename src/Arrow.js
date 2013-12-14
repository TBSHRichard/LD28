(function() {
	var Arrow = function(x, y, rotation, bitmapAsset) {
		this.initialize(x, y, rotation, bitmapAsset);
	}
	
	var p = Arrow.prototype = new createjs.Container();
	
	p.INITIAL_V = 15;
	p.DECEL = 0.05;
	p.yInfluence = 1;
	p.deltaX;
	p.deltaY;
	p.bitmap;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(x, y, rotation, bitmapAsset) {
		this.Container_initialize();
		
		console.log("Arrow initialized!");
	
		this.x = x;
		this.y = y;
		this.rotation = -1 * rotation;
		
		this.regX = 56;
		this.regY = 15;
		
		this.deltaX = Math.cos(MathHelper.degreesToRadians(rotation)) * this.INITIAL_V;
		this.deltaY = -1 * Math.sin(MathHelper.degreesToRadians(rotation)) * this.INITIAL_V;
		
		console.log("X: " + this.deltaX + "; Y: " + this.deltaY);
		
		this.bitmap = new createjs.Bitmap(bitmapAsset);
		this.addChild(this.bitmap);
		
		this.addEventListener("tick", this.onTick);
	}
	
	p.onTick = function(event) {
		if (!event.paused) {
			var arrow = event.currentTarget;
			arrow.yInfluence -= arrow.DECEL;
			
			var xComp = arrow.deltaX;
			var yComp = arrow.deltaY * arrow.yInfluence;
			
			arrow.rotation = MathHelper.radiansToDegrees(Math.atan2(yComp, xComp));
		
			arrow.x += xComp;
			arrow.y += yComp;
		}
	};
	
	window.Arrow = Arrow;
}());