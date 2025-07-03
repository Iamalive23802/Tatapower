const { pool } = require("../utilities/dbconfig");
const axios=require('axios')
const moment = require('moment');



/*
    Schedular to manage status changes
    */
    exports.runschedular = async (req, res, next) => {
        const client = await pool.connect()
        try{
             console.log("Schedular execution");
             
             let  today = moment(); 
             let pendingfollowups = await client.query(`SELECT * FROM public.transactional_followup
where currentstatus in ('Pending','Outage') and activeflag=true`);
            if (pendingfollowups.rowCount > 0) {
              // console.log(pendingfollowups.rowCount," pendingfollowups  rowCount");
                 let countfollowuptoconcern = 0;
              for(let i=0;i<pendingfollowups.rowCount;i++){
                
// console.log("to be moved to concern list 111",pendingfollowups.rows[i])
                let followupdate = moment(pendingfollowups.rows[i].followupdate) 
                 let diff = today.diff(followupdate, 'days');
                 console.log(diff," diff ");
                if(diff > 15){
                  countfollowuptoconcern++;
console.log("to be moved to concern list",pendingfollowups.rows[i].id);
let insertquery =
    "insert into transactional_concern( "+
      "concerndate, concerntype, department,  "+
      "area,concernsystem,description, "+
      "currentremarks,currentstatus, emailgroup,"+
      " createdby,updatedby) "+
      "values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";

      inputArray = [
        //pendingfollowups.rows[i].followupdate,
        moment(pendingfollowups.rows[i].followupdate).format('YYYY-MM-DD'),
        pendingfollowups.rows[i].followuptype,
        pendingfollowups.rows[i].department,
        pendingfollowups.rows[i].area,
        pendingfollowups.rows[i].followupsystem,
        pendingfollowups.rows[i].description,
        pendingfollowups.rows[i].currentremarks,
        pendingfollowups.rows[i].currentstatus,
        pendingfollowups.rows[i].emailgroup,
        pendingfollowups.rows[i].createdby,
        pendingfollowups.rows[i].updatedby
      ];
      console.log("insertconcern ",insertquery,"inputArray ",inputArray);
let insertconcern =  await client.query(insertquery,inputArray);
      if(insertconcern){
        console.log("schedular moving follow up to concern list",pendingfollowups.rows[i].id);
          await client.query(`update transactional_followup set currentstatus='Moved to concern list', currentremarks = 'Closed by System'`+
  `,activeflag=false,updateddate = '` + moment(today).format('YYYY-MM-DD') +
`' where id = ` + pendingfollowups.rows[i].id + ` `);
      }else{
          console.log("schedular error: could not move follow up to concern list",pendingfollowups.rows[i].id);
      }
                }
              }
              console.log(countfollowuptoconcern,"follow ups moved to concern list");
            }  
          
        } catch (error) {
            // console.log(error);
            console.log("Schedular error occurred.",error)
            //return //res.status(200).json({ success: false, msg: "There was an error while running the schedular." })
        }finally{
          console.log("Schedular execution finished.");
            client.release();
            return;
        }
    
    }


