var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');
    this.tileSize = this.map.tileWidth;

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    //this.map.addTilesetImage('tiles', 'gameTiles');
    this.map.addTilesetImage('dungeonTiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //create walkable grid
    this.grid = new Array(this.map.height);
    for(var i = 0; i < this.grid.length; i++){
      this.grid[i] = new Array(this.map.width);
      for(var j = 0; j < this.map.width; j++){
        var node = {
          y: i,
          x: j,
          g: Infinity,
          walkable: true
        };
        if(this.map.getTile(node.x, node.y, this.blockedLayer) != null){
          node.walkable = false;
        }
        this.grid[i][j] = node;
      }
    }
    this.path = null;
    this.showingPath = false;
    this.pathVelocity = 30;

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    //this.createItems();
    //this.createDoors();    

    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
    console.log(result)
    //this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'mantis');
    var walk = this.player.animations.add('walk');
    walk.speed = 10;
    this.game.physics.arcade.enable(this.player);
    this.player.anchor.setTo(0.5,0.5);
    this.player.initialPose = true;
    this.player.scale.setTo(0.125);
    //this.player.smoothed = false;
    this.player.x += this.player.width/2;
    this.player.y += this.player.height/2;

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },
  update: function() {
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer);

    //player movement
    
    
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    
    /*
    var maybeIdle = false;
    if(this.cursors.up.isDown) {
      if(this.player.body.velocity.y == 0)
      this.player.body.velocity.y -= 50;
      this.player.animations.play('walk');
    }
    else if(this.cursors.down.isDown) {
      if(this.player.body.velocity.y == 0)
      this.player.body.velocity.y += 50;
      this.player.animations.play('walk');
    }
    else {
      this.player.body.velocity.y = 0;
      maybeIdle = true;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 50;
      this.player.animations.play('walk');
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 50;
      this.player.animations.play('walk');
    }
    else{
      if(maybeIdle){
        this.player.animations.stop();
        this.player.frame = 0;
      }
    }*/

    if(this.game.input.activePointer.isDown){

      this.player.animations.play('walk');
      var gameX = this.game.input.activePointer.positionDown.x + this.game.camera.x;
      var gameY = this.game.input.activePointer.positionDown.y + this.game.camera.y;
      var clickedTile = this.map.getTileWorldXY(gameX, gameY, this.tileSize, this.tileSize, this.backgroundlayer);
      var spriteTile = this.map.getTileWorldXY(this.player.x, this.player.y, this.tileSize, this.tileSize, this.backgroundlayer);
      if(this.path != null){
        this.hidePath();
      }

      var possiblePath = this.pathfind(spriteTile,clickedTile);
      if(possiblePath == undefined || possiblePath == null){
        alert("Unreachable destination!");        
      }
      else{
        this.path = possiblePath;
        this.pathIndex = 0;
        this.walking = true;
      }
      if(this.showingPath) this.showPath();
    }
    
    //If press L, toggle path showing
    k = this.input.keyboard;
    if(k.isDown(76)){
      this.showingPath = this.showingPath ? false:true;
      if(!this.showingPath) {
        this.hidePath();
        alert("Hiding path");
      }
      if(this.showingPath) {
        this.showPath();
        alert("Showing path")
      }
    }

    //Press M to increase velocity
    if(k.isDown(77)){
      if(this.pathVelocity <= 495) this.pathVelocity += 5;
      console.log(this.pathVelocity);
    }

    //Press N to decrease velocity
    if(k.isDown(78)){
      if(this.pathVelocity > 5) this.pathVelocity -= 5;
      console.log(this.pathVelocity);
    }

    //rotation
    if(this.player.initialPose) {
      this.player.body.angle = Math.PI/2;
      this.player.initialPose = false;
    }
    else this.player.rotation = this.player.body.angle + (Math.PI/2);

    //walk the path
    if(this.walking == true && this.path != undefined && this.path != null){
      //alert("OK")
      this.walkPath();
    }
    else if (this.path != undefined && this.path != null){
      //snap back to the last node if we overshot it and stop lingering animation
      this.player.frame = 0;
      this.player.animations.stop();
      var lastNode = this.path[this.path.length-1];
      var lastTile = this.map.getTile(lastNode.x,lastNode.y,this.backgroundlayer);
      var snapX = lastTile.worldX + 0.5*this.tileSize;
      var snapY = lastTile.worldY + 0.5*this.tileSize;
      this.player.x = snapX;
      this.player.y = snapY;
    }

  },

  showPath: function(){
    if(this.path == null) return;
    for(var i = 0; i < this.path.length; i++){
      var currentTile = this.map.getTile(this.path[i].x,this.path[i].y,this.backgroundlayer);
      currentTile.alpha = 0;
      currentTile.dirty = true;
    }
    this.backgroundlayer.dirty = true;
  },

  hidePath: function(){
    if(this.path != null){
      for(var i = 0; i < this.path.length; i++){
        var currentTile = this.map.getTile(this.path[i].x,this.path[i].y,this.backgroundlayer);
        currentTile.alpha = 1;
        currentTile.dirty = true;
      }
    }
  },

  walkPath: function(){
    this.walking = true;
    this.player.animations.play('walk');
    //console.log(this.path);
    
    var next = this.path[this.pathIndex];
    var target = this.path[this.pathIndex];
    var targetTile = this.map.getTile(target.x,target.y,this.backgroundlayer);
    var targetX = targetTile.worldX + 0.5*this.tileSize;
    var targetY = targetTile.worldY + 0.5*this.tileSize;

    this.finishedNode = function(){
      //console.log(this.player.x);
      //console.log(this.player.y);
      this.player.x = targetX;
      this.player.y = targetY;
      if(this.pathIndex+1 < this.path.length){
        this.pathIndex++;
      }
      else{
        this.player.x = targetX;
        this.player.y = targetY;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.body.speed = 0;
        this.player.body.dirty = true;
        //console.log(this.player.body);
        this.walking = false;
      }
      return;
    }

    if(!next.hasOwnProperty('direction')){
      this.finishedNode();
    }
    switch(next.direction){
      case "NW":
        this.player.body.velocity.x = -this.pathVelocity/Math.sqrt(2);
        this.player.body.velocity.y = -this.pathVelocity/Math.sqrt(2);
        if(this.player.x <= targetX || this.player.y <= targetY){
          this.finishedNode();
        }
        break;
      case "N":
        if(this.player.x != targetX) this.player.x = targetX;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = -this.pathVelocity;
        if(this.player.y <= targetY){
          this.finishedNode();
        }
        break;
      case "NE":
        this.player.body.velocity.x = this.pathVelocity/Math.sqrt(2);
        this.player.body.velocity.y = -this.pathVelocity/Math.sqrt(2);
        if(this.player.x >= targetX || this.player.y <= targetY){
          this.finishedNode();
        }
        break;
      case "W":
        if(this.player.y != targetY) this.player.y = targetY;
        this.player.body.velocity.x = -this.pathVelocity;
        this.player.body.velocity.y = 0;
        if(this.player.x <= targetX){
          this.finishedNode();
          //console.log(this.player.x)
        }
        break;
      case "E":
        if(this.player.y != targetY) this.player.y = targetY;
        this.player.body.velocity.x = this.pathVelocity;
        this.player.body.velocity.y = 0;
        if(this.player.x >= targetX){
          this.finishedNode();
        }
        break;
      case "SW":
        this.player.body.velocity.x = -this.pathVelocity/Math.sqrt(2);
        this.player.body.velocity.y = this.pathVelocity/Math.sqrt(2);
        if(this.player.x <= targetX || this.player.y >= targetY){
          this.finishedNode();
        }
        break;
      case "SE":
        this.player.body.velocity.x = this.pathVelocity/Math.sqrt(2);
        this.player.body.velocity.y = this.pathVelocity/Math.sqrt(2);
        //console.log(this.player.x + " and " + targetX)
        if(this.player.x >= targetX || this.player.y >= targetY){
          this.finishedNode();
        }
        break;
      case "S":
        if(this.player.x != targetX) this.player.x = targetX;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = this.pathVelocity;
        if(this.player.y >= targetY){
          this.finishedNode();
        }
        break;
    }
  },

  pathfind: function(from, to){

    //initialize src and dst, add to open
    var src = this.grid[from.y][from.x];
    var dst = this.grid[to.y][to.x];
    var open = new Array();
    var closed = new Array();
    open.push(src);

    //function to compute distance between nodes
    function computeDistance(node1, node2){
      var xDiff = Math.abs(node1.x-node2.x);
      var yDiff = Math.abs(node1.y - node2.y);
      if(xDiff > yDiff){
        return yDiff*Math.sqrt(2) + (xDiff-yDiff)
      }
      else{
        return xDiff*Math.sqrt(2) + (yDiff-xDiff);
      }
    }

    //G cost = absolute distance from start
    //H cost = estimated distance to end (heuristic)
    //F cost = G + H
    src.g = 0;
    src.h = computeDistance(src,dst);
    src.f = src.h + src.g;
    src.parent = null;

    //loop while open is not empty
    while(open.length > 0){

      //find node in open with lowest f and h cost
      var current = open[0];
      for(var i = 1; i < open.length; i++){
        if(open[i].f <= current.f){
          if(open[i].f == current.f && open[i].h < current.h){
            current = open[i];
          }
          else current = open[i];
        }
      }

      //move chosen node to closed
      closed.push(current);
      open.splice(open.indexOf(current),1);

      //check if we have reached dst
      if(current == dst){
        var path = new Array();
        while(current != null){
          path.unshift(current);
          current = current.parent;
        }
        return path;
      }

      //add all unvisited and traversable neighbors to closed
      for(var i = -1; i <= 1; i++){
        for(var j = -1; j <= 1; j++){
          if(i == 0 && j == 0){
            continue;
          }
          else{
            var nX = current.x + i;
            var nY = current.y + j;
            if(nX < 0 || nX >= this.map.width || nY < 0 || nY >= this.map.height){
              continue;
            }
            var neighbor = this.grid[nY][nX];
            //if the block is in the blocked layer, or we have already found the shortest path to it, skip
            if(!neighbor.walkable || closed.includes(neighbor)){
              //console.log(neighbor);
              continue;
            }

            //LITERAL CORNER CASE: Physics engine says we cant cut corners around obstacles 
            if(i == -1){
              var west = this.grid[current.y][current.x-1];
              if(!west.walkable) continue;
            }
            else if(i == 1){
              var east = this.grid[current.y][current.x+1];
              if(!east.walkable) {
                continue;
              }
            }
            if(j == -1){
              var north = this.grid[current.y-1][current.x];
              if(!north.walkable) continue;
            }
            else if(j == 1){
              var south = this.grid[current.y+1][current.x];
              if(!south.walkable) continue;
            }

            //else{
              var newG = current.g + computeDistance(neighbor,current);
              var newH = computeDistance(neighbor,dst);
              var newF = newG + newH;
              //check if the new path to the neighbor is shorter
              if(!open.includes(neighbor) || newG < neighbor.g){
                //if so, recompute variables
                neighbor.g = newG;
                neighbor.h = newH;
                neighbor.f = newF;
                neighbor.parent = current;
                //compute direction it came from
                if(i == -1 && j == -1) neighbor.direction = "NW";
                else if(i == -1 && j == 0) neighbor.direction = "W";
                else if(i == -1 && j == 1) neighbor.direction = "SW";
                else if(i == 0 && j == -1) neighbor.direction = "N";
                else if(i == 0 && j == 1){
                  neighbor.direction = "S";
                }
                else if(i == 1 && j == -1) neighbor.direction = "NE";
                else if(i == 1 && j == 0) neighbor.direction = "E";
                else if (i == 1 && j == 1) neighbor.direction = "SE";
                //push to open set if not already there
                if(!open.includes(neighbor)){
                  open.push(neighbor);
                }
              }
            //}
          }
        }
      }

    }
  }

  /*
  collect: function(player, collectable) {
    console.log('yummy!');

    //remove sprite
    collectable.destroy();
  },
  enterDoor: function(player, door) {
    console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
  },*/
};