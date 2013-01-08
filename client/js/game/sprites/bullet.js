function bullets(){
	this.shots = [];
	this.add = function(arShots){//ad shots
		for (var i = arShots.length - 1; i >= 0; i--) {
			this.shots.push(arShots[i]);
		}
	};

	this.loop = function(){
		this.shots = [];//empty array because nothing is done with it
	};

	this.draw = function(){
		//Draw bullets
	};
}
