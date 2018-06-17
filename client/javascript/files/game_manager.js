function renderGame() {
  if(GameState === 0) {
    cursor(HAND); textAlign(CENTER); fill(255); textSize(80); text("PLAY", width / 2, height / 2 + 1 / 4 * 80);
  } else if(GameState === 1) {
    difficulty.inc(); cursor(ARROW); camera.update();
    let sx = 0, sy = 0;
    for (let i = 0; i < tiles.length; i ++) {
      tiles[i].render();
      tx = camera.getx(tiles[i].x); ty = camera.gety(tiles[i].y);
      if(tx < mouseX && tx + scl > mouseX) {
        if(ty < mouseY && ty + scl > mouseY) {
          sx = tx; sy = ty;
        }
      }
    }
    for (let i = 0; i < tiles.length; i ++) {
      tiles[i].render_range();
    }

    for (let i = 0; i < creatures.length; i ++) {
      creatures[i].render();
      creatures[i].update();
    }

    selection.xonscreen = sx; selection.yonscreen = sy;
    selection.render(); resources.do_its_thing();
    gui.render();
  } else if(GameState === 2) {
    cursor(HAND); textAlign(CENTER); fill(255); textSize(80);
      text("You've Lost", width / 2, height / 2 + 1 / 4 * 80);
      textSize(40);
      reason = "";
      if(resources.population < resources.pop_required) {
        reason = "Not All The Jobs Were filled !";
      } else if(resources.electricity < 0) {
        reason = "Out of Electricity !";
      } else {
        reason = "Out Of Water !";
      }
      text("Reason : "+reason, width / 2, height / 2 + 1 / 4 * 80 + 50)
  }
}

window.onresize = function() {
  min_w = 1017; min_h = 663;
  w = min_w; h = min_h;
  if(window.innerWidth >= min_w && window.innerHeight >= min_h) {
    w = window.innerWidth; h = window.innerHeight;
  } else {
    if(window.innerWidth  < min_w) {h = window.innerHeight;}
    if(window.innerHeight < min_h) {w = window.innerWidth;}
  }
  resizeCanvas(w, h);
  gui.w = window.innerWidth-50*2; gui.h = window.innerHeight;
};

function endGame() {
  GameState = 2;
}
