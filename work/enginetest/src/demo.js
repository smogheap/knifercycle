DEMO = {
	canvas: null,
	width: 1920,
	height: 1080,
	json: {},
	thing: {},
	wheelspeed: 1
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


function tick() {
//	DEMO.thing.knifercycle.x+=2;
//	DEMO.thing.knifercycle.y+=2;

	DEMO.thing.knifercycle.x = 1000;
	DEMO.thing.knifercycle.y = 500;

	if(DEMO.thing.knifercycle.x > DEMO.width) {
		DEMO.thing.knifercycle.x = 0;
	}
	if(DEMO.thing.knifercycle.y > DEMO.height) {
		DEMO.thing.knifercycle.y = 0;
	}
	DEMO.thing.knifercycle.obj._$.wheel02.rotate -= DEMO.wheelspeed;
	DEMO.thing.knifercycle.obj._$.wheel04.rotate -= DEMO.wheelspeed;
	DEMO.thing.knifercycle.obj._$.wheel02move.rotate -= DEMO.wheelspeed;
	DEMO.thing.knifercycle.obj._$.wheel04move.rotate -= DEMO.wheelspeed;
	DEMO.thing.knifercycle.obj._$.wheel02fast.rotate -= DEMO.wheelspeed;
	DEMO.thing.knifercycle.obj._$.wheel04fast.rotate -= DEMO.wheelspeed;
}

function start() {
	console.log("start");
	var scene = new penduinSCENE(DEMO.canvas, DEMO.width, DEMO.height,
								 tick, 60);
	scene.showFPS(true);
	scene.addOBJ(DEMO.thing.knifercycle);
	scene.setBG("teal");
}


window.addEventListener("load", function() {
	// init globals
	DEMO.canvas = document.querySelector("#display");

	if(DEMO.json.knifercycle) {
		DEMO.thing.knifercycle = new penduinOBJ(DEMO.json.knifercycle, start);
		DEMO.thing.knifercycle.setTags("still");
	}
});

window.addEventListener("click", function() {
	if(DEMO.thing.knifercycle) {
		var tag = DEMO.thing.knifercycle.getTags()[0];
		console.log(tag);
		if(tag === "still") {
			DEMO.thing.knifercycle.setTags("move");
			DEMO.wheelspeed = 10;
		} else if(tag === "move") {
			DEMO.thing.knifercycle.setTags("fast");
			DEMO.wheelspeed = 20;
		} else {
			DEMO.thing.knifercycle.setTags("still");
			DEMO.wheelspeed = 1;
		}
	}
});
