// constants
PULSE_SPEED = 250;

// globals
KC = {
	canvas: null,
	ctx: null,
	scale: 0,
	gpx: {
	},
	input: {
		up: false,
		down: false,
		left: false,
		right: false,
		button: false,
		letgo: 0,
		pulse: true,
		lastaccel: 0
	},
	frame: 0,
	lastframe: 0,
	state: {
		player: {
			x: 500,
			y: 700,
			z: 0,
			speed: 0,
			left: false,
			brake: false,
			zoom: true
		}
	},
	blat: "pre-alpha"
};


// main game logic
function step() {
	if(KC.input.up) {
		KC.state.player.y -= 8;
	} else if(KC.input.down) {
		KC.state.player.y += 8;
	}
	if(KC.input.pulse) {  // gradual stepping
		if(KC.input.left) {
			if(KC.state.player.left) {
				KC.state.player.speed++;
			} else {
				KC.state.player.speed--;
			}
		} else if(KC.input.right) {
			if(KC.state.player.left) {
				KC.state.player.speed--;
			} else {
				KC.state.player.speed++;
			}
		} else if(KC.state.player.speed) {
			KC.state.player.speed--;
		}
		KC.input.pulse = false;
	}
	if(KC.state.player.speed > 4) {
		KC.state.player.speed = 4;
	} else if(KC.state.player.speed < 0) {
		KC.state.player.speed = 0;
		KC.state.player.left = !KC.state.player.left;
	} else if(KC.state.player.speed === 0) {
		KC.input.lastaccel = 0;
		KC.input.letgo = 0;
	}

	if(KC.state.player.left) {
		KC.state.player.x -= KC.state.player.speed * 8;
	} else {
		KC.state.player.x += KC.state.player.speed * 8;
	}
	KC.blat = KC.state.player.speed;
}

function render() {
	KC.ctx.save();

	// background
	KC.ctx.fillStyle = "#c17d11";
	KC.ctx.fillRect(0, 0, KC.canvas.width, KC.canvas.height);

	// TODO: level

	// TODO: z-sort objects+player
	// player
	KC.ctx.globalCompositeOperation = "source-over";
	KC.ctx.scale(KC.scale || 1, KC.scale || 1); // TODO: drunken effect here?
	KC.ctx.translate(KC.state.player.x, KC.state.player.y);  // according to 1920x1080
	if(KC.state.player.left) {
		KC.ctx.scale(-1, 1);
	}
	KC.ctx.drawImage(KC.gpx["player-drive0"],
//KC.state.player.left ? 52 : 160 - 52
					 -52, -(64 / 2));

	KC.ctx.restore();

	// debug overlay
	KC.ctx.font = "1em sans-serif";
	KC.ctx.fillStyle = "white";
	KC.ctx.fillText(KC.blat, 0, KC.canvas.height);
}

function gameloop(time) {
	if(!KC.lastframe) {
		KC.lastframe = time;
	}
	KC.frame = time - KC.lastframe;

	if(-1 === KC.input.lastaccel || time - KC.input.lastaccel > PULSE_SPEED) {
/*
		if(KC.input.letgo > 0 && KC.input.letgo - time < PULSE_SPEED) {
			KC.state.player.speed++;
			KC.blat += " BAM!";
			KC.input.letgo = time;
		}
*/
		KC.input.pulse = true;
		KC.input.lastaccel = time;
	}
	if(-1 === KC.input.letgo || time - KC.input.letgo > PULSE_SPEED) {
		KC.input.pulse = true;
		KC.input.letgo = time;
	}

	// 60 step()s per second regardless of framerate
	while(KC.frame > 16.666) {
		step();
		KC.frame -= 16.666;
	}

	KC.lastframe = time;
	render();
	window.requestAnimationFrame(gameloop);
}


// keyboard input
function keydown(e) {
	if(e.repeat) {
		return;
	}
	switch(e.keyCode) {
	case 38:   // up
	case 104:  // num_8
		KC.input.up = true;
		KC.input.down = false;
		break;
	case 40:   // down
	case 98:   // num_2
		KC.input.down = true;
		KC.input.up = false;
		break;
	case 37:   // left
	case 100:  // num_4
		if(!KC.input.left) {
			KC.input.lastaccel = -1;
//			KC.input.letgo = 0;
		}
		KC.input.left = true;
		KC.input.right = false;
		break;
	case 39:   // right
	case 102:  // num_6
		if(!KC.input.right) {
			KC.input.lastaccel = -1;
//			KC.input.letgo = 0;
		}
		KC.input.right = true;
		KC.input.left = false;
		break;
	case 17:   // ctrl
	case 18:   // alt
	case 32:   // space
		KC.input.button = true;
		e.preventDefault();
		break;
	}
}

function keyup(e) {
	switch(e.keyCode) {
	case 38:   // up
	case 104:  // num_8
		KC.input.up = false;
		break;
	case 40:   // down
	case 98:   // num_2
		KC.input.down = false;
		break;
	case 37:   // left
	case 100:  // num_4
		KC.input.left = false;
		KC.input.letgo = -1;
		KC.input.lastaccel = 0;
		break;
	case 39:   // right
	case 102:  // num_6
		KC.input.right = false;
		KC.input.letgo = -1;
		KC.input.lastaccel = 0;
		break;
	case 17:   // ctrl
	case 18:   // alt
	case 32:   // space
		KC.input.button = false;
		break;
	}
}


// event handlers
function resize() {
	KC.canvas.width = KC.canvas.height = 0;

	var par = KC.canvas.parentElement;
	var wide = (par.clientWidth / par.clientHeight) > (16 / 9);
	if(wide) {
		KC.canvas.width = par.clientHeight * (16 / 9);
		KC.canvas.height = par.clientHeight;
	} else {
		KC.canvas.width = par.clientWidth;
		KC.canvas.height = par.clientWidth / (16 / 9);
	}

	KC.scale = KC.canvas.width / 1920;
	render();
}
function load() {
	document.getElementById("loading").className = "hidden";
	KC.canvas = document.getElementById("display");
	KC.ctx = KC.canvas.getContext("2d");

	window.requestAnimationFrame = (window.requestAnimationFrame ||
									window.mozRequestAnimationFrame ||
									window.webkitRequestAnimationFrame ||
									window.msRequestAnimationFrame);

	var assets = document.getElementById("assets");
	var imgs = assets.getElementsByTagName("img");
	for(var i in imgs) {
		if(imgs[i].id) {
			KC.gpx[imgs[i].id] = imgs[i];
		}
	}

	window.requestAnimationFrame(gameloop);
	resize();
}


// wire up events
window.addEventListener("load", load);
window.addEventListener("resize", resize);

window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);