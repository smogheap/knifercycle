// constants
PULSE_TICKS = 15;  // of 60fps, = 250ms
FLAP_TICKS = 5;
TO_RADIANS = Math.PI / 180;

// globals
KC = {
	canvas: null,
	ctx: null,
	fxcanvas: null,
	fxctx: null,
	scale: 0,
	gpx: {
	},
	input: {
		up: false,
		down: false,
		left: false,
		right: false,
		button: false,
		pulse: 0,
		boost: false
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
			brake: 0,
			zoom: 0,
			flap: 0
		},
		level: {
			course: "main1",
			offset: 0
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
	if(KC.state.player.zoom > 0) {
		KC.state.player.zoom -= 0.5;
	}
	if(KC.state.player.zoom < 0) {
		KC.state.player.zoom = 0;
	}
	if(KC.input.pulse) {
		KC.input.pulse--;
	} else {
		if(KC.input.left) {
			KC.input.pulse = PULSE_TICKS;
			if(KC.state.player.left) {
				KC.state.player.brake = 0;
				if(KC.input.boost) {
					KC.state.player.speed++;
					KC.state.player.zoom += 5;
				}
				KC.state.player.speed++;
			} else {
				KC.state.player.speed--;
				KC.state.player.zoom = 0;
				if(KC.input.boost) {
					KC.state.player.brake = 5;
				}
			}
		} else if(KC.input.right) {
			KC.input.pulse = PULSE_TICKS;
			if(KC.state.player.left) {
				KC.state.player.speed--;
				KC.state.player.zoom = 0;
				if(KC.input.boost) {
					KC.state.player.brake += 5;
				}
			} else {
				KC.state.player.brake = 0;
				if(KC.input.boost) {
					KC.state.player.speed++;
					KC.state.player.zoom += 5;
				}
				KC.state.player.speed++;
			}
		} else if(KC.state.player.speed) {
			KC.input.pulse = PULSE_TICKS;
			KC.state.player.speed--;
		}
	}
	if(KC.input.boost) {
		KC.input.boost = false;
	}
	if(KC.state.player.zoom > 25) {
		KC.state.player.zoom = 25;
	}
	if(KC.state.player.speed > 4) {
		KC.state.player.speed = 4;
	} else if(KC.state.player.speed < 0) {
		KC.state.player.speed = 0;
		KC.state.player.left = !KC.state.player.left;
	}
	if(KC.state.player.speed === 0) {
		KC.input.pulse = 0;
		if(KC.state.player.brake > 0) {
			KC.state.player.brake -= 0.5;
		}
		if(KC.state.player.brake < 0) {
			KC.state.player.brake = 0;
		}
	}
	if(KC.state.player.left) {
		KC.state.player.x -= KC.state.player.speed * 8;
	} else {
		KC.state.player.x += KC.state.player.speed * 8;
	}
	if(KC.state.player.speed > 1) {
		KC.state.player.flap++;
		if(KC.state.player.flap > FLAP_TICKS * 2) {
			KC.state.player.flap = 1;
		}
	} else if(KC.state.player.speed === 1 &&
			  (!KC.input.left && !KC.input.right)) {
		KC.state.player.flap = 1;
	} else {
		KC.state.player.flap = 0;
	}

	KC.blat = KC.state.player.speed;
}

function render() {
	var level = LEVELS[KC.state.level.course];
	var i = 0;
	var max = Math.min(12, level.course.length);
	var strip = null;
	var blank = true;
	var offx = 0;
	var offy = 0;

	KC.ctx.save();

	// background
	KC.ctx.fillStyle = "#729fcf";
	KC.ctx.fillRect(0, 0, KC.canvas.width, KC.canvas.height);
	KC.ctx.fillStyle = "#8f5902";
	KC.ctx.fillRect(0, KC.canvas.height / 2, KC.canvas.width, KC.canvas.height / 2);

	KC.ctx.scale(KC.scale || 1, KC.scale || 1); // TODO: drunken effect here?

	// level
	// TODO: offset, scroll etc
	for(i = 0; i < 12; i++) {
		strip = null;
		blank = false;
		offx = 0;
		offy = 0;
		switch(level.course[i]) {
		case "lowramp1":
			blank = true;
			strip = KC.gpx["level-" + level.theme + "-lowramp"];
			offy = -80;
			break;
		case "blank":
		default:
			blank = true;
			break;
		}

		if(blank) {
			KC.ctx.drawImage(KC.gpx["level-" + level.theme + "-blank"],
							 (i * 160), 600);
		}
		if(strip) {
			KC.ctx.drawImage(strip, (i * 160) + offx, 600 + offy);
		}
	}
	KC.ctx.drawImage(KC.gpx["level-" + level.theme + "-blank"],
					 (i * 160) + offx, 600 + offy);

	// TODO: z-sort objects+player
	// player
	KC.ctx.globalCompositeOperation = "source-over";
	KC.ctx.translate(KC.state.player.x, KC.state.player.y);  // according to 1920x1080
	if(KC.state.player.left) {
		KC.ctx.scale(-1, 1);
	}
	if(KC.state.player.brake) {
		KC.ctx.rotate(KC.state.player.brake * TO_RADIANS);
	} else {
		KC.ctx.rotate(-KC.state.player.zoom * TO_RADIANS);
	}

	var img = KC.gpx["player-drive0"];
	if(KC.state.player.flap) {
		if(KC.state.player.flap < FLAP_TICKS) {
			img = KC.gpx["player-drive1"];
		} else {
			img = KC.gpx["player-drive2"];
		}
	}
	KC.ctx.drawImage(img,
//KC.state.player.left ? 52 : 160 - 52
					 -52, -(64 / 2));

	KC.ctx.restore();

	// filter
/*
	KC.ctx.save();

	KC.fxcanvas.width = KC.canvas.width / 16;
	KC.fxcanvas.height = KC.canvas.height / 16;
	KC.fxctx.drawImage(KC.canvas, 0, 0, KC.fxcanvas.width, KC.fxcanvas.height);

	KC.ctx.globalCompositeOperation = "lighter";
	KC.ctx.globalAlpha = 0.2;
	KC.ctx.drawImage(KC.fxcanvas, 0, 0, KC.canvas.width, KC.canvas.height);

	KC.ctx.restore();
*/

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
			KC.input.pulse = 0;
			KC.input.boost = true;
		}
		KC.input.left = true;
		KC.input.right = false;
		break;
	case 39:   // right
	case 102:  // num_6
		if(!KC.input.right) {
			KC.input.pulse = 0;
			KC.input.boost = true;
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
		KC.input.pulse = 0;
		break;
	case 39:   // right
	case 102:  // num_6
		KC.input.right = false;
		KC.input.pulse = 0;
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
	KC.fxcanvas = document.createElement("canvas");
//	KC.fxcanvas = document.getElementById("fx");
	KC.fxctx = KC.fxcanvas.getContext("2d");

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