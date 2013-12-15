(function() {
	var Arrow = function(x, y, rotation, bitmapAsset) {
		this.initialize(x, y, rotation, bitmapAsset);
	}
	
	var p = Arrow.prototype = new createjs.Container();
	
	p.INITIAL_V = 15;
	p.DECEL = 0.5;
	p.yInfluence = 1;
	p.deltaX;
	p.deltaY;
	p.bitmap;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(x, y, rotation, bitmapAsset) {
		this.Container_initialize();
	
		this.x = x;
		this.y = y;
		this.rotation = -1 * rotation;
		
		this.regX = 56;
		this.regY = 15;
		
		this.deltaX = Math.cos(MathHelper.degreesToRadians(rotation)) * this.INITIAL_V;
		this.deltaY = -1 * Math.sin(MathHelper.degreesToRadians(rotation)) * this.INITIAL_V;
		
		this.bitmap = new createjs.Bitmap(bitmapAsset);
		this.addChild(this.bitmap);
		
		this.addEventListener("tick", onTick);
	}
	
	var onTick = function(event) {
		if (!event.paused) {
			var arrow = event.currentTarget;
			arrow.deltaY += arrow.DECEL;
			
			arrow.rotation = MathHelper.radiansToDegrees(Math.atan2(arrow.deltaY, arrow.deltaX));
		
			arrow.x += arrow.deltaX;
			arrow.y += arrow.deltaY;
		}
	}
	
	window.Arrow = Arrow;
}());