const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");
// const commonmodel = require("../models/model.common");
const axios = require("axios");
const _ = require("./../../node_modules/underscore");
const moment = require('moment');
// const env = require('./environment');



/*
 API to get data from master_shift
*/
exports.shiftdata = async (req, res, next) => {
  
  let client = await pool.connect();
  try {   
    let shiftdata = await client.query(` select sm.* from master_shift sm  where activeflag=true `);
    // console.log("shiftdata ",shiftdata.rows)
      return res
          .status(200)
          .json({ success: true, data: shiftdata.rows });
   
  } catch (error) {
    // console.log()
    console.log("Shiftdata not found",error);
    return res
      .status(200)
      .json({ success: false, msg: "Shiftdata not found", error:error });
  }finally{
    client.release()
  }

};

/*
 API to get data corresponding to shiftdate and shift name, manning details : CR manning and Area manning 
*/
exports.shiftmanningdata = async (req, res, next) => {
  
  let client = await pool.connect();
  try { 
    let decyptedbody = await crypto.decipher(req.body.encryptedbody);
    let body = JSON.parse(decyptedbody);

    let currshiftmanning= await client.query(`SELECT * FROM transactional_manning 
      WHERE shiftdate = '${body.shiftdate}'
      AND shiftname = '${body.shiftname}' AND activeflag=true `);
      //console.log("currshiftmanning ",currshiftmanning.rows[0]);
//get manning details of previous shift
//compute prev shift
let prevshiftmanning;
switch (body.shiftname) {
  case 'Shift C':
    let previousDate = moment(body.shiftdate).subtract(1, 'days').format('YYYY-MM-DD');
   // console.log("previousDate",previousDate);
    //3.get  manning details of current shift
    prevshiftmanning= await client.query(`SELECT *
      FROM transactional_manning
      WHERE shiftdate = '${previousDate}'
      AND shiftname = 'Shift B'`);
    break;      
  case 'Shift B':
    //3.get  manning details of current shift
    prevshiftmanning= await client.query(`SELECT *
      FROM transactional_manning
      WHERE shiftdate = '${body.shiftdate}'
      AND shiftname = 'Shift A'`);
    break;
  case 'Shift A':
     //3.get manning details of current shift
     prevshiftmanning= await client.query(`SELECT *
      FROM transactional_manning
      WHERE shiftdate = '${body.shiftdate}'
      AND shiftname = 'Shift C'`);
    break;
}
let json = {
  currshiftmanning:{},
  prevshiftmanning:{},
  menu:[],
  role:''
}








let menu= await client.query(`SELECT * FROM master_menu `);
 // console.log("menu ",menu.rows);

if(currshiftmanning?.rows.length>0){
  json.currshiftmanning=currshiftmanning.rows[0]
}
if(prevshiftmanning?.rows.length>0){
  json.prevshiftmanning=prevshiftmanning.rows[0]
}
if(menu?.rows.length>0){
  json.menu=menu.rows
}
      return res
          .status(200)
          .json({ success: true, data: json});
  } catch (error) {
    // console.log()
    console.log("Error in fetching manning details ",error);
    return res
      .status(200)
      .json({ success: false, msg: "Error in fetching manning details", error:error });
  }finally{
    client.release()
  }
};


/*
 API to check role if role not assigned already and get corresponding menu 
*/
exports.rolemenu = async (req, res, next) => {
  
  let client = await pool.connect();
  let json = {
    menu:[],
    role:''
  }
  try { 
    let decyptedbody = await crypto.decipher(req.body.encryptedbody);
    // console.log("decyptedbody...",decyptedbody);
    let body = JSON.parse(decyptedbody);
    // console.log("body...",body);
let role=body.role;
// console.log("role...",role);
if(role===''||role==='shiftincharge'){
  let roleinchargeobj= await client.query(`SELECT * FROM master_roleincharge where empid='${body.empid}' and activeflag=true`);
  
// console.log("roleinchargeobj...",roleinchargeobj.rows);
  if(roleinchargeobj.rows.length>0)
    role='roleincharge';
  else{
    let useroleobj= await client.query(`SELECT * FROM vw_listofemployees_haldia where empid='${body.empid}'`);
    
// console.log("useroleobj...",useroleobj.rows);
if(useroleobj.rows.length>0)
      role='user';
  }
}
if(role!==''){
  let menu =  await client.query(`select * from vw_rel_rolemenu where rolename='`+role+`'`);
 if(menu.rows.length>0){
  json.role=role;
  json.menu=menu.rows.map(menu => _.pick(menu, ['menuname','routerlink','icon']));
 }
}
// console.log("json...",json);

let stringifiedjson=JSON.stringify(json);
let encrptedjson = await crypto.cipher(stringifiedjson);
// console.log("encrptedjson...",encrptedjson);
      return res
          .status(200)
          .json({ success: true, data: encrptedjson});
  } catch (error) {
    // console.log()
    console.log("Error in fetching menu ",error);
    return res
      .status(200)
      .json({ success: false, msg: "Error in fetching menu", error:error });
  }finally{
    client.release()
  }

};


/*
 API to get all employees listed in Tata power DB - to populate employee auto complete
*/
exports.activeemployeelist = async (req, res, next) => {
  
  let client = await pool.connect();
  try {
    let employeedata =  await client.query(`SELECT * FROM vw_listofemployees_haldia  order by empname`);
     //console.log("Employee data",employeedata.rows)
    if (employeedata.rows.length>0) {
      return res
          .status(200)
          .json({ success: true, data: employeedata.rows });
    } else {
      console.log("Employee list not found");
      return res.status(200).json({ success: false, msg: "No data found" });
    }
  } catch (error) {
    // console.log()
    console.log("There is no list of employees",error);
    return res
      .status(200)
      .json({ success: false, msg: "There is no list of employees", error:error });
  }finally{
    client.release()
  }

};

