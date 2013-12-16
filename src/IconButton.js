(function() {
	var IconButton = function(x, y, buttonAsset, iconAsset, key, clickFunction) {
		this.initialize(x, y, buttonAsset, iconAsset, key, clickFunction);
	}
	
	var p = IconButton.prototype = new createjs.Container();
	
	p.isDown = false;
	p.button;
	p.icon;
	p.keyText;
	p.clickFunction;
	p.enabled = true;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(x, y, buttonAsset, iconAsset, key, clickFunction) {
		this.Container_initialize();
		
		this.x = x;
		this.y = y;
		this.regX = 25;
		this.regY = 30;
		
		this.clickFunction = clickFunction;
		
		var data = {
			images: [buttonAsset],
			frames: {width: 50, height: 60},
			animations: {
				out: {frames: [0]},
				disabled: {frames: [1]},
				down: {frames: [2]}
			}
		}
		
		this.button = new createjs.Sprite(new createjs.SpriteSheet(data), "out");
		
		this.icon = new createjs.Bitmap(iconAsset);
		
		this.keyText = new createjs.Text(key, "14px Arial", "#000");
		this.keyText.x = 45 - this.keyText.getMeasuredWidth();
		this.keyText.y = 3;
		
		var btnHit = new createjs.Shape();
		btnHit.graphics.beginFill("#fff").drawRect(0, 0, 50, 60);
		btnHit.alpha = 0.01;
		
		this.addChild(this.button);
		this.addChild(this.icon);
		this.addChild(this.keyText);
		this.addChild(btnHit);
		
		btnHit.addEventListener("click", function(event) {
			var iButton = event.currentTarget.parent;
			
			if (iButton.enabled) {
				iButton.clickFunction(event);
			}
		});
		
		btnHit.addEventListener("pressup", function(event) {
			var iButton = event.currentTarget.parent;
			
			if (iButton.enabled) {
				iButton.button.gotoAndStop("out");
				iButton.icon.y = 0;
				iButton.keyText.y = 3;
			}
		});
		
		btnHit.addEventListener("mousedown", function(event) {
			var iButton = event.currentTarget.parent;
			
			if (iButton.enabled) {
				iButton.button.gotoAndStop("down");
				iButton.icon.y = 7;
				iButton.keyText.y = 10;
			}
		});
	}
	
	p.setEnabled = function(value) {
		this.enabled = value;
		
		if (this.enabled) {
			this.button.gotoAndStop("out");
			this.icon.alpha = 1;
			this.keyText.alpha = 1;
		}
		else {
			this.button.gotoAndStop("disabled");
			this.icon.alpha = 0.5;
			this.keyText.alpha = 0.5;
		}
	}
	
	p.setIcon = function(newIconAsset) {
		this.icon.image = newIconAsset;
	}
	
	window.IconButton = IconButton;
}());