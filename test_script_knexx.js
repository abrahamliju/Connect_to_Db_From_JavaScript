
const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port
  }
});


const firstName = process.argv.slice(2);
const lastName = process.argv.slice(3);
const DOB = process.argv.slice(4);

knex.insert([{first_name: firstName[0], last_name: lastName[0], birthdate: DOB}]).into('famous_people')
  .then(() => {
    console.log("done");
  })

knex.select().from('famous_people')
  .asCallback(function(err, rows){
    console.log(rows);
})
  .finally(function() {
  knex.destroy();
})
