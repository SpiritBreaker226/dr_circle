var Circle = function(e) {
	this.diameter = 30 + (Math.random() * 50);// this will give a random number 30 - 80
	this.speed = 500 + (Math.random() * 1500);// this will give a random number 500 - 1500
	this.element = e;

	this.element.css({
		width: this.diameter,
		height: this.diameter,
		// random positon from the size of the box 
		top: this.newPosition(),
		left: this.newPosition()
	});
}

Circle.prototype.newPosition = function() {
	return Math.random() * (500 - this.diameter)
}

// creates a function for Circle because it is outside is because 
// it will look messay after awhile if there is a lot of funcitons for this object
Circle.prototype.move = function() {
	var self = this;

	this.element.animate({
		top: this.newPosition(),
		left: this.newPosition()
	}, {
		duration: this.speed,
		complete: function() {
			// this when when a complate function jQuery will change this to the DOM of what was change
			
			// self is this before the complate function works
			// now the is will always move the circle 
			self.move();
		}
	});
}

Circle.prototype.listen = function() {
	var self = this;

	this.element.on("click", function() {
		//  kill
		self.kill();
		console.log("Kill!");
	});
}

Circle.prototype.kill = function() {
	this.element.css({
		backgroundColor: "red"
	}).effect({
		effect: "explode",
		duration: 450,
		complete: function() {
			// increse soore
			window.score.increase();

			// stop click event hundle to this element
			$(this).off("click");
		},
		// allows the amination to do the right area otherwise it will need to finsh the move animaiton before 
		// doing the kill anmation
		queue: false
	});
}

var Score = function(e) {
	this.element = e;
}

Score.prototype.current = function() {
	return parseInt(this.element.text())
}

Score.prototype.increase = function() {
	 var newScore = this.current() + 100;
	 this.element.text(newScore);
}

Score.prototype.reset = function() {
	this.element.text("0");
}

$(document).ready(function() {
	var duration =  20000; // 20 seconds
	window.score = new Score($("#score"));
	score.reset();

	// goes around each jQuery object for .circle
	$.each($(".circle"), function() {
		// the this is meands 'this' is the jQuery object of the current .circle
		// remember to use $(this) to get the jQuery object for this
		var circle = new Circle($(this));

		circle.listen();
		circle.move();
	});

	setTimeout(function() {
		// stops every thing
		$.each($(".circle"), function() {
			var self = $(this)

			self.off("click");
			self.hide();
		});

		alert("GAME OVER!, You properly lose...");
	}, duration);
});