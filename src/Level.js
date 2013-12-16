(function() {
	var Level = function() {}
	
	var p = Level.prototype = new createjs.Container();
	
	p.BOW_SPEED = 10;
	p.width;
	p.height;
	p.assetQueue;
	p.data;
	p.archerilles;
	p.currentPower;
	p.arrowContainer;
	p.isFollowingArrow;
	p.isLevelOver;
	p.activeArrow;
	p.walls;
	p.targetContainer;
	p.targetTrackerContainer;
	p.targetHelpers;
	p.targets;
	p.numberOfTargets = 0;
	p.dtWalls;
	p.bouncers;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(width, height, levelId, assetQueue, data) {
		this.Container_initialize();
		
		this.width = width;
		this.height = height;
		this.assetQueue = assetQueue;
		this.data = data;
		
		this.isFollowingArrow = false;
		this.isLevelOver = false;
		
		this.archerilles = new Archerilles(data.startX, data.startY, assetQueue.getResult("archerilles"), assetQueue.getResult("bow"));
		this.x = -1 * data.startX + width / 2;
		this.y = -1 * data.startY + height / 2;
		
		this.arrowContainer = new createjs.Container();
		
		this.walls = SvgXmlHelper.createWallsFromXml(assetQueue.getResult("level-" + levelId), assetQueue);
		
		this.targets = [];
		this.numberOfTargets = 0;
		this.targetTrackerContainer = new createjs.Container();
		
		this.targetContainer = new createjs.Container();
		for (var t = 0; t < data.targets.length; t++) {
			var target = new Target(data.targets[t].x, data.targets[t].y, assetQueue);
			
			this.targets.push(target);
			this.targetContainer.addChild(target);
			this.targetTrackerContainer.addChild(new TargetTracker(target, this.getViewportRectangle(), assetQueue));
			this.numberOfTargets++;
		}
		
		this.dtWalls = [];
		this.bouncers = [];
		
		this.addChild(this.targetContainer);
		this.addChild(this.arrowContainer);
		this.addChild(this.walls);
		this.addChild(this.archerilles);
		this.addChild(this.targetTrackerContainer);
		
		this.addEventListener("tick", update);
	}
	
	p.setBottomControlsEnabled = function(value) {
		GlobalControls.setEnabled("use", value);
		GlobalControls.setEnabled("rotateCCW", value);
		GlobalControls.setEnabled("rotateCW", value);
		GlobalControls.setEnabled("fire", value);
	}
	
	p.getViewportRectangle = function() {
		return new createjs.Rectangle(
			this.archerilles.x - this.width / 2,
			this.archerilles.y - (this.height - 126) / 2,
			this.archerilles.x + this.width / 2 - (this.archerilles.x - this.width / 2),
			this.archerilles.y + (this.height - 126) / 2 - (this.archerilles.y - (this.height - 126) / 2));
	}
	
	p.rotateCCW = function() {
		this.archerilles.rotateBow(-1 * this.BOW_SPEED);
	}
	
	p.rotateCW = function() {
		this.archerilles.rotateBow(this.BOW_SPEED);
	}
	
	p.fireArrow = function() {
		this.setBottomControlsEnabled(false);
	
		if (!this.isFollowingArrow && !this.isLevelOver) {
			var bowAngle = this.archerilles.getBowRotation();
			var arrow = new Arrow(this.archerilles.x + (56 * 0.75) * Math.cos(MathHelper.degreesToRadians(bowAngle)),
				this.archerilles.y + (-56 * 0.75) * Math.sin(MathHelper.degreesToRadians(bowAngle)), bowAngle, assetQueue.getResult("arrow"));
			
			this.archerilles.fireArrow();
			this.isFollowingArrow = true;
			this.activeArrow = arrow;
			this.arrowContainer.addChild(arrow);
			this.targetTrackerContainer.alpha = 0;
		}
	}
	
	p.switchPower = function(id) {
		this.currentPower = id;
	
		switch(id) {
			case 0:
				this.archerilles.switchLegs(this.assetQueue.getResult("move-left"));
				break;
			case 1:
				this.archerilles.switchLegs(this.assetQueue.getResult("move-right"));
				break;
			case 2:
				this.archerilles.switchLegs(this.assetQueue.getResult("jump"));
				break;
			case 3:
				this.archerilles.switchLegs(this.assetQueue.getResult("power-shot"));
				break;
			case 4:
				this.archerilles.arrows = 2;
				this.archerilles.switchLegs(this.assetQueue.getResult("quiver"));
				break;
		}
	}
	
	p.hitWall = function(deltaX, deltaY) {
		return this.walls.hitTest(this.archerilles.x + deltaX, this.archerilles.y + deltaY);
	}
	
	p.usePower = function() {
		switch(this.currentPower) {
			case 0:
				this.archerilles.isMovingLeft = true;
				break;
			case 1:
				this.archerilles.isMovingRight = true;
				break;
			case 2:
				if (!this.archerilles.isJumping) {
					this.archerilles.startJump(-12);
				}
				break;
		}
	}
	
	p.stopPower = function() {
		switch(this.currentPower) {
			case 0:
				this.archerilles.isMovingLeft = false;
				break;
			case 1:
				this.archerilles.isMovingRight = false;
				break;
		}
	}
	
	p.getBeginningOverlay = function(assetQueue) {
		return assetQueue.getResult("overlay-normal");
	}
	
	p.stopActiveArrow = function() {
		this.isFollowingArrow = false;
		this.activeArrow.isStopped = true;
		this.activeArrow = null;
		
		if (this.numberOfTargets == 0) {
			this.isLevelOver = true;
			this.parent.success();
		}
		else if (this.archerilles.arrows == 0) {
			this.isLevelOver = true;
			this.parent.failure();
		}
		else {
			this.archerilles.bow.gotoAndStop("drawn");
			this.targetTrackerContainer.alpha = 1;
			this.setBottomControlsEnabled(true);
		}
	}
	
	function update(event) {
		var level = event.currentTarget;
		
		level.targetTrackerContainer.children.forEach(function(element, index, array) {
			element.update(level.getViewportRectangle());
		});
	
		if (level.isFollowingArrow) {
			level.x = -1 * level.activeArrow.x + level.width / 2;
			level.y = -1 * level.activeArrow.y + level.height / 2;
			
			level.targetContainer.children.forEach(function(element, index, array) {
				var xTest = level.activeArrow.x - (element.x - 20);
				var yTest = level.activeArrow.y - (element.y - 20);
			
				if (element.hitTest(xTest, yTest) && !element.isDestroyed) {
					element.destroyKey();
					level.numberOfTargets--;
				}
			});
			
			if (level.walls.metal.hitTest(level.activeArrow.x, level.activeArrow.y)) {
				if (!level.walls.metal.hitTest(level.activeArrow.x - level.activeArrow.deltaX, level.activeArrow.y) || !level.walls.metal.hitTest(level.activeArrow.x + level.activeArrow.deltaX, level.activeArrow.y)) {
					level.activeArrow.deltaX *= -1;
				}
				else {
					level.activeArrow.deltaY *= -1;
				}
			}
			else if (level.walls.floor.hitTest(level.activeArrow.x, level.activeArrow.y) || level.walls.wood.hitTest(level.activeArrow.x, level.activeArrow.y)) {
				level.stopActiveArrow();
			}
		}
		else {
			level.x = -1 * level.archerilles.x + level.width / 2;
			level.y = -1 * level.archerilles.y + level.height / 2;
		}
	}
	
	window.Level = Level;
}())