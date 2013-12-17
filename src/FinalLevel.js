(function() {
	var FinalLevel = function(width, height, assetQueue) {
		this.initialize(width, height, "l", assetQueue, {
			startX: 700,
			startY: 690,
			hasWood: false,
			disabledPowers: [],
			targets: [{x: 500, y: 450},
				{x: 1050, y: 100},
				{x: 1225, y: 725}],
			dtWalls: [{x: 900, y: 650, r: -90, s: -1},
				{x: 1100, y: 650, r: -90, s: -1}],
			bouncers: [{x: 625, y: 600, r: -90},
				{x: 625, y: 450, r: -45},
				{x: 150, y: 725, r: -90},
				{x: 150, y: 600, r: -90},
				{x: 150, y: 400, r: -10},
				{x: 825, y: 350, r: -90},
				{x: 825, y: 200, r: -45},
				{x: 1500, y: 850, r: -90}]
		});
	}
	
	var p = FinalLevel.prototype = new Level();
	
	p.getBeginningOverlay = function(assetQueue) {
		return assetQueue.getResult("overlay-normal");
	}
	
	window.FinalLevel = FinalLevel;
}())