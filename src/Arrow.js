(function() {
	var Arrow = function(x, y, rotation, bitmapAsset, init) {
		if (typeof init === 'undefined')
			this.initialize(x, y, rotation, bitmapAsset);
	}
	
	var p = Arrow.prototype = new createjs.Container();
	
	p.INITIAL_V = 15;
	p.DECEL = 0.5;
	p.yInfluence = 1;
	p.deltaX;
	p.deltaY;
	p.bitmap;
	p.isStopped;
	p.isPower;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(x, y, rotation, bitmapAsset) {
		this.Container_initialize();
	
		this.x = x;
		this.y = y;
		this.scaleX = 0.75;
		this.scaleY = 0.75;
		this.rotation = -1 * rotation;
		this.isPower = false;
		
		this.regX = 56 * 0.75;
		this.regY = 15 * 0.75;
		
		this.isStopped = false;
		
		this.deltaX = Math.cos(MathHelper.degreesToRadians(rotation)) * this.INITIAL_V;
		this.deltaY = -1 * Math.sin(MathHelper.degreesToRadians(rotation)) * this.INITIAL_V;
		
		this.bitmap = new createjs.Bitmap(bitmapAsset);
		this.addChild(this.bitmap);
		
		this.addEventListener("tick", onTick);
	}
	
	p.recalculate = function(rotation) {
		this.deltaX = Math.cos(MathHelper.degreesToRadians(rotation)) * this.INITIAL_V;
		this.deltaY = -1 * Math.sin(MathHelper.degreesToRadians(rotation)) * this.INITIAL_V;
	}
	
	var onTick = function(event) {
		var arrow = event.currentTarget;
		
		if (!event.paused && !arrow.isStopped) {
			arrow.deltaY += arrow.DECEL;
			
			arrow.rotation = MathHelper.radiansToDegrees(Math.atan2(arrow.deltaY, arrow.deltaX));
		
			arrow.x += arrow.deltaX;
			arrow.y += arrow.deltaY;
		}
	}
	
	window.Arrow = Arrow;
}());