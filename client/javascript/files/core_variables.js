let GameState = 0;
let scl = 50, extension = 5, day_in_secconds = 10;
let tiles, camera, selection, resources, gui, house_img, lmart_img, destruction_img, song, difficulty, creatures, creature_images;
let background_music, shop_bg;
let firstRun = true, fr = 30, grass_img, road_img, road2_img, bg_img, water, solar_panel;
let structures = [
  ["Grass",           10,   0,   68, 189,  50,   0,  "None"       ,  0,   0, "Nothing"              ,  0,  0,   0, 0,   0],
  ["Solar Panel",     1000, 1,   58, 107, 173,  10,  "Electricity",  0,   0, "Electricity Creator"  ,  0,  0,   0, 15,  0],
  ["House",           250,  2,  235,  47,   6,   0,  "None"       ,  5,   5, "People Container"     ,  0,  5,   0, 75,  0],
  ["Battery",         100,  3,   33,  33,  33,   0,  "None"       ,  0, 200, "Electricity Container",  0,  0,   0, 25,  0],
  ["Road",            50,   5,   33,  33,  33,   0,  "None"       ,  0,   0, "Path"                 ,  0,  0,   0, 25,  0],
  ["Lmart",           500,  6,  255, 255, 255, 250,  "Money"      , 10,   0, "Money Creator"        , 15, 10,   0, 200, 0],
  ["Water Tower",     700,  7,  251, 197,  49,   0,  "None"       ,  0, 400, "Water Container"      ,  0,  0,   0, 50,  0],
  ["Water Generator", 1250, 8,  251, 197,  49,  50,  "Water"      , 10,   0, "Water Creator"        ,  2,  0,   0, 50,  0],
  ["Nothing",         0,    4,  255, 255, 255,   0,  "None"       ,  0,   0, "Nothing"              ,  0,  0,   0, 0,   0],
  ["Road Corner",     50,   9,   33,  33,  33,   0,  "None"       ,  0,   0, "Path"                 ,  0,  0,   0, 25,  0],
  ["Wind Turbine",    1500, 10, 251, 197,  49,  15,  "Electricity",  0,   0, "Electricity Creator"  ,  0,  0,   0, 50,  0],
  ["Cannon",          5000, 11,  33,  33,  33,   0,  "None"       , 10,   0, "Cannon"               ,  1,  0,  10, 100, 15],
  ["Destruction",     25,   12, 251, 197,  49,   0,  "None"       ,  0,   0, "Nothing"              ,  0,  0,   0,   0, 0],
  ["Road2",           50,   13,   0,   0,   0,   0,  "None"       ,  0,   0, "Path"                 ,  0,  0,   0,  25, 0]
];
// NAME, PRICE, INDEX, R, G, B, RENDEMENT, TYPE D'ENERGIE YIELDED, ELECRICITY USE, MAX_CAPACITY,
// TYPE OF BUILDING, MIN_POPULATION TO WORK, WATER USE, RANGE, HEALTH, DAMAGE
let CreatureTypes = [
  ["Basic", 0, 2, 10, 2]
];
// NAME, TEXTURE_INDEX, DAMAGE, HEALTH, RANGE
