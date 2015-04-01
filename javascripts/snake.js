var c = document.getElementById("wall");
var cxt = c.getContext("2d");
var s = document.getElementById("score");
var score = 0;
var time = 160 ; // speed
var snake_width = 20;
var x = snake_width;
var y = snake_width;
var snake_length = 2;
var route = []; 
var direction = 'right';
var color = ['blue', 'yellow', 'cyan', 'yellow', 'siver', 'green', 'yellow', 'purple', 'yellow']

rand_food();
window.setInterval(game, time);

function game(){
	switch(direction){
		case 'up':y = y-snake_width;break;
		case 'right':x = x+snake_width;break;
		case 'left':x = x-snake_width;break;
		case 'down':y = y+snake_width;break;
	}
	// margin check
	if(x>400 || y>200 || x<0 || y<0){
		window.location.reload();
	}
	// eating self check
	for(var i=0;i<route.length;i++){
		if( parseInt(route[i].x)==x && parseInt(route[i].y)==y){
			window.location.reload();
		}
	}
	//draw snake
	if (route.length>snake_length) { 
		var cl = route.shift(); 
		cxt.clearRect(cl['x'], cl['y'], snake_width, snake_width);
	};
	route.push({'x':x,'y':y}); 
	cxt.fillStyle = "#006699";
	cxt.strokeStyle = "#006699";
	cxt.fillRect(x, y, snake_width, snake_width);
	// eat food
	if((food_position_x)==x && (food_position_y)==y){ 
		snake_length++;
		rand_food();
		score += 1;
	}
	s.innerHTML = score;
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

function rand_food(){
	var i = Math.ceil(Math.random()*10);
	food_color = color[i];
	food_position_x = Math.ceil(Math.random()*(400/snake_width))*snake_width;
	food_position_y = Math.ceil(Math.random()*(200/snake_width))*snake_width;
	cxt.fillStyle = food_color;
	cxt.strokeStyle = food_color;
	while (route.indexOf([food_position_x, food_position_y]) != -1) { // on the body
		food_position_x = Math.ceil(Math.random()*(400/snake_width))*snake_width;
		food_position_y = Math.ceil(Math.random()*(200/snake_width))*snake_width;
		}
	cxt.fillRect(food_position_x, food_position_y, snake_width, snake_width);
}

