(function() {
	var LevelWalls = function(width, height, metal, floor, wood) {
		this.initialize(width, height, metal, floor, wood);
	}
	
	var p = LevelWalls.prototype = new createjs.Container();
	
	p.width;
	p.height;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(width, height, metal, floor, wood) {
		this.Container_initialize();
		
		this.width = width;
		this.height = height;
		
		this.addChild(metal);
		this.addChild(floor);
		this.addChild(wood);
	}
	
	window.LevelWalls = LevelWalls;
}())