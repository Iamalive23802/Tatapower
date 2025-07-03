const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");
const axios = require("axios");
const _ = require("./../../node_modules/underscore");


// /*
//  API to insert into shift incharge activities table
// */
// exports.insertsiactivities = async (req, res, next) => {
//   const client = await pool.connect();
//   try {
//   let decryptedbody = await crypto.decipher(req.body.encryptedbody);
//   let body = JSON.parse(decryptedbody);
//   let status = body.status;
//   if(_.isEmpty(status)){
//     status="Pending";
//   }
//   insertquery =
//       "insert into transactional_siactivities( "+
//         "siactivitiesdate,  shiftname,  editortext,"+
//         " createdby,updatedby,status) "+
//         " values($1,$2,$3,$4,$5,$6) ";
//     inputArray = [
//       body.shiftdatestr,
//       body.shiftname?body.shiftname:"",
//       body.editortext ? body.editortext : "",
//       body.updatedby?body.updatedby:"",
//       body.updatedby?body.updatedby:"",
//       status
//     ];
    
//     let responseonexecute = await client.query(insertquery, inputArray)
//     return res.status(200).json({ success: true, data: responseonexecute.rows[0] });
//     } catch (error) {
//       console.log("Insert failed ",error);
//       return res
//         .status(200)
//         .json({ success: false, msg: "Insert failed", error:error });
//     }finally{
//       client.release();
//     }
  
//   };
  
  
//     /*
//    API to get record of shift incharge activities for haldia based on shift name and date
//   */
//   exports.getsiactivities = async (req, res, next) => { 
//     let client = await pool.connect(); 
//     try {
//       let decyptedbody = await crypto.decipher(req.body.encryptedbody);
//       //console.log("getsiactivities req obj",decyptedbody);
//       let body = JSON.parse(decyptedbody);
//     console.log("getsiactivities ",body);
//       //let shiftdate = moment(body.shiftdate).utc().format('YYYY-MM-DD')// moment(body.shiftactivitydate).format('YYYY-MM-DD'); 
//       let selectquery = "select * from transactional_siactivities "+
//       "where siactivitiesdate='"+body.shiftactivitydate+"' and shiftname='"+body.shiftname+"'  and activeflag=true order by updateddate desc";
//       // console.log("select query ",selectquery);
//       let siactivitiesObj = await client.query(selectquery)
//       if(siactivitiesObj.rows[0]){
//         return  res.status(200).json({success:true,data:siactivitiesObj.rows[0]});    
//       }else{
//         return  res.status(200).json({success:true,data:[],message:"No record found"});
//       }
//     } catch (error) {
//       console.log("error in transactional_siactivities", error);
//     } finally {    
//       client.release();
//     }
//   };
  
  

/*
 API to insert into transactional activities table
*/
exports.insertactivities = async (req, res, next) => {
  const client = await pool.connect();
  try {
  let decryptedbody = await crypto.decipher(req.body.encryptedbody);
  let body = JSON.parse(decryptedbody);
  console.log("body ",body);
  insertquery =
      "insert into transactional_activities( "+
        "activitiesdate, acttype, shiftname,  editortext,"+
        " createdby,updatedby) "+
        " values($1,$2,$3,$4,$5,$6) ";
    inputArray = [
      body.shiftdatestr,
      body.acttype,
      body.shiftname?body.shiftname:"",
      body.editortext ? body.editortext : "",
      body.updatedby?body.updatedby:"",
      body.updatedby?body.updatedby:""
    ];
    
    let responseonexecute = await client.query(insertquery, inputArray)
    return res.status(200).json({ success: true, data: responseonexecute.rows[0] });
    } catch (error) {
      console.log("Insert failed ",error);
      return res
        .status(200)
        .json({ success: false, msg: "Insert failed", error:error });
    }finally{
      client.release();
    }
  
  };
  
  
    /*
   API to get record of shift incharge activities for haldia based on shift name and date
  */
  exports.getactivities = async (req, res, next) => { 
    let client = await pool.connect(); 
    try {
      let decyptedbody = await crypto.decipher(req.body.encryptedbody);
      //console.log("getactivities req obj",decyptedbody);
      let body = JSON.parse(decyptedbody);
    console.log("getactivities ",body);
      //let shiftdate = moment(body.shiftdate).utc().format('YYYY-MM-DD')// moment(body.shiftactivitydate).format('YYYY-MM-DD'); 
      let selectquery = "select * from transactional_activities "+
      "where activitiesdate='"+body.shiftactivitydate+"' and shiftname='"+body.shiftname+
      "' and acttype='"+body.acttype+
      "'  and activeflag=true order by updateddate desc";
      // console.log("select query ",selectquery);
      let activitiesObj = await client.query(selectquery)
      if(activitiesObj.rows[0]){
        return  res.status(200).json({success:true,data:activitiesObj.rows[0]});    
      }else{
        return  res.status(200).json({success:true,data:[],message:"No record found"});
      }
    } catch (error) {
      console.log("error in transactional_activities", error);
    } finally {    
      client.release();
    }
  };
  
  
