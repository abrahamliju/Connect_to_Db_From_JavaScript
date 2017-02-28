const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  const input = process.argv.slice(2);
  client.query(`SELECT * from famous_people where last_name = '${input[0]}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rowCount} person with the search`);
    result.rows.forEach(function(data, index) {
      if(data.last_name === input[0]){
        console.log(`-${data.id}: ${data.first_name} ${data.last_name} born on ${data.birthdate.toLocaleString()}`);
      }
    });
    client.end();
  });
  console.log("Searching");
});
