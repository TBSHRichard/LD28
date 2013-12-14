function MathHelper() {};

MathHelper.degreesToRadians = function(degrees) {
	return (Math.PI / 180) * degrees;
};

MathHelper.radiansToDegrees = function(radians) {
	return (180 / Math.PI) * radians;
};