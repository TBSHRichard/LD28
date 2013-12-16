(function () {
	var TextButton = function(x, y, textString, assetQueue, clickFunction) {
		this.initialize(x, y, textString, assetQueue, clickFunction);
	}
	
	var p = TextButton.prototype = new createjs.Container();
	
	p.button;
	p.text;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(x, y, textString, assetQueue, clickFunction) {
		this.Container_initialize();
		
		this.x = x;
		this.y = y;
		
		var button = new createjs.Sprite(new createjs.SpriteSheet({
			images: [assetQueue.getResult("text-button")],
			frames: {width: 200, height: 60},
			animations: {
				out: {frames: [0]},
				down: {frames: [1]}
			}
		}), "out");
		
		this.button = button;
		
		var text = new createjs.Text(textString, "18px Arial", "#000");
		text.x = 100 - text.getMeasuredWidth() / 2;
		text.y = 25 - text.getMeasuredHeight() / 2;
		
		this.text = text;
		
		var btnHit = new createjs.Shape();
		btnHit.graphics.beginFill("#fff").drawRect(0, 0, 200, 60);
		btnHit.alpha = 0.01;
		
		btnHit.addEventListener("click", clickFunction);
		
		btnHit.addEventListener("pressup", function(event) {
			var tButton = event.currentTarget.parent;
			
			tButton.button.gotoAndStop("out");
			tButton.text.y -= 7;
		});
		
		btnHit.addEventListener("mousedown", function(event) {
			var tButton = event.currentTarget.parent;
			
			tButton.button.gotoAndStop("down");
			tButton.text.y += 7;
		});
		
		this.addChild(button);
		this.addChild(text);
		this.addChild(btnHit);
	}
	
	window.TextButton = TextButton;
}())