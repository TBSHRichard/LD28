(function() {
	var TutorialLevel4 = function(width, height, assetQueue) {
		this.initialize(width, height, "t4", assetQueue, {
			startX: 300,
			startY: 240,
			hasWood: false,
			disabledPowers: [0, 1, 2, 3],
			targets: [{x: 125, y: 125},
				{x: 475, y: 125}],
			dtWalls: [],
			bouncers: []
		});
	}
	
	var p = TutorialLevel4.prototype = new Level();
	
	p.getBeginningOverlay = function(assetQueue) {
		return assetQueue.getResult("overlay-t4");
	}
	
	window.TutorialLevel4 = TutorialLevel4;
}())