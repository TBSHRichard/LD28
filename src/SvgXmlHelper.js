(function() {
	var SvgXmlHelper = function() {}
	
	SvgXmlHelper.createWallsFromXml = function(xml, assetQueue) {
		var width = parseInt(xml.documentElement.attributes.getNamedItem("width").nodeValue);
		var height = parseInt(xml.documentElement.attributes.getNamedItem("height").nodeValue);
		var metal = new createjs.Shape();
		var floor = new createjs.Shape();
		var wood = new createjs.Shape();
		
		var groups = xml.getElementsByTagName("g");
		for (var g = 0; g < groups.length; g++) {
			var shape;
			var texture;
			
			if (groups[g].getAttribute("id") == "metal") {
				shape = metal;
				texture = assetQueue.getResult("texture-metal");
			}
			else if (groups[g].getAttribute("id") == "floor") {
				shape = floor;
				texture = assetQueue.getResult("texture-metal");
			}
			else if (groups[g].getAttribute("id") == "wood") {
				shape = wood;
				texture = assetQueue.getResult("texture-wood");
			}
			
			var paths = groups[g].childNodes;
			
			for (var i = 0; i < paths.length; i++) {
				var path = paths[i];
			
				if (path.nodeType != 3) { // Don't look at empty text
					if (path.tagName == "polygon") {
						var points = path.attributes.getNamedItem("points").nodeValue.split(/\s+/);
						var previousPoint;
						var currentPoint = points[0].split(",");
						
						shape.graphics.beginBitmapFill(texture).beginStroke("#000").moveTo(parseInt(currentPoint[0]), parseInt(currentPoint[1]));
						
						for (var p = 1; p < points.length; p++) {
							if (points[p] != "") {
								previousPoint = currentPoint;
								currentPoint = points[p].split(",");
								
								shape.graphics.lineTo(parseInt(currentPoint[0]), parseInt(currentPoint[1]));
							}
						}
						
						shape.graphics.endStroke().endFill();
					}
					else if (path.tagName == "rect") {
						shape.graphics.beginBitmapFill(texture).beginStroke("#000").drawRect(parseInt(path.attributes.getNamedItem("x").nodeValue), parseInt(path.attributes.getNamedItem("y").nodeValue),
							parseInt(path.attributes.getNamedItem("width").nodeValue), parseInt(path.attributes.getNamedItem("height").nodeValue));
					}
				}
			}
		}
		
		return new LevelWalls(width, height, metal, floor, wood);
	}
	
	window.SvgXmlHelper = SvgXmlHelper;
}())