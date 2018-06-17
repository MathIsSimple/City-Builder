"use strict";

const http  = require('http');
const fs    = require('fs');
const url   = require('url');
const path  = require('path');
const parse = require('querystring');

let server = http.createServer();

let print  = (message => console.log(message));

server.on('request', (request, response) => {
  let file_type = '';
  const parsed_url   = url.parse(request.url, true);
  let dir = '../../../client';
  let requested_file = dir + parsed_url.path;
  if(requested_file  === dir + "/") {
    requested_file   = requested_file + 'index.html';
    load('');
  } else if(requested_file.includes(dir + '/add_user.php') === true) {
    requested_file       = dir+'/index.html';
    let parsed_users     = JSON.parse(fs.readFileSync('./../json/users.json'));
    let parsed_maps      = JSON.parse(fs.readFileSync('./../json/maps.json'));
    let parsed_creatures = JSON.parse(fs.readFileSync('./../json/creatures.json'));
    let query            = parsed_url.query, add_user = true;
    for (let i = 0; i < parsed_users.usernames.length; i ++) {
      if(parsed_users.usernames[i] === query.username) {
        add_user = false;
      }
    }
    if(add_user === true) {
      parsed_users.usernames.push(query.username);
      parsed_users.passwords.push(query.password);
      parsed_maps.usernames.push(query.username);
      parsed_creatures.usernames.push(query.username);
      parsed_creatures.positions.push([]);
      parsed_creatures.names.push([]);
      let map    = new Array();
      let health = new Array();
      for (let x = -50*5; x <= 1000+5*50-50; x += 50) {
        for (let y = -50*5; y <= 500+5*50-50; y += 50) {
          let index = 0, Thealth = 0;
          if(x === 0       && y === 50)   {index = 2;  Thealth = 15;}
          if(x === 50      && y === 50)   {index = 2;  Thealth = 15;}
          if(x === 2*50    && y === 50)   {index = 2;  Thealth = 15;}
          if(x === 0       && y === 2*50) {index = 4;  Thealth = 25;}
          if(x === 50      && y === 2*50) {index = 4;  Thealth = 25;}
          if(x === 2*50    && y === 2*50) {index = 4;  Thealth = 25;}

          if(x === 11*50   && y === 50)   {index = 3;  Thealth = 25;}
          if(x === 11*50   && y === 2*50) {index = 3;  Thealth = 25;}
          if(x === 11*50   && y === 3*50) {index = 11; Thealth = 25;}
          if(x === 12*50   && y === 50)   {index = 1;  Thealth = 15;}
          if(x === 12*50   && y === 2*50) {index = 1;  Thealth = 15;}
          if(x === 13*50   && y === 50)   {index = 1;  Thealth = 15;}
          if(x === 13*50   && y === 2*50) {index = 1;  Thealth = 15;}
          if(x === 12*50   && y === 3*50) {index = 6;  Thealth = 50;}
          if(x === 13*50   && y === 3*50) {index = 7;  Thealth = 50;}
          map.push(index);
          health.push(Thealth);
        }
      }
      parsed_maps.map.push(map);
      parsed_maps.health.push(health);
      fs.writeFile('./../json/users.json', JSON.stringify(parsed_users), (error => {
        if(error) {console.log("error");}
        fs.writeFile('./../json/maps.json', JSON.stringify(parsed_maps), (error => {
          if(error) {console.log("error");}
          fs.writeFile('./../json/creatures.json', JSON.stringify(parsed_creatures), (error => {
            if(error) {console.log("error");}
            load('');
          }));
        }));
      }));
    } else {load('');}
  } else if(requested_file.includes(dir + '/connect.php') === true) {
    requested_file   = dir+'/index.html';
    let parsed_users = JSON.parse(fs.readFileSync('./../json/users.json'));
    let query        = parsed_url.query;
    for (let i = 0; i < parsed_users.usernames.length; i ++) {
      if(parsed_users.usernames[i] === query.username && parsed_users.passwords[i] === query.password) {
        requested_file = dir+'/game.php';
        let parsed_creatures = JSON.parse(fs.readFileSync('./../json/creatures.json'));
        let parsed_maps      = JSON.parse(fs.readFileSync('./../json/maps.json'));
        let map_i = parsed_maps.map[i], health_i = parsed_maps.health[i], username = query.username, password = query.password;
        let cn = parsed_creatures.names[i], creatures_positions = parsed_creatures.positions[i];
        let creatures_names = [];
        for (let i = 0; i < cn.length; i ++) {
          creatures_names.push("\""+cn[i]+"\"");
        }
        let replace_with = `let username = \"${username}\"; let temp_t = [${map_i}]; let temp_h = [${health_i}]; let password = \"${password}\"; let creatures_names = [${creatures_names}]; let creatures_positions = [${creatures_positions}];`;
        load(replace_with);
      }
    }
    if(requested_file !== dir+'/client/game.php') {load('');}
  } else if(request.method === "POST") {
    console.log(dir+"/save.php");
    if(requested_file.includes(dir+'/save.php') === true) {
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString();
      });
      request.on('end', () => {
        let parsed_inp       = JSON.parse(body);
        let parsed_map       = JSON.parse(fs.readFileSync('./../json/maps.json'));
        let parsed_creatures = JSON.parse(fs.readFileSync('./../json/creatures.json'));
        let parsed_use       = JSON.parse(fs.readFileSync('./../json/users.json'));
        for (let i = 0; i < parsed_map.usernames.length; i ++) {
          if(parsed_map.usernames[i] === parsed_inp.username && parsed_use.passwords[i] === parsed_inp.password) {
            parsed_map.map[i]             = parsed_inp.map;
            parsed_map.health[i]          = parsed_inp.health;
            parsed_creatures.positions[i] = parsed_inp.creatures_positions;
            parsed_creatures.names[i]     = parsed_inp.creatures_names;
            fs.writeFile('./../json/maps.json', JSON.stringify(parsed_map), (error => {
              if(error) {console.log("error");}
              console.log("map received and saved");
              fs.writeFile('./../json/creatures.json', JSON.stringify(parsed_creatures), (error => {
                if(error) {console.log(error);}
                console.log("creatures received and saved");
              }));
            }));
          }
        }
        response.end("received");
      });
    } else if(requested_file.includes(dir+'/delete.php') === true) {
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString();
      });
      request.on('end', () => {
        let parsed_inp       = JSON.parse(body);
        let parsed_map       = JSON.parse(fs.readFileSync('./../json/maps.json'));
        let parsed_use       = JSON.parse(fs.readFileSync('./../json/users.json'));
        let parsed_creatures = JSON.parse(fs.readFileSync('./../json/creatures.json'));
        for (let i = 0; i < parsed_map.usernames.length; i ++) {
          if(parsed_map.usernames[i] === parsed_inp.username && parsed_use.passwords[i] === parsed_inp.password && parsed_inp.delete === "true") {
            parsed_map.map.splice(i, 1);
            parsed_map.health.splice(i, 1);
            parsed_map.usernames.splice(i, 1);
            parsed_use.usernames.splice(i, 1);
            parsed_use.passwords.splice(i, 1);
            parsed_creatures.usernames.splice(i, 1);
            parsed_creatures.positions.splice(i, 1);
            parsed_creatures.names.splice(i, 1);
            fs.writeFile('./../json/maps.json', JSON.stringify(parsed_map), (error => {
              if(error) {console.log("error");}
              fs.writeFile('./../json/users.json', JSON.stringify(parsed_use), (error => {
                if(error) {console.log("error");}
                  fs.writeFile('./../json/creatures.json', JSON.stringify(parsed_creatures), (error => {
                    if(error) {console.log("error");}
                    console.log("Destroyed User Account");
                  }));
              }));
            }));
          }
        }
        response.end("received");
      });
    }
  } else {load('');}

  function load(r) {
    print(`requested file : ${requested_file}`);

    let file_extension = path.extname(requested_file);
    if(file_extension === ".html" || file_extension === ".php") {file_type = 'text/html';}
    if(file_extension === ".css")  {file_type = 'text/css';}
    if(file_extension === ".js")   {file_type = 'text/javascript';}
    if(file_extension === ".png")  {file_type = 'image/png';}
    if(file_extension === ".mp3")  {file_type = 'audio/mpeg3';}

    if(file_extension === ".php" || file_extension === ".html" || file_extension === ".css" || file_extension === ".js") {
      fs.readFile(requested_file, "utf8", (error, data) => {
        if (error) {
          if(error) {console.log("error");}
          print("Encountered An Error While Reading The Requested File");
          response.writeHead(404, {
            'content-type': 'text/html; charset=utf-8'
          });
          response.end("<center><h1><b><u>Sorry!</u></b></h1></center><center><h3>This File Does Not Exit, Please Try Again Later</h3></center>");
        } else {
          print("Successfully Read The Requested File");
          response.writeHead(200, {
            'content-type': file_type+'; charset=utf-8'
          });
          data = data.replace("{{ js_here }}", r);
          response.end(data);
        }
      });
    } else {
      fs.readFile(requested_file, (error, data) => {
        if (error) {
          print("Encountered An Error While Reading The Requested File");
          response.writeHead(404, {
            'content-type': 'text/html; charset=utf-8'
          });
          response.end("<center><h1><b><u>Sorry!</u></b></h1></center><center><h3>This File Does Not Exit, Please Try Again Later</h3></center>");
        } else {
          print("Successfully Read The Requested File");
          response.writeHead(200, {
            'content-type': file_type+'; charset=utf-8'
          });
          response.end(data);
        }
      });
    }
  }
});
server.listen('80');
