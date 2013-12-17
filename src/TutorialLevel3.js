(function() {
	var TutorialLevel3 = function(width, height, assetQueue) {
		this.initialize(width, height, "t3", assetQueue, {
			startX: 200,
			startY: 340,
			hasWood: false,
			disabledPowers: [0, 1, 2, 4],
			targets: [{x: 200, y: 150}],
			dtWalls: [{x: 150, y: 200}],
			bouncers: []
		});
	}
	
	var p = TutorialLevel3.prototype = new Level();
	
	p.getBeginningOverlay = function(assetQueue) {
		return assetQueue.getResult("overlay-t3");
	}
	
	window.TutorialLevel3 = TutorialLevel3;
}())