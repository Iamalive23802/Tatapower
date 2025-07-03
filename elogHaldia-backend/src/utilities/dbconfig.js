// require('dotenv/config')
const {Pool} = require("pg")
require('dotenv').config();

// console.log(process.env.user,process.env.host,process.env.database,process.env.password,process.env.port)
// production database using env
// const pool = new Pool({
//   user: process.env.user,
//   host: process.env.host,
//   database:process.env.database,
//   password: process.env.password || "Tatapower@12345",
//   port: process.env.port
//   // max: 10,
//   // idleTimeoutMillis: 5000,
//   // connectionTimeoutMillis: 2000
// })


// test database
const pool = new Pool({
  user: "postgres",
  host: "172.16.208.30",
  database:"eloghaldia",
  password: "Tatapowertest@12345",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000
})

module.exports={pool}