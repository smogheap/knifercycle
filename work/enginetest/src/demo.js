DEMO = {
	canvas: null,
	width: 1920,
	height: 1080,
	json: {},
	thing: {},
	wheelspeed: 1,
	wave: -60
};
function LOAD(json) {
	var data = json;
	var name = data.name || "anonymous";
	DEMO.json[name] = data;
}
if(!console) {
	console = {
		log: function() {},
		error: function() {}
	}
}

function tick(scene) {
	DEMO.thing.player.x = 1000;
	DEMO.thing.player.y = 500;
	if(DEMO.thing.player.x > DEMO.width) {
		DEMO.thing.player.x = 0;
	}
	if(DEMO.thing.player.y > DEMO.height) {
		DEMO.thing.player.y = 0;
	}
	DEMO.thing.player.obj._$.wheel02.rotate -= DEMO.wheelspeed;
	DEMO.thing.player.obj._$.wheel04.rotate -= DEMO.wheelspeed;
	DEMO.thing.player.obj._$.wheel02move.rotate -= DEMO.wheelspeed;
	DEMO.thing.player.obj._$.wheel04move.rotate -= DEMO.wheelspeed;
	DEMO.thing.player.obj._$.wheel02fast.rotate -= DEMO.wheelspeed;
	DEMO.thing.player.obj._$.wheel04fast.rotate -= DEMO.wheelspeed;

	var player = DEMO.thing.player;
	var tags = player.getTags();
	var speed = null;
	var change = 0;
	if(tags.indexOf("move") >= 0) {
		speed = "move";
		change = 2;
	} else if(tags.indexOf("fast") >= 0) {
		speed = "fast";
		change = 3;
	}

	// flap the cape
	var caperot = DEMO.thing.player.obj._$["wingus-capestill"].rotate - 90;
	if(tags.indexOf("flap1") >= 0) {
		caperot -= change;
		if((speed === "move" && caperot < -60) ||
		   (speed === "fast" && caperot < -100)) {
			player.removeTags("flap1");
			player.addTags("flap2");
		}
	} else if(tags.indexOf("flap2") >= 0) {
		caperot += change;
		if((speed === "move" && caperot > -40) ||
		   (speed === "fast" && caperot > -80)) {
			player.removeTags("flap2");
			player.addTags("flap1");
		}
	} else if(caperot < 0) {
		caperot++;
	}
	player.obj._$["wingus-capeflap01"].rotate =
		player.obj._$["wingus-capeflap02"].rotate =
		player.obj._$["wingus-capestill"].rotate = caperot + 90;

	// wave every few seconds
	DEMO.wave++;
	if(DEMO.wave === 0) {
		player.addTags("wave");
	}
	if(DEMO.wave > 100) {
		DEMO.wave = -60;
	} else if(DEMO.wave > 80) {
		player.obj._$["wingus-backarm"].rotate+=1;
	} else if(DEMO.wave > 60) {
		player.obj._$["wingus-backarm"].rotate-=1;
	} else if(DEMO.wave > 40) {
		player.obj._$["wingus-backarm"].rotate+=1;
	} else if(DEMO.wave > 20) {
		player.obj._$["wingus-backarm"].rotate-=1;
	} else if(DEMO.wave > 0) {
		player.obj._$["wingus-backarm"].rotate+=4;
	} else if(tags.indexOf("wave") >= 0) {
		if(player.obj._$["wingus-backarm"].rotate > 0) {
			player.obj._$["wingus-backarm"].rotate-=3;
		} else {
			player.removeTags("wave");
			DEMO.wave = -60 - Math.floor(Math.random()*5 * 60);
		}
	}
}
function start() {
	console.log("start");
	var scene = new penduinSCENE(DEMO.canvas, DEMO.width, DEMO.height,
								 tick, 60);
	scene.showFPS(true);
	scene.addOBJ(DEMO.thing.player);
	scene.setBG("tan");
}

window.addEventListener("load", function() {
	DEMO.canvas = document.querySelector("#display");
	if(DEMO.json.player) {
		DEMO.thing.player = new penduinOBJ(DEMO.json.player, start);
		DEMO.thing.player.setTags("still");
	}
});
window.addEventListener("click", function() {
	if(DEMO.thing.player) {
		var tag = DEMO.thing.player.getTags()[0];
		DEMO.thing.player.removeTags(["move", "fast", "still",
									  "flap1", "flap2"]);
		if(tag === "still") {
			DEMO.thing.player.addTags(["move", "flap1"]);
			DEMO.wheelspeed = 10;
		} else if(tag === "move") {
			DEMO.thing.player.addTags(["fast", "flap1"]);
			DEMO.wheelspeed = 20;
		} else {
			DEMO.thing.player.addTags("still");
			DEMO.wheelspeed = 1;
		}
	}
});
