function Creature(x, y, index) {
  this.init = function(x, y, index) {
    this.position = new p5.Vector(x, y); this.index = index;  this.damage = CreatureTypes[index][2];
    this.alive = true; this.health = CreatureTypes[index][3]; this.range = CreatureTypes[index][4] * scl;
  }
  this.render = function() {
    if(this.alive === true) {
      push();
        translate(camera.getx(this.position.x), camera.gety(this.position.y));
        image(creature_images[this.index], 0, 0, scl, scl);
      pop();
    }
  }
  this.update = function() {
    let self = this;
    if(this.alive === true) {
      if(this.health <= 0) {this.alive = false;}
      else {// LOOK IF IN RANGE OF TILE WITH HEALTH
        let chose = false, viable_closest_tile = false, closest_tile_distance = 10000, closest_tile_index = 0;
        loopTiles(function(tile, index) {
          let a = self.position.x + scl / 2, b = self.position.y + scl / 2;
          let c = tile.x + scl / 2, d = tile.y + scl / 2;
          let distance = dist(a, b, c, d);
          if(chose === false) {
            if(distance <= self.range && tile.health > 0) {
              chose = true;
              self.attack(index);
            } else if(distance < closest_tile_distance && tile.health > 0) {
              closest_tile_distance = distance;
              closest_tile_index = index;
              viable_closest_tile = true;
            }
          }
        });
        if(chose === false && viable_closest_tile === true) {
          self.moveTo(tiles[closest_tile_index].x + scl / 2, tiles[closest_tile_index].y + scl / 2, closest_tile_distance);
        }
      }
    }
  }
  this.attack = function(index) {
    tiles[index].health -= this.damage;
    if(tiles[index].health <= 0) {tiles[index].initVariables(12);}
  }
  this.moveTo = function(Tox, Toy, distance) {
    let Cx = this.position.x + scl / 2, Cy = this.position.y + scl / 2;
    let ydist = Toy - Cy, xdist = Cx - Tox;
    let angle = findAngle(xdist, ydist);
    let v = new p5.Vector.fromAngle(angle).mult(2);
    this.position.add(v);
  }
  this.init(x, y, index);
}

function loopCreatures(callback) {
  for (let i = 0; i < creatures.length; i ++) {
    callback(i);
  }
}
