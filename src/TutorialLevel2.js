(function() {
	var TutorialLevel2 = function(width, height, assetQueue) {
		this.initialize(width, height, "t2", assetQueue, {
			startX: 500,
			startY: 340,
			hasWood: false,
			disabledPowers: [0, 1, 3, 4],
			targets: [{x: 150, y: 300}],
			dtWalls: [],
			bouncers: []
		});
	}
	
	var p = TutorialLevel2.prototype = new Level();
	
	p.getBeginningOverlay = function(assetQueue) {
		return assetQueue.getResult("overlay-t2");
	}
	
	window.TutorialLevel2 = TutorialLevel2;
}())