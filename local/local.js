const fs = require('fs');
const path = require('path');

(async () => {
  let dotEnv = fs.readFileSync('./local/docker.env', 'utf8');
  const replaces = [ 
    ["postgres:5432", "localhost:5432"],
    ["mongo:27017", "localhost:27017"],
    ["redis:6379", "localhost:6379"],
]

  replaces.forEach(([source, replace]) => {
    dotEnv = dotEnv.replace(source, replace)
  });
  dotEnv = `
  #This file is generated from  ./local/docker.env , Manual change on this file will be overwritten
  ${dotEnv}`
  fs.writeFileSync('services/platform-middleware/.env', dotEnv);
  fs.writeFileSync('services/platform-worker/.env', dotEnv);
  fs.writeFileSync('services/platform-middleware/.env', dotEnv);
  fs.writeFileSync('services/cohort-middleware/.env', dotEnv);
})();
