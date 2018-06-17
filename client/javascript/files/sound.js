function backgroundMusic() {
	this.music  = new Audio("sounds/music.mp3");
	this.volume = 0.2;
	this.updateSettings = function() {
		this.music.loop = true;
		this.music.volume = this.volume;
	}
	this.start = function() {
		this.music.play();
	}
}

function start_sound() {
	background_music.updateSettings();
	background_music.start();
}
