function setup() {
  createCanvas(window.innerWidth, window.innerHeight); frameRate(fr);
  camera = new Camera(); selection = new Selection(); resources = new Resources();
  house_img       = loadImage("images/tiles/house.png");
  lmart_img       = loadImage("images/tiles/lmart.png");
  grass_img       = loadImage("images/tiles/grass.png");
  road_img        = loadImage("images/tiles/road.png");
  road2_img       = loadImage("images/tiles/road2.jpg");
  destruction_img = loadImage("images/tiles/destruction.png");
  bg_img          = loadImage("images/backgrounds/bg.jpg");
  gui1            = loadImage("images/gui/gui1.jpg");
  water           = loadImage("images/tiles/water.jpg");
  solar_panel     = loadImage("images/tiles/solar_panel.jpg");
  shop_bg         = loadImage("images/tiles/shop_bg.jpg");
  track_img       = loadImage("images/tiles/track.jpg");
  train_img       = loadImage("images/tiles/train.png");
  tiles = []; background_music = new backgroundMusic();
  gui = new Gui(); creatures = []; trains = [];
  let i = 0;
  for (let x = -50*5; x <= 1000+5*50-50; x += 50) {
    for (let y = -50*5; y <= 500+5*50-50; y += 50) {
      tiles.push(new tile(x, y, temp_t[i], temp_h[i]));
      if(temp_t[i] === 0) {tiles[i].angle = int(random(1, 4)) * 90;}
      i ++;
    }
  }

  for (let i = 0; i < creatures_names.length; i ++) {
    let index = 0;
    for (let j = 0; j < CreatureTypes.length; j ++) {
      if(CreatureTypes[0] === creatures_names[i]) {
        index = j; break;
      }
    }
    creatures.push(new Creature(creatures_positions[i][0], creatures_positions[i][1], index));
  }

  trains.push(new Train(-50*5+1, 450+5*50));

  creature_images = [];
  creature_images.push(loadImage("images/creatures/Creature00.png"));
  difficulty = new Difficulty();
}
let frames = 0; let seconds = 0;
function draw() {
  clear(); renderGame();
  frames ++;
  if(frames  === fr+1) {frames = 0; seconds ++;}
  if(seconds === 10)   {seconds = 0; saveToServer();}
}
