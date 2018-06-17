function object_render(x, y, rgb, index, s, a) {
  let Tsize = scl; if(s) {Tsize = s;}
  let Ta = 0;
  if(a > 0) {Ta = a;}
  push();
    translate(camera.getx(x) + Tsize / 2, camera.gety(y) + Tsize / 2);
    angleMode(DEGREES); rotate(Ta);
    stroke(0); strokeWeight(0.25); fill(rgb[0], rgb[1], rgb[2]);
    rect(-Tsize / 2, -Tsize / 2, Tsize, Tsize);
    if(structures[index][2] === 0) {
      image(grass_img, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
    } else if(structures[index][2] === 1) {
      image(solar_panel, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
    } else if(structures[index][2] === 2)  {
      image(grass_img, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
      image(house_img, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
    } else if(structures[index][2] === 3)  {
      stroke(251, 197, 49); strokeWeight(2);
        line(-Tsize / 2,   -Tsize / 2+1, Tsize / 2,    -Tsize / 2+1);
        line(-Tsize / 2,   Tsize / 2-1,  Tsize / 2,    Tsize / 2-1);
        line(-Tsize / 2+1, -Tsize / 2,   -Tsize / 2+1, Tsize / 2);
        line(Tsize / 2-1,  -Tsize / 2,   Tsize / 2-1,  Tsize / 2);
      fill(251, 197, 49); textAlign(CENTER); textSize(scl / 1.5);
        text("B", 0, 0 + 1/4*scl);
    } else if(structures[index][2] === 5)  {
      noStroke();
        image(grass_img, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
        image(road_img, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
    } else if(structures[index][2] === 6)  {
      noStroke(); image(lmart_img, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
    } else if(structures[index][2] === 7)  {
      noStroke(); ellipseMode(CENTER);
        fill(213, 221, 234); ellipse(0, 0, Tsize, Tsize);
        fill(94, 216, 249);  ellipse(0, 0, 0.8 * Tsize, 0.8 * Tsize);
    } else if(structures[index][2] === 8)  {
      noStroke(); ellipseMode(CENTER);
        image(bg_img, -Tsize / 2, 0, Tsize, Tsize / 2)
        fill(255, 255, 255);
          rect(-Tsize / 2, -Tsize / 2 + Tsize / 8, Tsize, Tsize / 2 - Tsize / 8);
          ellipse(0, Tsize / 4, Tsize / 8, Tsize / 8);
    } else if(structures[index][2] === 9)  {
      noStroke();
        image(grass_img, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
        image(road_img, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
        rotate(90);
          image(road_img, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
    } else if(structures[index][2] === 10) {
      noStroke(); fill(255, 255, 255); ellipseMode(CENTER);
        ellipse(0, 0, Tsize / 3, Tsize / 3);
        rect(-Tsize / 3, -Tsize / 12 + Tsize / 12 / 2, Tsize / 3.5, Tsize / 12);
        rect(0, -Tsize / 12 + Tsize / 12 / 2, Tsize / 3, Tsize / 12);
    } else if(structures[index][2] === 11) {
      stroke(255); strokeWeight(1.5); fill(53, 59, 72);
        image(grass_img, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
        ellipse(0, 0, Tsize / 1.5, Tsize / 1.5);
    } else if(structures[index][2] === 12) {
      image(destruction_img, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
    } else if(structures[index][2] === 13) {
      image(road2_img, -Tsize / 2, -Tsize / 2, Tsize, Tsize);
    }
  pop();
}

function tile(x, y, index, health) {
  let r = structures[index][3], g = structures[index][4], b = structures[index][5];
  this.x = x; this.y = y; this.i = index; this.rgb = [r, g, b];
  this.angle = 0; this.contained_energy = 0; this.contained_people = 0; this.contained_water = 0;
  this.show_range = false; this.range = 0; this.health = health;
  this.initVariables = function(index) {
    this.contained_energy = 0; this.angle = 0; this.contained_people = 0; this.contained_water = 0; this.range = structures[index][13];
    this.health = structures[index][14];
    if(structures[index][10] === "People Container") {this.contained_people = structures[index][9];}
  }
  this.render = function() {
    if(this.health > 0 || this.i === 0 || this.i === 12) {
      object_render(this.x, this.y, this.rgb, this.i, 0, this.angle);
    } else {
      this.i = 12;
    }
  }
  this.render_range = function() {
    push();
      translate(camera.getx(this.x) + scl / 2, camera.gety(y) + scl / 2);
      let ydist  = (camera.gety(this.y) + scl / 2 - mouseY);
      let xdist  = (mouseX - camera.getx(this.x) + scl / 2);
      rotate(findAngle(xdist, ydist));
      if(this.show_range === true && this.range != 0 && this.i === 11) {
        stroke(255); strokeWeight(4); noFill(); ellipseMode(CENTER);
          ellipse(0, 0, this.range*scl, this.range*scl);
      }
      if(this.i === 11) {
        fill(this.rgb[0], this.rgb[1], this.rgb[2]); stroke(255); strokeWeight(2.5);
          rect(-scl / 10 / 2, -scl / 2, scl / 10, scl / 2);
      }
    pop();
  }
  this.modify = function(index) {
    this.i = index; this.rgb = [structures[index][3], structures[index][4], structures[index][5]];
    this.initVariables(index);
  }
  this.initVariables(index);
}

function findAngle(xdist, ydist) {
  let angle = atan(ydist / xdist);
  if(xdist > 0) {angle = 90 - angle;} else {angle = 270 - angle;}
  return angle;
}

function loopTiles(callback) {
  for (let i = 0; i < tiles.length; i ++) {
    callback(tiles[i], i);
  }
}

function delete_tile(bx, by) {
  let x = camera.revx(bx), y = camera.revy(by);
  loopTiles(function(tile, index) {
    let tx = tile.x, ty = tile.y;
    if(tx + scl > x && tx < x) {
      if(ty + scl > y && ty < y) {
        tiles[index].modify(4);
      }
    }
  });
}
