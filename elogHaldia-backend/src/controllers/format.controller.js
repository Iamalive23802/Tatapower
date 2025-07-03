const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");
const axios = require("axios");
const _ = require("underscore");


/*
 API to insert into shift incharge activities table
*/
exports.inserttgdcslstgunit2 = async (req, res, next) => {
  const client = await pool.connect();
  try {
  let decryptedbody = await crypto.decipher(req.body.encryptedbody);
  let body = JSON.parse(decryptedbody);
  // console.log("insert body ",body);
  insertquery =
      "insert into tgdcs_lstgunit2( "+
        "shiftdate,  shiftname,  "+


        "gen_active_power_1,"+
        "gen_reactive_power_1,"+
        "gen_voltage_1,"+
        "gen_frequency_1,"+
        "turbine_speed_1,"+
        "excitation_voltage_1,"+
        "excitation_current_1,"+
        "gen_stator_current_max_1,"+
        "gen_winding_temp_max_1,"+
        "gen_core_temp_max_1,"+
        "gen_tooth_temp_max_1,"+
        "gen_hot_air_temp_1,"+
        "gen_cold_air_temp_1,"+
        "main_steam_pressure_1,"+
        "main_steam_temp_1,"+
        "wheel_chamber_pressure_1,"+
        "condenser_vaccum_calc_1,"+
        "turbine_exhaust_temp_1,"+
        "lub_oil_header_pressure_1,"+
        "aopmop_curr_1,"+
        "ctrl_oil_pressure_1,"+
        "sec_oil_pressure_1,"+
        "lube_oil_temp_1,"+
        "cw_pr_condenser_1,"+
        "cw_temp_condenser_1,"+
        "hotwell_level_1,"+
        "cep_pressure_1,"+
        "cep_current_1,"+
        "cep_tb_temp_1,"+
        "con_water_temp_1,"+
        "lpheatershell_pressure_1,"+
        "lpheater_level_1,"+
        "deaeratorext_pressure_1,"+
        "deaeratorext_temp_1,"+
        "deaerator_pressure_1,"+
        "deaerator_lev_1,"+
        "prds_pressure_1,"+
        "prds_temp_1,"+
        "glandslng_pressure_1,"+
        "glandslng_temp_1,"+
        "tbv_brgno_1,"+
        "tbt_brgno_1,"+
        "axial_shift_1,"+
        "chasingtemp_top_1,"+
        "chasingtemp_bottom_1,"+
        "cond_flow_1,"+
        "shift_gen_1,"+
        "max_load_1,"+
        "min_load_1,"+
        "avg_load_shift_1,"+

        "gen_active_power_2,"+
        "gen_reactive_power_2,"+
        "gen_voltage_2,"+
        "gen_frequency_2,"+
        "turbine_speed_2,"+
        "excitation_voltage_2,"+
        "excitation_current_2,"+
        "gen_stator_current_max_2,"+
        "gen_winding_temp_max_2,"+
        "gen_core_temp_max_2,"+
        "gen_tooth_temp_max_2,"+
        "gen_hot_air_temp_2,"+
        "gen_cold_air_temp_2,"+
        "main_steam_pressure_2,"+
        "main_steam_temp_2,"+
        "wheel_chamber_pressure_2,"+
        "condenser_vaccum_calc_2,"+
        "turbine_exhaust_temp_2,"+
        "lub_oil_header_pressure_2,"+
        "aopmop_curr_2,"+
        "ctrl_oil_pressure_2,"+
        "sec_oil_pressure_2,"+
        "lube_oil_temp_2,"+
        "cw_pr_condenser_2,"+
        "cw_temp_condenser_2,"+
        "hotwell_level_2,"+
        "cep_pressure_2,"+
        "cep_current_2,"+
        "cep_tb_temp_2,"+
        "con_water_temp_2,"+
        "lpheatershell_pressure_2,"+
        "lpheater_level_2,"+
        "deaeratorext_pressure_2,"+
        "deaeratorext_temp_2,"+
        "deaerator_pressure_2,"+
        "deaerator_lev_2,"+
        "prds_pressure_2,"+
        "prds_temp_2,"+
        "glandslng_pressure_2,"+
        "glandslng_temp_2,"+
        "tbv_brgno_2,"+
        "tbt_brgno_2,"+
        "axial_shift_2,"+
        "chasingtemp_top_2,"+
        "chasingtemp_bottom_2,"+
        "cond_flow_2,"+
        "shift_gen_2,"+
        "max_load_2,"+
        "min_load_2,"+
        "avg_load_shift_2,"+

        
    "gen_active_power_3,"+
    "gen_reactive_power_3,"+
    "gen_voltage_3,"+
    "gen_frequency_3,"+
    "turbine_speed_3,"+
    "excitation_voltage_3,"+
    "excitation_current_3,"+
    "gen_stator_current_max_3,"+
    "gen_winding_temp_max_3,"+
    "gen_core_temp_max_3,"+
    "gen_tooth_temp_max_3,"+
    "gen_hot_air_temp_3,"+
    "gen_cold_air_temp_3,"+
	  "main_steam_pressure_3,"+
    "main_steam_temp_3,"+
    "wheel_chamber_pressure_3,"+
    "condenser_vaccum_calc_3,"+
    "turbine_exhaust_temp_3,"+
    "lub_oil_header_pressure_3,"+
    "aopmop_curr_3,"+
    "ctrl_oil_pressure_3,"+
    "sec_oil_pressure_3,"+
    "lube_oil_temp_3,"+
    "cw_pr_condenser_3,"+
    "cw_temp_condenser_3,"+
    "hotwell_level_3,"+
    "cep_pressure_3,"+
    "cep_current_3,"+
    "cep_tb_temp_3,"+
    "con_water_temp_3,"+
    "lpheatershell_pressure_3,"+
    "lpheater_level_3,"+
    "deaeratorext_pressure_3,"+
    "deaeratorext_temp_3,"+
    "deaerator_pressure_3,"+
    "deaerator_lev_3,"+
    "prds_pressure_3,"+
    "prds_temp_3,"+
    "glandslng_pressure_3,"+
    "glandslng_temp_3,"+
    "tbv_brgno_3,"+
    "tbt_brgno_3,"+
    "axial_shift_3,"+
    "chasingtemp_top_3,"+
    "chasingtemp_bottom_3,"+
    "cond_flow_3,"+
    "shift_gen_3,"+
    "max_load_3,"+
    "min_load_3,"+
    "avg_load_shift_3,"+



        " createdby,updatedby) "+
        "values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,"+
      "$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,"+
      "$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60,"+
      "$61,$62,$63,$64,$65,$66,$67,$68,$69,$70,$71,$72,$73,$74,$75,$76,$77,$78,$79,$80,"+
      "$81,$82,$83,$84,$85,$86,$87,$88,$89,$90,$91,$92,$93,$94,$95,$96,$97,$98,$99,$100,"+
      "$101,$102,$103,$104,$105,$106,$107,$108,$109,$110,"+
      "$111,$112,$113,$114,$115,$116,$117,$118,$119,$120,"+
      "$121,$122,$123,$124,$125,$126,$127,$128,$129,$130,"+
      "$131,$132,$133,$134,$135,$136,$137,$138,$139,$140,"+
      "$141,$142,$143,$144,$145,$146,$147,$148,$149,$150,"+
      "$151,$152,$153,$154)";

    inputArray = [
      body.shiftdatestr,
      body.shiftname?body.shiftname:"",
      

      body.gen_active_power_1,
      body.gen_reactive_power_1,
      body.gen_voltage_1,
      body.gen_frequency_1,
      body.turbine_speed_1,
      body.excitation_voltage_1,
      body.excitation_current_1,
      body.gen_stator_current_max_1,
      body.gen_winding_temp_max_1,
      body.gen_core_temp_max_1,
      body.gen_tooth_temp_max_1,
      body.gen_hot_air_temp_1,
      body.gen_cold_air_temp_1,
      body.main_steam_pressure_1,
      body.main_steam_temp_1,
      body.wheel_chamber_pressure_1,
      body.condenser_vaccum_calc_1,
      body.turbine_exhaust_temp_1,
      body.lub_oil_header_pressure_1,
      body.aopmop_curr_1,
      body.ctrl_oil_pressure_1,
      body.sec_oil_pressure_1,
      body.lube_oil_temp_1,
      body.cw_pr_condenser_1,
      body.cw_temp_condenser_1,
      body.hotwell_level_1,
      body.cep_pressure_1,
      body.cep_current_1,
      body.cep_tb_temp_1,
      body.con_water_temp_1,
      body.lpheatershell_pressure_1,
      body.lpheater_level_1,
      body.deaeratorext_pressure_1,
      body.deaeratorext_temp_1,
      body.deaerator_pressure_1,
      body.deaerator_lev_1,
      body.prds_pressure_1,
      body.prds_temp_1,
      body.glandslng_pressure_1,
      body.glandslng_temp_1,
      body.tbv_brgno_1,
      body.tbt_brgno_1,
      body.axial_shift_1,
      body.chasingtemp_top_1,
      body.chasingtemp_bottom_1,
      body.cond_flow_1,
      body.shift_gen_1,
      body.max_load_1,
      body.min_load_1,
      body.avg_load_shift_1,
   
      

      body.gen_active_power_2,
      body.gen_reactive_power_2,
      body.gen_voltage_2,
      body.gen_frequency_2,
      body.turbine_speed_2,
      body.excitation_voltage_2,
      body.excitation_current_2,
      body.gen_stator_current_max_2,
      body.gen_winding_temp_max_2,
      body.gen_core_temp_max_2,
      body.gen_tooth_temp_max_2,
      body.gen_hot_air_temp_2,
      body.gen_cold_air_temp_2,
      body.main_steam_pressure_2,
      body.main_steam_temp_2,
      body.wheel_chamber_pressure_2,
      body.condenser_vaccum_calc_2,
      body.turbine_exhaust_temp_2,
      body.lub_oil_header_pressure_2,
      body.aopmop_curr_2,
      body.ctrl_oil_pressure_2,
      body.sec_oil_pressure_2,
      body.lube_oil_temp_2,
      body.cw_pr_condenser_2,
      body.cw_temp_condenser_2,
      body.hotwell_level_2,
      body.cep_pressure_2,
      body.cep_current_2,
      body.cep_tb_temp_2,
      body.con_water_temp_2,
      body.lpheatershell_pressure_2,
      body.lpheater_level_2,
      body.deaeratorext_pressure_2,
      body.deaeratorext_temp_2,
      body.deaerator_pressure_2,
      body.deaerator_lev_2,
      body.prds_pressure_2,
      body.prds_temp_2,
      body.glandslng_pressure_2,
      body.glandslng_temp_2,
      body.tbv_brgno_2,
      body.tbt_brgno_2,
      body.axial_shift_2,
      body.chasingtemp_top_2,
      body.chasingtemp_bottom_2,
      body.cond_flow_2,
      body.shift_gen_2,
      body.max_load_2,
      body.min_load_2,
      body.avg_load_shift_2,
   
      
   body.gen_active_power_3,
   body.gen_reactive_power_3,
   body.gen_voltage_3,
   body.gen_frequency_3,
   body.turbine_speed_3,
   body.excitation_voltage_3,
   body.excitation_current_3,
   body.gen_stator_current_max_3,
   body.gen_winding_temp_max_3,
   body.gen_core_temp_max_3,
   body.gen_tooth_temp_max_3,
   body.gen_hot_air_temp_3,
   body.gen_cold_air_temp_3,
   body.main_steam_pressure_3,
   body.main_steam_temp_3,
   body.wheel_chamber_pressure_3,
   body.condenser_vaccum_calc_3,
   body.turbine_exhaust_temp_3,
   body.lub_oil_header_pressure_3,
   body.aopmop_curr_3,
   body.ctrl_oil_pressure_3,
   body.sec_oil_pressure_3,
   body.lube_oil_temp_3,
   body.cw_pr_condenser_3,
   body.cw_temp_condenser_3,
   body.hotwell_level_3,
   body.cep_pressure_3,
   body.cep_current_3,
   body.cep_tb_temp_3,
   body.con_water_temp_3,
   body.lpheatershell_pressure_3,
   body.lpheater_level_3,
   body.deaeratorext_pressure_3,
   body.deaeratorext_temp_3,
   body.deaerator_pressure_3,
   body.deaerator_lev_3,
   body.prds_pressure_3,
   body.prds_temp_3,
   body.glandslng_pressure_3,
   body.glandslng_temp_3,
   body.tbv_brgno_3,
   body.tbt_brgno_3,
   body.axial_shift_3,
   body.chasingtemp_top_3,
   body.chasingtemp_bottom_3,
   body.cond_flow_3,
   body.shift_gen_3,
   body.max_load_3,
   body.min_load_3,
   body.avg_load_shift_3,


      body.updatedby?body.updatedby:"",
      body.updatedby?body.updatedby:""
    ];
    //console.log("insert query ",insertquery);
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
   API to get record of gettgdcslstgunit2 for haldia based on shift name and date
  */
  exports.gettgdcslstgunit2 = async (req, res, next) => { 
    let client = await pool.connect(); 
    try {
      let decyptedbody = await crypto.decipher(req.body.encryptedbody);
      //console.log("getgettgdcslstgunit2 req obj",decyptedbody);
      let body = JSON.parse(decyptedbody);
      //console.log("gettgdcslstgunit2 ",body);
      //let shiftdate = moment(body.shiftdate).utc().format('YYYY-MM-DD')// moment(body.shiftactivitydate).format('YYYY-MM-DD'); 
      let selectquery = "select * from tgdcs_lstgunit2 "+
      "where shiftdate='"+body.shiftdate+"' and shiftname='"+body.shiftname+"'  and activeflag=true order by updateddate desc";
       //console.log("select query ",selectquery);
      let gettgdcslstgunit2Obj = await client.query(selectquery)
      if(gettgdcslstgunit2Obj.rows[0]){
        return  res.status(200).json({success:true,data:gettgdcslstgunit2Obj.rows[0]});    
      }else{
        return  res.status(200).json({success:true,data:[],message:"No record found"});
      }
    } catch (error) {
      console.log("error in transactional_gettgdcslstgunit2", error);
    } finally {    
      client.release();
    }
  };
  
  
