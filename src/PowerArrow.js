(function() {
	var PowerArrow = function(x, y, rotation, arrowAsset) {
		this.initialize(x, y, rotation, arrowAsset);
		
		this.isPower = true;
	}
	
	PowerArrow.prototype = new Arrow(0, 0, 0, null, false);
	
	window.PowerArrow = PowerArrow;
}())