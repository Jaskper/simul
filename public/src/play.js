window.addEventListener('load',function(){
  /*var Q = Quintus().include("Sprites, Scenes, Input").setup({maximize: true});
  var Q = Quintus().include("Sprites").setup();
  */
  
  alert("Simul: Michael Bian - 2014\nRace against your friends to the finish line while avoiding the monsters.")
  
  var Q = Quintus()
        .include("Sprites, Scenes, Touch, Input, 2D, UI")
        .setup({scaleToFit: true,width: 1700, height:875})
        .controls().touch();
        
  var players = [];
  var monsters = [];
  var upgrades = [];
  
  var player;
  var socket = io.connect();
  var test = [
  [1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
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
  Q.gravityY = 0;

  
  Q.Sprite.extend("Player",{
    init: function(p) {
      this._super(p, { sheet: "player", x: 410, y: 90 });
      this.add('2d, platformerControls');
      this.on("hit.sprite",function(collision) {
        if(collision.obj.isA("Tower")) {
          //Q.stageScene("endGame",1, { label: "You Won!" }); 
          this.reset();
          socket.emit('reachedGoal', this.p.playerId);
        }
        
        
      });
    },
    
    step: function (dt) {
      if (Q.inputs['up']) {
        this.p.vy = -200;
      } else if (Q.inputs['down']) {
        this.p.vy = 200;
      } else if (!Q.inputs['down'] && !Q.inputs['up']) {
        this.p.vy = 0;
      }
      this.p.socket.emit('update', { playerId: this.p.playerId, x: this.p.x, y: this.p.y, sheet: this.p.sheet });
    },
    
    reset: function(){
      this.p.x = 100;
      this.p.y = 100;/*
      if(this.has("SpeedUpgrade")){
        this.p.speed = 200;
        this.p.sheet = 'player';
        this.del("SpeedUpgrade");
      }
      */
      this.show();
    }
  });
  
  Q.Sprite.extend("Tower", {
    init: function(p) {
      this._super(p, { sheet: 'tower' });
    }
  });
  
  Q.Sprite.extend("Enemy",{
    init: function(p) {
      this._super(p, { sheet: 'enemy', update: true});
      this.add('2d, aiBounce');
      
      this.on("bump.left,bump.right,bump.bottom,bump.top",function(collision) {
        
        if(collision.obj.isA("Player")){
          Q.stageScene("endGame",1, { label: "You Lose" }); 
        }
        /*
        if(collision.obj.isA("Player")) { 
          if(collision.obj.p.has("StrengthUpgrade")){
            this.destroy();
            socket.emit("monster_destroy", this.p.monsterId);
          }else{
            Q.stageScene("endGame",1, { label: "You Lose" }); 
          }
          
          Q.stageScene("endGame",1, { label: "You Lose" }); 
        */
      });
      
    },
    
    step: function(p){
      socket.emit('monsterUpdate',{vx: this.p.vx, x: this.p.x, y: this.p.y, monsterId: this.p.monsterId});
    }
  });
  
  Q.Sprite.extend('Actor', {
    init: function (p) {
      this._super(p, {
        sheet: 'actor',
        update: true
      });
   
      var temp = this;
      setInterval(function (){
        if (!temp.p.update) {
          Q.stage().remove(temp);
        }
        temp.p.update = false;
      }, 2000);
      
    }
  });
  /*
  Q.Sprite.extend('Speed',{
      init: function(p){
        this._super(p,{
          sheet: 'speed',
          update: true
        });
      this.add('2d, aiBounce');
      this.on("hit", function(collision){
        if(collision.obj.isA("Player")){
          socket.emit('takenUpgrade', this.p.upgradeId);
          this.destroy();
          collision.obj.p.speed = 400;
          collision.obj.p.sheet = 'speedPlayer';
          collision.obj.p.add("SpeedUpgrade");
          setTimeout(function(){
            collision.obj.p.speed = 200;
            collision.obj.p.sheet = 'player';
            collision.obj.p.del("SpeedUpgrade");
          },5000);
        }
        
      });

    }
  });
  
  Q.Sprite.extend('Strength',{
    init: function(p){
      this._super(p,{
        sheet: 'strength',
        update: true
      });
      this.add('2d, aiBounce');
      this.on("hit", function(collision){
        if(collision.obj.isA("Player")){
          socket.emit('takenUpgrade', this.p.upgradeId);
          this.destroy();
          collision.obj.p.sheet = 'strengthPlayer';
          collision.obj.p.add("StrengthUpgrade");
          setTimeout(function(){
            collision.obj.p.sheet = 'player';
            collision.obj.p.del("StrengthUpgrade");
          },5000);
        }
      });
      
    }
  });
  
  Q.component("StrengthUpgrade",{
    
  });
  
  Q.component("Seppuku", {
    commitSeppuku : function(){
      this.destroy();
    }
  });
  
  Q.component("SpeedUpgrade", {
    extend: {
        step: function (dt) {
        if (Q.inputs['up']) {
          this.p.vy = -400;
        } else if (Q.inputs['down']) {
          this.p.vy = 400;
        } else if (!Q.inputs['down'] && !Q.inputs['up']) {
          this.p.vy = 0;
        }
        this.p.socket.emit('update', { playerId: this.p.playerId, x: this.p.x, y: this.p.y, sheet: this.p.sheet });
      }
    }
  });
  */
  
  Q.TileLayer.extend('dynamicTileLayer', {
    load: function(dataAsset) {
      this.p.tiles = dataAsset;
    },
  });
  
  Q.scene("level1",function(stage) {
    var layer = new Q.dynamicTileLayer({ dataAsset: test, sheet: 'tiles' });
    stage.collisionLayer(layer);
    
    socket.on('updated', function (data) {
      var actor = players.filter(function (obj) {
        return obj.playerId == data.playerId;
      })[0];
      if (actor) {
        actor.player.show();
        actor.player.p.x = data.x;
        actor.player.p.y = data.y;
        actor.player.p.sheet = 'actor';
        actor.player.p.update = true;
      } else {
        var temp = new Q.Actor({ playerId: data.playerId, x: data.x, y: data.y, sheet: 'actor' });
        players.push({ player: temp, playerId: data.playerId });
        stage.insert(temp);
      }
    });
    
    socket.on('newMaze', function(mazeParams){
      player.reset();
      stage.collisionLayer(new Q.dynamicTileLayer({dataAsset: mazeParams, sheet: 'tiles'}));
      stage.remove(stage._collisionLayers[0]);
      stage._collisionLayers.shift();
    });
    
    socket.on('winnerMaze', function(data){
      player.reset();
      Q.stageScene("endGame",1, { label: "Player " + data.winner + " won!" });
      stage.collisionLayer(new Q.dynamicTileLayer({dataAsset: data.mazeParams, sheet: 'tiles'}));
      stage.remove(stage._collisionLayers[0]);
      stage._collisionLayers.shift();
    });
    
    socket.on('newMonsters', function(new_monsters){
      for (var monsterIndex = 0; monsterIndex<new_monsters.length; monsterIndex++){
        var monster = new_monsters[monsterIndex];
        var monsterObject = new Q.Enemy({monsterId: monster.monsterId, x:monster.x, y:monster.y, vx:monster.vx});
        stage.insert(monsterObject);
        monsters[monsterIndex] = monsterObject;
      }
    });
    
    socket.on('removeMonsters', function(new_monsters){
      for(var monsterIndex = 0; monsterIndex<monsters.length; monsterIndex++){
        stage.remove(monsters[monsterIndex]);
      }
    });
    /*
    socket.on('newUpgrades', function(upgradesArray){
      upgrades.length = 0;
      
      for(var i=0; i<upgradesArray.length; i++){
        var upgradeData = upgradesArray[i];
        if(upgradeData.type == 1){
          var tempSpeed = new Q.Speed({upgradeId: upgradeData.upgradeId, x: upgradeData.x, y: upgradeData.y, vx:1});
          upgrades.push(tempSpeed);
          stage.insert(tempSpeed);
          setTimeout(function(){
            resetUpgrades();
          },20);
        }
        if(upgradeData.type == 2){
          var tempStrength = new Q.Strength({upgradeId: upgradeData.upgradeId, x: upgradeData.x, y: upgradeData.y, vx:1});
          upgrades.push(tempStrength);
          stage.insert(tempStrength);
          setTimeout(function(){
            resetUpgrades();
          },20);
        }
      }
    });
    
    function resetUpgrades(){
      for(var i =0; i<upgrades.length;i++){
        upgrades[i].p.vx = 0;
      }
    }
    */
    socket.on('checkPlayers', function(playersArray){
      /*
      for(var playerIndex = 0; playerIndex <players.length; playerIndex++){
        stage.remove(players[playerIndex].player);
      }
      
      players.length = 0;
      console.log('After Removal ' + players.length);
      for(var playerIndex = 0; playerIndex <playersArray.length; playerIndex++){
        if(playersArray[playerIndex].playerId != player.p.playerId){
          var playerData = playersArray[playerIndex];
          var temp = new Q.Actor({ playerId: playerData.playerId, x: playerData.x, y: playerData.y, sheet: 'actor' });
          players.push({player: temp, playerId: temp.playerId});
        }
      }
      console.log('After Add ' + players.length);
      
      for(var playerIndex = 0; playerIndex < players.length; playerIndex++){
        stage.insert(players[playerIndex].player);
      }
      console.log('After Everythingnnnnn' + players.length);
      
      console.log("Before " + players.length);
      for(var yo = 0; yo<players.length; yo++){
        console.log(players[yo].playerId);
      }
      players.length = 0;
      
      for(var playerIndex = 0; playerIndex <playersArray.length; playerIndex++){
        if(player.p.playerId != playersArray[playerIndex].playerId){
          var actor = players.filter(function (obj) {
            return obj.playerId == playersArray[playerIndex].playerId;
          })[0];
          if (!actor) {
            var data = playersArray[playerIndex];
            var temp = new Q.Actor({ playerId: data.playerId, x: 100, y: 100, sheet: 'actor' });
            players[playerIndex] = { player: temp, playerId: data.playerId };
            //stage.insert(temp);
          }
        }
      }
      */
    
    });
    
    window.onblur = function(){
      socket.emit('blur', player.p.playerId);
      stage.remove(player);
    };
    
    window.onfocus = function(){
      socket.emit('focus', player.p.playerId);
      setTimeout(function(){
        stage.insert(player);
      }, 200);
    };
    
    socket.on('blurred', function(playerId){
      var actor = players.filter(function (obj) {
        return obj.playerId == playerId;
      })[0];
      if (actor) {
        stage.remove(actor.player);
      }
    });
    
    socket.on('focused', function(playerId){
      var actor = players.filter(function (obj) {
        return obj.playerId == playerId;
      })[0];
      if (actor) {
        stage.insert(actor.player);
      }
    });
    /*
    socket.on('removeUpgrade', function(upgradeId){
      var upgrade = upgrades.filter(function (obj) {
        return obj.p.upgradeId == upgradeId;
      })[0];
      if (upgrade) {
        upgrade.destroy();
      }
    });
    */
    socket.on('player_disconnect', function(playerId){
      var actor = players.filter(function (obj) {
        return obj.playerId == playerId;
      })[0];
      if (actor) {
        actor.player.destroy();
      }
    });
    
    stage.insert(new Q.Tower({x:1680, y:817}));
    //stage.insert(new Q.Strength({x:50, y: 50}));
  });

  Q.scene('endGame',function(stage) {
    player.hide();
    player.p.x = -1000;
    player.p.y = -1000;
    var box = stage.insert(new Q.UI.Container({
      x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
    }));

    var button = box.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                             label: "Play Again" })); 
    var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                             label: stage.options.label }));
    button.on("click",function() {
      stage.remove(button);
      stage.remove(label);
      stage.remove(box);
      player.reset();
    });
    box.fit(20);
  });
  
  Q.load("/src/images/betta.png, /src/images/sprites.json, /src/images/tiles.png", function() {
    Q.sheet("tiles","/src/images/tiles.png", { tilew: 32, tileh: 32 });
    Q.compileSheets("/src/images/betta.png","/src/images/sprites.json");
    
    socket.on('connected', function(id){
      player = new Q.Player({playerId: id, x:100, y:100, socket: socket});
      Q.stageScene("level1");
      Q.stage().insert(player);
      //Q.stage().add('viewport').centerOn(800,350);
    });
    

  });
  

});