(function() {
	var Preloader = function(width, height, tbshLogo, queueCompleteFunction) {
		this.initialize(width, height, tbshLogo, queueCompleteFunction);
	}
	
	var p = Preloader.prototype = new createjs.Container();
	
	p.assetQueue;
	
	p.Container_initialize = p.initialize;
	p.initialize = function(width, height, tbshLogo, queueCompleteFunction) {
		this.Container_initialize();
		
		var fadedLogo = new createjs.Bitmap(tbshLogo);
		fadedLogo.alpha = 0.5;
		fadedLogo.regX = 75;
		fadedLogo.regY = 82;
		fadedLogo.x = width / 2;
		fadedLogo.y = height / 2;
		
		var loadingText = new createjs.Text("Loading...", "20px Arial", "#000");
		loadingText.regX = loadingText.getMeasuredWidth() / 2;
		loadingText.regY = loadingText.getMeasuredHeight() / 2;
		loadingText.x = width / 2;
		loadingText.y = height / 2 + 100;
		
		var progressLogo = new createjs.Shape();
		var logoMatrix = new createjs.Matrix2D();
		logoMatrix.translate(width / 2 - 75, height / 2 - 82);
		
		var progressText = new createjs.Text("0%", "20px Arial", "#fff");
		progressText.regX = progressText.getMeasuredWidth() / 2;
		progressText.regY = progressText.getMeasuredHeight() / 2;
		progressText.x = width / 2 - 3;
		progressText.y = height / 2 + 5;
		
		this.assetQueue = new createjs.LoadQueue();
		this.assetQueue.addEventListener("progress", function(event) {
			progressLogo.graphics.clear().beginBitmapFill(tbshLogo, "no-repeat", logoMatrix).drawRect(width / 2 - 75, height / 2 - 82, 150 * event.progress, 165);
			progressText.text = Math.floor(event.progress * 100) + "%";
			progressText.regX = progressText.getMeasuredWidth() / 2;
		});
		this.assetQueue.addEventListener("complete", queueCompleteFunction);
		this.assetQueue.loadManifest([
			{id: "arrow", src: "assets/images/arrow.png"},
			{id: "archerilles", src: "assets/images/archerilles.png"},
			{id: "bow", src: "assets/images/bow.png"},
			{id: "icon-button", src: "assets/images/icon-button.png"},
			{id: "button-bar", src: "assets/images/button-bar.png"},
			{id: "icon-move-left", src: "assets/images/btn-icons/move-left.png"},
			{id: "icon-move-right", src: "assets/images/btn-icons/move-right.png"},
			{id: "icon-jump", src: "assets/images/btn-icons/jump.png"},
			{id: "icon-power-shot", src: "assets/images/btn-icons/power-shot.png"},
			{id: "icon-quiver", src: "assets/images/btn-icons/arrow.png"},
			{id: "icon-fire", src: "assets/images/btn-icons/fire.png"},
			{id: "icon-rotate-ccw", src: "assets/images/btn-icons/rotate-ccw.png"},
			{id: "icon-rotate-cw", src: "assets/images/btn-icons/rotate-cw.png"},
			{id: "icon-use", src: "assets/images/btn-icons/use.png"}]);
			
		this.addChild(fadedLogo);
		this.addChild(loadingText);
		this.addChild(progressLogo);
		this.addChild(progressText);
	}
	
	p.getAssetQueue = function() { return this.assetQueue; }
	
	window.Preloader = Preloader;
}())