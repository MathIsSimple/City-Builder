function mousePressed() {
  if(mouseButton === "left") {
    if(GameState === 0) {
      GameState = 1;
      start_sound();
    } else if(GameState === 1) {
      if(gui.shop.selected == true && gui.shop.item_waiting_to_be_placed == true) {
        gui.shop.place_element();
      } else if(gui.shop.selected == true && gui.shop.item_waiting_to_be_placed == false) {
        gui.shop.pick_item();
      }
      let x = camera.revx(mouseX), y = camera.revy(mouseY);
      for (let i = 0; i < tiles.length; i ++) {
        let tx = tiles[i].x, ty = tiles[i].y;
        if(structures[tiles[i].i][10] === "Cannon") {
          if(tx + scl > x && tx < x) {
            if(ty + scl > y && ty < y) {
              if(tiles[i].show_range === true) {tiles[i].show_range = false;} else {tiles[i].show_range = true;}
            }
          }
          if(tiles[i].show_range === true) {
            let d = dist(tiles[i].x + scl / 2, tiles[i].y + scl / 2, x, y);
            print(d)
            if(d <= (tiles[i].range * scl) / 2) {
              for (let index = 0; index < creatures.length; index ++) {
                let cx = creatures[index].position.x, cy = creatures[index].position.y;
                if(cx <= x && cx + scl >= x) {
                  if(cy <= y && cy + scl >= y) {
                    creatures[index].health -= structures[tiles[i].i][15];
                  }
                }
              }
            }
          }
        }
      }
    }
  } else if(mouseButton === "right") {
    gui.action("m");
  }
}

function saveToServer() {
  if(GameState === 2) {
    let message = {
      username,
      "password": password,
      "delete": "true"
    }

    var xhr = new XMLHttpRequest();
    var url = "delete.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location = "index.html";
        }
    };
    var data = JSON.stringify(message);
    xhr.send(data);
  } else {
    let map = {
      "username": username,
      "password": password,
      "map": [],
      "health": [],
      "creatures_names": [],
      "creatures_positions": []
    }

    for (let i = 0; i < tiles.length; i ++) {
      map.map.push(tiles[i].i);
      map.health.push(tiles[i].health);
    }

    for (let i = 0; i < creatures.length; i ++) {
      map.creatures_names.push(CreatureTypes[creatures[i].index][0])
      map.creatures_positions.push([[creatures[i].position.x], [creatures[i].position.y]])
    }
    print(map.creatures_names)

    var xhr = new XMLHttpRequest();
    var url = "save.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify(map);
    xhr.send(data);
  }
}

function keyPressed() {
  if(GameState === 0) {
    GameState = 1;
    start_sound();
  } else if(GameState === 1) {
    diff = scl;
    if(gui.open === false) {
      let cx = 0, cy = 0;
      if(keyCode === UP_ARROW)    {cy = diff;}
      if(keyCode === DOWN_ARROW)  {cy = -diff;}
      if(keyCode === LEFT_ARROW)  {cx = diff;}
      if(keyCode === RIGHT_ARROW) {cx = -diff;}
      camera.move(cx, cy);
      if(keyCode === 82)          {
        let x = camera.revx(mouseX), y = camera.revy(mouseY);
        for (let i = 0; i < tiles.length; i ++) {
          let tx = tiles[i].x, ty = tiles[i].y;
          if(tx + scl > x && tx < x) {
            if(ty + scl > y && ty < y) {
              if(tiles[i].angle === 360) {tiles[i].angle = 90;} else {tiles[i].angle += 90;}
              break;
            }
          }
        }
      }
    } else if(gui.open === true && gui.shop.selected === true) {
      if(keyCode === UP_ARROW)    {gui.shop.scrollUp();}
      if(keyCode === DOWN_ARROW)  {gui.shop.scrollDown();}
    }
    if(keyCode === 77)            {gui.action("m");}
  }
}
