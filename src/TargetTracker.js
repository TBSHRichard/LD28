(function() {
	var TargetTracker = function(target, viewRectangle, assetQueue) {
		this.initialize(target, viewRectangle, assetQueue);
	}
	
	var p = TargetTracker.prototype = new createjs.Container();
	
	p.target;
	p.pointer;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(target, viewRectangle, assetQueue) {
		this.Container_initialize();
		
		this.target = target;
		
		var tracker = new createjs.Bitmap(assetQueue.getResult("target-tracker"));
		tracker.regX = 13;
		tracker.regY = 13;
		
		var pointer = new createjs.Bitmap(assetQueue.getResult("target-pointer"));
		pointer.regY = 10;
		pointer.regX = -12;
		pointer.alpha = 0;
		this.pointer = pointer;
		
		this.addChild(pointer);
		this.addChild(tracker);
		
		this.update(viewRectangle);
	}
	
	p.update = function(viewRectangle) {
		this.x = this.target.x;
		this.y = this.target.y;
		
		var OFFSET = 30;
		
		var top = viewRectangle.y;
		var right = viewRectangle.x + viewRectangle.width;
		var bottom = viewRectangle.y + viewRectangle.height;
		var left = viewRectangle.x;
		
		if (this.x < left + OFFSET) {
			this.x = left + OFFSET;
		}
		else if (this.x > right - OFFSET) {
			this.x = right - OFFSET;
		}
		
		if (this.y < top + OFFSET) {
			this.y = top + OFFSET;
		}
		else if (this.y > bottom - OFFSET) {
			this.y = bottom - OFFSET;
		}
		
		if (this.x != this.target.x || this.y != this.target.y) {
			this.pointer.alpha = 1;
			this.pointer.rotation = MathHelper.radiansToDegrees(Math.atan2(this.target.y - this.y, this.target.x - this.x));
		}
	}
	
	window.TargetTracker = TargetTracker;
}())