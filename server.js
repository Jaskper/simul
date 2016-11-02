var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);
    
var id = 0;
var test;
var initial = true;

var monsters = [{monsterId: 1, x: 100, y:150, vx:100}, {monsterId:2, x: 300, y:300, vx:100}, {monsterId:3, x:500, y: 500, vx:-100}, {monsterId:4, x:800, y: 600, vx: -100}, {monsterId:5, x:1500, y:550, vx: 100}, {monsterId:6, x:1300, y:200, vx:100}];
var players = [];
var upgrades = [{upgradeId: 1, x: 50, y:50, vx: 0, type: 1},{upgradeId: 2, x: 200, y: 200, vx: 0, type: 1},{upgradeId: 3, x: 75, y:75, vx: 0, type:2},{upgradeId: 4, x: 300, y:300, vx: 0, type:2}];
// 1: Speed
// 2: Strength

var mazeParams = [[1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];
app.use(express.static(__dirname + '/public'));

function maze(x,y) {
	var n=x*y-1;
	if (n<0) {alert("illegal maze dimensions");return;}
	var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [];
	var verti =[]; for (var j= 0; j<x+1; j++) verti[j]= [];
    var here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
	var path = [here];
	var unvisited = [];
	for (var j = 0; j<x+2; j++) {
		unvisited[j] = [];
		for (var k= 0; k<y+1; k++)
			unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
	}
	while (0<n) {
		var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
		    [here[0]-1, here[1]], [here[0],here[1]-1]];
		var neighbors = [];
		for (var j = 0; j < 4; j++)
			if (unvisited[potential[j][0]+1][potential[j][1]+1])
				neighbors.push(potential[j]);
		if (neighbors.length) {
			n = n-1;
			var next= neighbors[Math.floor(Math.random()*neighbors.length)];
			unvisited[next[0]+1][next[1]+1]= false;
			if (next[0] == here[0])
				horiz[next[0]][(next[1]+here[1]-1)/2]= true;
			else 
				verti[(next[0]+here[0]-1)/2][next[1]]= true;
			path.push(here = next);
		} else 
			here = path.pop();
	}
	return {x: x, y: y, horiz: horiz, verti: verti};
}
 
function display(m) {
	var text= [];
	for (var j= 0; j<m.x*2+1; j++) {
		var line= [];
		if (0 == j%2)
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4) 
					line[k]= 1;
				else
					if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
						line[k]= 0;
					else
						line[k]= 1;
		else
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4)
					if (k>0 && m.horiz[(j-1)/2][k/4-1])
						line[k]= 0;
					else
						line[k]= 1;
				else
					line[k]= 0;
		if (0 == j) line[1]= line[2]= line[3]= 1;
		if (m.x*2-1 == j) line[4*m.y]= 0;
		text.push(line);
	}
	return text;
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/play', function(req,res){
  res.sendFile(__dirname + '/public/play.html');
});

io.on('connection', function(socket){
  console.log('connection');
  id++;
  var currentId = id;
  
  socket.on('reachedGoal', function(id){
    var numEnemies = Math.floor((Math.random()*10)  + 5);
    monsters.length = 0;
    for(var i = 1; i<numEnemies + 2; i++){
      var currentEnemy = {
        monsterId: i,
        x: Math.floor((Math.random()*1200 + 100)),
        y: Math.floor((Math.random()*700 + 100)),
        vx: ((Math.random()<0.5) ? 100 : -100)
      };
      monsters.push(currentEnemy);
    }
    
    console.log("Player " + id + " won");
    mazeParams = display(maze(13,13));
    io.sockets.emit('winnerMaze',{mazeParams: mazeParams, winner:id});
    io.sockets.emit('removeMonsters');
	  	setTimeout(function(){
	  		io.sockets.emit('newMonsters',monsters);
	    },15);
  });
  
  socket.on('monsterUpdate', function(data){
    var currentMonster = {monsterId: data.monsterId, y: data.y, x:data.x, vx: data.vx};
 		monsters[currentMonster.monsterId - 1] = currentMonster;
  });
  
  setTimeout(function(){
    socket.emit('connected', id);
    players.push({playerId: id, x:100, y:100, sheet: 'player'});
    setTimeout(function(){
      socket.emit('newMaze', mazeParams);
      socket.emit('newMonsters',monsters);
      socket.emit('newUpgrades', upgrades);
    },250);
  }, 1500);
  
  if(initial == true){
	  setInterval(function(){
	  	io.sockets.emit('removeMonsters');
	  	setTimeout(function(){
	  		io.sockets.emit('newMonsters',monsters);
	    },15);
	  }, 10000);
	  initial = false;
  }
  
  socket.on('blur', function(blurId){
  	socket.broadcast.emit('blurred', blurId);
  	console.log(blurId);
  });
  
  socket.on('takenUpgrade', function(upgradeId){
     for(var i=0;i<upgrades.length;i++){
         if(upgrades[i].upgradeId == upgradeId){
             upgrades.splice(i,1);
         }
     }
     socket.broadcast.emit('removeUpgrade', upgradeId);
  });
  
  socket.on('focus', function(focusId){
     console.log('wassup');
  	socket.broadcast.emit('focused', focusId);
  });
  
  socket.on('update', function (data) {
  	for(var currentPlayer = 0; currentPlayer < players.length; currentPlayer++){
  		if(players[currentPlayer].playerId == currentId){
  			players.splice(currentPlayer, 1, data);
  		}
  	}
    socket.broadcast.emit('updated', data);
  });
  
  socket.on('disconnect', function(){
  	for(var currentPlayer = 0; currentPlayer < players.length; currentPlayer++){
  		if(players[currentPlayer].playerId == currentId){
  			players.splice(currentPlayer, 1);
  		}
  	}
  	io.sockets.emit('player_disconnect', currentPlayer);
  });
  
  socket.on("monster_destroy", function(monsterId){
    for(var currentMonster = 0; currentMonster < monsters.length; currentMonster++){
      if(monsters[currentMonster].monsterId == monsterId){
        players.splice(currentMonster,1);
      }
    }
    console.log('hh');
  });

});

http.listen(process.env.PORT, process.env.IP);