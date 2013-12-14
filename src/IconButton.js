(function() {
	var IconButton = function(x, y, buttonAsset, iconAsset, key, clickFunction) {
		this.initialize(x, y, buttonAsset, iconAsset, key, clickFunction);
	}
	
	var p = IconButton.prototype = new createjs.Container();
	
	p.isDown = false;
	p.button;
	p.icon;
	p.keyText;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(x, y, buttonAsset, iconAsset, key, clickFunction) {
		this.Container_initialize();
		
		this.x = x;
		this.y = y;
		this.regX = 25;
		this.regY = 30;
		
		var data = {
			images: [buttonAsset],
			frames: {width: 50, height: 60},
			animations: {
				out: {frames: [0]},
				over: {frames: [1]},
				down: {frames: [2]}
			}
		}
		
		this.button = new createjs.Sprite(new createjs.SpriteSheet(data), "out");
		
		this.icon = new createjs.Bitmap(iconAsset);
		
		this.keyText = new createjs.Text(key, "12px Arial", "#000");
		this.keyText.x = 45 - this.keyText.getMeasuredWidth();
		this.keyText.y = 3;
		
		this.addChild(this.button);
		this.addChild(this.icon);
		this.addChild(this.keyText);
		
		this.addEventListener("click", clickFunction);
		
		this.addEventListener("pressup", function(event) {
			var iButton = event.currentTarget;
			
			iButton.button.gotoAndStop("out");
			iButton.icon.y = 0;
			iButton.keyText.y = 3;
		});
		this.addEventListener("mousedown", function(event) {
			var iButton = event.currentTarget;
			
			iButton.button.gotoAndStop("down");
			iButton.icon.y = 7;
			iButton.keyText.y = 10;
		});
	}
	
	window.IconButton = IconButton;
}());