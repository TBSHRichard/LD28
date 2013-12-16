(function() {
	var TutorialLevel1 = function(width, height, assetQueue) {
		this.initialize(width, height, "t1", assetQueue, {
			startX: 450,
			startY: 290,
			hasWood: false,
			disabledPowers: [1, 2, 3, 4],
			targets: [{x: 225, y: 75}],
			dtWalls: [],
			bouncers: []
		});
	}
	
	var p = TutorialLevel1.prototype = new Level();
	
	p.getBeginningOverlay = function(assetQueue) {
		return assetQueue.getResult("overlay-t1");
	}
	
	window.TutorialLevel1 = TutorialLevel1;
}())