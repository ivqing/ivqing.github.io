var c = document.getElementById("wall");
var cxt = c.getContext("2d");
var s = document.getElementById("score");

var snake_width = 20;
function init() {
	score = 0;
	x = snake_width;
	y = snake_width;
	snake_length = 2;
	route = []; 
	direction = 'right';
}
init();
var time = 160 ; // speed
var color = ['blue', 'yellow', 'cyan', 'yellow', 'silver', 'green', 'yellow', 'purple', 'yellow']

rand_food();
window.setInterval(game, time);

function game(){
	witch(direction){
		case 'up':y = y-snake_width;break;
		case 'right':x = x+snake_width;break;
		case 'left':x = x-snake_width;break;
		case 'down':y = y+snake_width;break;
	}

	function clear() {
		cxt.clearRect(food_position_x, food_position_y, snake_width, snake_width);
		for (var i=0; i<route.length; i++) {
			var x = route[i]['x'];
			var y = route[i]['y'];
			cxt.clearRect(x, y,  snake_width, snake_width);
		}
	}

	// margin check
	if(x>400 || y>200 || x<0 || y<0){
		clear();
		init();
		rand_food();
	}
	// eating self check
	for(var i=0;i<route.length;i++){
		if( parseInt(route[i].x)==x && parseInt(route[i].y)==y){
			clear();
			init();
			rand_food();
	s}
	}

	// eat food
	if((food_position_x)==x && (food_position_y)==y){ 
		snake_length++;
		rand_food();
		score += 1;
	}
	s.innerHTML = score;

	//draw snake
	if (route.length>snake_length) { 
		var cl = route.shift(); 
		cxt.clearRect(cl['x'], cl['y'], snake_width, snake_width);
	};
	route.push({'x':x,'y':y}); 
	cxt.fillStyle = "#006699";
	cxt.strokeStyle = "#006699";
	cxt.fillRect(x, y, snake_width, snake_width);

}
// keyboard_input_control
document.onkeydown = function(e) {
	var code = e.keyCode;
	switch(code){
		case 87 : direction = 'up';break;
		case 68 : direction = 'right';break;
		case 83 : direction = 'down';break;
		case 65 : direction = 'left';break;
	}
}

function inArray(obj, arr) {
	var i = arr.length;
	while(i --) {
		if (arr[i] === obj) {
			return true;
		}
	}
	return false;
}
function rand_food(){
	var i = Math.ceil(Math.random()*10);
	food_color = color[i];
	cxt.fillStyle = food_color;
	cxt.strokeStyle = food_color;
	food_position_x = Math.floor(Math.random()*((400/snake_width)))*snake_width;
	food_position_y = Math.floor(Math.random()*((200/snake_width)))*snake_width;
	if (inArray([food_position_x, food_position_y], route)) {// on the body
		food_position_x = Math.floor(Math.random()*((400/snake_width)))*snake_width;
		food_position_y = Math.floor(Math.random()*((200/snake_width)))*snake_width;
	}
	cxt.fillRect(food_position_x, food_position_y, snake_width, snake_width);
}

