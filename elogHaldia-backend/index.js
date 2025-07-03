//require('dotenv/config')
var express = require("express");
const helmet = require('helmet');
var app = express();

//vapt observation to handle sameframe issue
app.use(helmet.frameguard({ action: "SAMEORIGIN" }));
app.use(helmet()) //app.use(function(req, res, next) {    res.setHeader('X-Frame-Options', 'sameorigin');    next();  });// _________________________
app.use(helmet.contentSecurityPolicy({
  directives:{
    defaultSrc:["'self'"],
    scriptSrc:["'self'",'https://kit.fontawesome.com',"'unsafe-inline'","'unsafe-eval'",],
    styleSrc:['https://fonts.googleapis.com',"'self'","'unsafe-inline'"],
    imgSrc:["'self'",'data:'],
    connectSrc:["'self'",'https://ka-f.fontawesome.com'],
    fontSrc:["'self'",'fonts.gstatic.com','https://ka-f.fontawesome.com'],
    objectSrc:["'self'"],
    mediaSrc:  ["'self'"],
    frameSrc:["'self'"], },}))
app.use(helmet.dnsPrefetchControl())
// app.use(helmet.expectCt())
const cron = require("node-cron");
const schedular = require("./src/controllers/schedular");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Strict-Transport-Security", "max-age=31536000;includeSubDomains;preload");//-.json(JSON.parse(fs.readFileSync(path.join(__dirname, 'metadata.json'), 'utf8')));
  // res.setHeader("Strict-Transport-Security", "max-age=31536000").json(JSON.parse(fs.readFileSync(path.join(__dirname, 'metadata.json'), 'utf8')));
  // res.setHeader("includeSubDomains", "preload");
  next();
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
var cors = require('cors') //to be commented in production

const PORT = 1230;
global.__basedir = __dirname;
app.get('/', function (req, res) {
    res.send('Welcome to the new elog system Haldia...')
 });
app.use(cors()); //to be commented in production
app.options('*', cors()); //to be commented in production

var commonRouter = require("./src/routers/common.router");
var shiftactRouter = require("./src/routers/shiftactivities.router");
var formatRouter = require("./src/routers/format.router");

app.use(express.json())
app.use('/eloghaldia/api/common',commonRouter);
app.use('/eloghaldia/api/shiftactivities',shiftactRouter);
app.use('/eloghaldia/api/format',formatRouter);


//schedular starts here
//in production, this schedular will run at (6:30:05 - 5:30:00 i.e. 1 am)
cron.schedule('10 43 11  * * *', function () {
  // cron.schedule('40 40 12  * * *', function () {
console.log('Scheduler started!');
schedular.runschedular();  
console.log("Schedular tasks finished.");
})
app.listen(PORT, err=>{
    if(err) return //console.log(`Cannot listen on PORT: ${PORT}`)
    console.log(`Server is listening on PORT: ${PORT} elog`)
})
