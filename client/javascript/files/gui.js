function Shop() {
  this.selected = true; this.item_waiting_to_be_placed = false; this.item_index = 0; this.yoffset = 0;
  this.render = function() {
    if(this.selected == true) {
      let x = gui.x, y = gui.y + this.yoffset, s = gui.h / 5;
      for(let i = 0; i < structures.length; i ++) {
        if(y >= gui.y && y + s <= gui.y + gui.h) {
          rgb = [structures[i][3], structures[i][4], structures[i][5]];
          object_render(camera.revx(x), camera.revy(y), rgb, i, s);
          fill(47, 53, 66); textSize(20); textAlign(LEFT); strokeWeight(2);
          text(structures[i][0], x + s + 15, y + s / 2 + 20 / 4);
          stroke(47, 53, 66); line(x, y + s, x + gui.w, y + s);
          textAlign(LEFT); textSize(15);
            let tx = gui.x + gui.w - 1 / 5*gui.w; let ty = y + s / 2 - 1/4*s; let diff = 2.5;
              text("Type of Energy : " + structures[i][7], gui.x + gui.w - 1/5*gui.w, y + s / 2 - 1/4*s + diff);
              text("Yield : " + structures[i][6], tx, ty + 1 / 4 * s + 2*diff);
              text("Use of Energy : " + structures[i][8], tx, ty + 2 / 4 * s + 3*diff);
            tx -= 1.5 / 5*gui.w;
              text("Type of Structure : " + structures[i][10], tx, y + s / 2 - 1/4*s + diff);
              text("max Pop. / Capacity : " + structures[i][9], tx, ty + 1 / 4 * s + 1*diff);
              text("Price : " + structures[i][1] + " €", tx, ty + 2 / 4 * s + 3*diff);
            tx -= 1 / 5*gui.w
              text("Required Workers : " + structures[i][11], tx, y + s / 2 - 1/4*s + diff);
              text("Water Use : " + structures[i][12], tx, ty + 1 / 4 * s + 1*diff);
              text("Health : " + structures[i][14], tx, ty + 2 / 4 * s + 3*diff);
        }
        y += s;
      }
      fill(255); line(gui.x, gui.y, gui.x + gui.w, gui.y); line(gui.x + s, gui.y, gui.x + s, gui.y + gui.h);
    }
    fill(255); line(gui.x, gui.y, gui.x, gui.y + gui.h); line(gui.x + gui.w, gui.y, gui.x + gui.w, gui.y + gui.h);
  }
  this.scrollUp = function()   {if(this.yoffset <= -scl) {this.yoffset += gui.h / 5;}}
  this.scrollDown = function() {this.yoffset -= gui.h / 5;}
  this.pick_item = function() {
    let x = gui.x, y = gui.y + this.yoffset, s = gui.h / 5;
    for(let i = 0; i < structures.length; i ++) {
      if(x + s > mouseX && x < mouseX) {
        if(y + s > mouseY && y < mouseY) {
          let price = structures[i][1], nw = structures[i][11];
          if(resources.money - price >= 0 && resources.freeWorkers >= nw) {resources.money -= price; this.item_index = i; this.item_waiting_to_be_placed = true; gui.open = false;}
          break;
        }
      }
      y += s;
    }
  }
  this.place_element = function() {
    for(let i = 0; i < tiles.length; i ++) {
      let tx = tiles[i].x; let ty = tiles[i].y;
      if(tx + scl > camera.revx(mouseX) && tx < camera.revx(mouseX)) {
        if(ty + scl > camera.revy(mouseY) && ty < camera.revy(mouseY)) {
          if(tiles[i].i === 0 || tiles[i].i === 4) {
            tiles[i].i = this.item_index; this.item_waiting_to_be_placed = false; gui.open = false;
            tiles[i].modify(this.item_index);
          }
          break;
        }
      }
    }
  }
}

function Gui() {
  this.w = width-50*2; this.h = height-50*2; this.x = 50; this.y = 50; this.open = false;
  this.shop = new Shop();
  this.render = function() {
    if(this.open == true) {
      image(shop_bg, this.x, this.y, this.w, this.h);
      this.shop.render();
    }
  }
  this.action = function(action) {
    if(action === "m") {if(this.open == true) {this.open = false;} else {this.open = true;}}
  }
}
