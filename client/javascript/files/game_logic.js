function Camera() {
  this.xoffset = 487.5; this.yoffset = 250; this.dx = 0; this.dy = 0;
  this.getx   = function(x)      {return x+this.xoffset;}
  this.gety   = function(y)      {return y+this.yoffset;}
  this.revx   = function(x)      {return x-this.xoffset;}
  this.revy   = function(y)      {return y-this.yoffset;}
  this.move   = function(dx, dy) {
    this.dx += dx; this.dy += dy;
    if(dx % 5 != 0 || dy % 5 != 0) {
      print("error moving, dx or dy isn't a multiple of 2");
    }
  }
  this.update = function()       {
    let diff = 5;
    if(this.dx != 0) {
      if(this.dx < 0) {
        this.xoffset -= diff;
        this.dx += diff;
      } else if(this.dx > 0) {
        this.xoffset += diff;
        this.dx -= diff;
      }
    }
    if(this.dy != 0) {
      if(this.dy < 0) {
        this.yoffset -= diff;
        this.dy += diff;
      } else if(this.dy > 0) {
        this.yoffset += diff;
        this.dy -= diff;
      }
    }
  }
}

function Selection() {
  this.xonscreen = 0, this.yonscreen = 0, this.visible = true;
  this.render = function() {
    if(this.visible == true) {
      stroke(0); strokeWeight(2); noFill(); rect(this.xonscreen, this.yonscreen, scl, scl);
    }
  }
}

function Resources() {
  this.money = 10000; this.electricity = 0; this.frames = 0; this.population = 0; this.water = 10;
  this.freeWorkers = 0;
  this.do_its_thing = function() {
    this.render(); this.update();
  }
  this.render = function() {
    stroke(0); strokeWeight(1); textAlign(CENTER); textSize(scl/2);
      image(gui1, width-3*scl, 0, 3*scl, scl);
    fill(255); text("€", width-3*scl+scl/2, scl / 1.5);
    fill(255); text(this.money, width-2*scl+scl/2, scl / 1.5);
    image(gui1, 0, 0, 3*scl, scl);
    fill(255); text("Elec.", scl / 2 + 10, scl / 1.5);
    fill(255); text(this.electricity, 2*scl, scl / 1.5);
    stroke(0); strokeWeight(1); image(gui1, 3*scl, 0, 3*scl, scl);
    fill(255); text("Pop.", scl / 2 + 10 + 3*scl, scl / 1.5);
    fill(255); text(this.population, 2*scl+3*scl, scl / 1.5);
    image(gui1, 6*scl, 0, 3*scl, scl);
    fill(255); text("Water", scl / 2 + 15 + 6*scl, scl / 1.5);
    fill(255); text(this.water, 2*scl+6*scl, scl / 1.5);
    image(gui1, 9*scl, 0, 5*scl, scl);
    fill(255); textAlign(LEFT);
      text("Free Workers", 9*scl + 10, scl / 1.5);
      textAlign(CENTER); text(this.freeWorkers, 13*scl, scl / 1.5);
  }
  this.update = function() {
    let elec = 0, Battery_index = 3, total_electricity_usage = 0, pop = 0, pop_required = 0, water = 0;
    let total_water_usage = 0; this.pop_required = 0;
    for (let i = 0; i < tiles.length; i ++) {
      elec += tiles[i].contained_energy;
      total_electricity_usage += structures[tiles[i].i][8];
      pop += tiles[i].contained_people;
      pop_required += structures[tiles[i].i][11];
      water += tiles[i].contained_water;
      total_water_usage += structures[tiles[i].i][12];
    }
    this.electricity = elec; this.population = pop; this.water = water; this.freeWorkers = this.population - pop_required;
    if(this.frames <= 30*day_in_secconds) {this.frames ++;} else {
      this.frames = 0; this.electricity -= total_electricity_usage;
      let total_to_be_removed = total_electricity_usage;
      let total_water_to_be_removed = total_water_usage;
      let SolarPanelIndex = 1; GeneratedElectricity = 0; GeneratedWater = 0;
      for (let i = 0; i < tiles.length; i ++) {
        if(structures[tiles[i].i][10] === "Electricity Container") {
          electricity_able_to_remove = tiles[i].contained_energy;
          electricity_to_remove = 0;
          if(electricity_able_to_remove >= total_to_be_removed) {
            electricity_to_remove = electricity_able_to_remove - total_to_be_removed;
            tiles[i].contained_energy -= total_to_be_removed;
            total_to_be_removed = 0;
          } else {
            electricity_to_remove = electricity_able_to_remove;
            tiles[i].contained_energy -= electricity_to_remove;
            total_to_be_removed -= electricity_to_remove;
          }
        } else if(structures[tiles[i].i][10] === "Water Container") {
          water_able_to_remove = tiles[i].contained_water;
          water_to_remove = 0;
          if(water_able_to_remove >= total_water_to_be_removed) {
            water_to_remove = water_able_to_remove - total_water_to_be_removed;
            tiles[i].contained_water -= total_water_to_be_removed;
            total_water_to_be_removed = 0;
          } else {
            water_to_remove = water_able_to_remove;
            tiles[i].contained_water -= water_to_remove;
            total_water_to_be_removed -= water_to_remove;
          }
        }
        if(structures[tiles[i].i][10] === "Money Creator") {
          this.money += structures[tiles[i].i][6];
        }
        if(structures[tiles[i].i][10] === "People Container") {
          tiles[i].contained_people = structures[tiles[i].i][9];
        }
        if(structures[tiles[i].i][10] === "Electricity Creator") {
          GeneratedElectricity += structures[tiles[i].i][6];
        }
        if(structures[tiles[i].i][10] === "Water Creator") {
          GeneratedWater += structures[tiles[i].i][6];
        }
      }
      EnergyLeftToBeStored = GeneratedElectricity;
      ELTBS = GeneratedWater;
      for (let i = 0; i < tiles.length; i ++) {
        current = tiles[i].contained_energy; maximum = structures[Battery_index][9];
        c = tiles[i].contained_water; m = structures[tiles[i].i][9];
        if (structures[tiles[i].i][10] === "Electricity Container") {
          diff = maximum-current;
          if(EnergyLeftToBeStored <= diff) {
            tiles[i].contained_energy += EnergyLeftToBeStored;
            EnergyLeftToBeStored = 0;
          } else {tiles[i].contained_energy += diff; EnergyLeftToBeStored -= diff;}
        } else if(structures[tiles[i].i][10] === "Water Container") {
          diff = m-c;
          if(ELTBS <= diff) {
            tiles[i].contained_water += ELTBS;
            ELTBS = 0;
          } else {tiles[i].contained_water += diff; ELTBS -= diff;}
        }
      }
      this.pop_required = pop_required;
      if(firstRun === false) {
        if(this.population < this.pop_required || this.electricity < 0 || total_water_usage > this.water) {endGame();}
        if(this.population <= 0 || this.electricity <= 0 || this.water <= 0) {endGame();}
      }
      else {firstRun = false;}
    }
  }
}
