function Difficulty() {
  this.difficulty = 0; this.wave_number = 1; this.dif2 = false;
  this.inc = function() {
    this.difficulty += 0.005;
    if(this.difficulty > 15 && this.dif2 === false) {
      let number_of_creatures = this.wave_number * 2, tile;
      creatures = new Array(number_of_creatures);
      for (let i = 0; i < creatures.length; i ++) {
        let good = false, tries = 0;
        while (good === false) {
          tile = random(tiles);
          if(tile.i === 0) {good = true;}
          tries ++;
          if(tries >= tiles.length) {break;}
        }
        creatures[i] = new Creature(tile.x, tile.y, 0);
      }
      this.dif2 = true;
    }
  }
}
