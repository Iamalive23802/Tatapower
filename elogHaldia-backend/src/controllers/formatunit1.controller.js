const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");
const _ = require("underscore");

/**
 * Insert data for TG DCS LSTG Unit 1
 */
exports.inserttgdcslstgunit1 = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    console.log("Insert Unit 1 body:", body);

    const insertquery = `
      INSERT INTO tgdcs_lstgunit1 (
        shiftdate, shiftname,
        gen_active_power_1, gen_reactive_power_1, gen_voltage_1, gen_frequency_1, turbine_speed_1,
        excitation_voltage_1, excitation_current_1, gen_stator_current_max_1, gen_winding_temp_max_1,
        gen_core_temp_max_1, gen_tooth_temp_max_1, gen_hot_air_temp_1, gen_cold_air_temp_1,
        main_steam_pressure_1, main_steam_temp_1, wheel_chamber_pressure_1, condenser_vaccum_calc_1,
        turbine_exhaust_temp_1, lub_oil_header_pressure_1, aopmop_curr_1, ctrl_oil_pressure_1, sec_oil_pressure_1,
        lube_oil_temp_1, cw_pr_condenser_1, cw_temp_condenser_1, hotwell_level_1, cep_pressure_1,
        cep_current_1, cep_tb_temp_1, con_water_temp_1, lpheatershell_pressure_1, lpheater_level_1,
        deaeratorext_pressure_1, deaeratorext_temp_1, deaerator_pressure_1, deaerator_lev_1,
        prds_pressure_1, prds_temp_1, glandslng_pressure_1, glandslng_temp_1, tbv_brgno_1, tbt_brgno_1,
        axial_shift_1, chasingtemp_top_1, chasingtemp_bottom_1, cond_flow_1, shift_gen_1, max_load_1,
        min_load_1, avg_load_shift_1,

        gen_active_power_2, gen_reactive_power_2, gen_voltage_2, gen_frequency_2, turbine_speed_2,
        excitation_voltage_2, excitation_current_2, gen_stator_current_max_2, gen_winding_temp_max_2,
        gen_core_temp_max_2, gen_tooth_temp_max_2, gen_hot_air_temp_2, gen_cold_air_temp_2,
        main_steam_pressure_2, main_steam_temp_2, wheel_chamber_pressure_2, condenser_vaccum_calc_2,
        turbine_exhaust_temp_2, lub_oil_header_pressure_2, aopmop_curr_2, ctrl_oil_pressure_2, sec_oil_pressure_2,
        lube_oil_temp_2, cw_pr_condenser_2, cw_temp_condenser_2, hotwell_level_2, cep_pressure_2,
        cep_current_2, cep_tb_temp_2, con_water_temp_2, lpheatershell_pressure_2, lpheater_level_2,
        deaeratorext_pressure_2, deaeratorext_temp_2, deaerator_pressure_2, deaerator_lev_2,
        prds_pressure_2, prds_temp_2, glandslng_pressure_2, glandslng_temp_2, tbv_brgno_2, tbt_brgno_2,
        axial_shift_2, chasingtemp_top_2, chasingtemp_bottom_2, cond_flow_2, shift_gen_2, max_load_2,
        min_load_2, avg_load_shift_2,

        gen_active_power_3, gen_reactive_power_3, gen_voltage_3, gen_frequency_3, turbine_speed_3,
        excitation_voltage_3, excitation_current_3, gen_stator_current_max_3, gen_winding_temp_max_3,
        gen_core_temp_max_3, gen_tooth_temp_max_3, gen_hot_air_temp_3, gen_cold_air_temp_3,
        main_steam_pressure_3, main_steam_temp_3, wheel_chamber_pressure_3, condenser_vaccum_calc_3,
        turbine_exhaust_temp_3, lub_oil_header_pressure_3, aopmop_curr_3, ctrl_oil_pressure_3, sec_oil_pressure_3,
        lube_oil_temp_3, cw_pr_condenser_3, cw_temp_condenser_3, hotwell_level_3, cep_pressure_3,
        cep_current_3, cep_tb_temp_3, con_water_temp_3, lpheatershell_pressure_3, lpheater_level_3,
        deaeratorext_pressure_3, deaeratorext_temp_3, deaerator_pressure_3, deaerator_lev_3,
        prds_pressure_3, prds_temp_3, glandslng_pressure_3, glandslng_temp_3, tbv_brgno_3, tbt_brgno_3,
        axial_shift_3, chasingtemp_top_3, chasingtemp_bottom_3, cond_flow_3, shift_gen_3, max_load_3,
        min_load_3, avg_load_shift_3,

        createdby, updatedby
      ) VALUES (
        ${Array.from({ length: 154 }, (_, i) => `$${i + 1}`).join(', ')}
      )
    `;
    const inputArray = Object.values({
      shiftdate: body.shiftdatestr,
      shiftname: body.shiftname || "",
      ..._.pick(body, _.flatten(['1', '2', '3'].map(num => [
        `gen_active_power_${num}`, `gen_reactive_power_${num}`, `gen_voltage_${num}`, `gen_frequency_${num}`,
        `turbine_speed_${num}`, `excitation_voltage_${num}`, `excitation_current_${num}`,
        `gen_stator_current_max_${num}`, `gen_winding_temp_max_${num}`, `gen_core_temp_max_${num}`,
        `gen_tooth_temp_max_${num}`, `gen_hot_air_temp_${num}`, `gen_cold_air_temp_${num}`,
        `main_steam_pressure_${num}`, `main_steam_temp_${num}`, `wheel_chamber_pressure_${num}`,
        `condenser_vaccum_calc_${num}`, `turbine_exhaust_temp_${num}`, `lub_oil_header_pressure_${num}`,
        `aopmop_curr_${num}`, `ctrl_oil_pressure_${num}`, `sec_oil_pressure_${num}`, `lube_oil_temp_${num}`,
        `cw_pr_condenser_${num}`, `cw_temp_condenser_${num}`, `hotwell_level_${num}`, `cep_pressure_${num}`,
        `cep_current_${num}`, `cep_tb_temp_${num}`, `con_water_temp_${num}`, `lpheatershell_pressure_${num}`,
        `lpheater_level_${num}`, `deaeratorext_pressure_${num}`, `deaeratorext_temp_${num}`,
        `deaerator_pressure_${num}`, `deaerator_lev_${num}`, `prds_pressure_${num}`, `prds_temp_${num}`,
        `glandslng_pressure_${num}`, `glandslng_temp_${num}`, `tbv_brgno_${num}`, `tbt_brgno_${num}`,
        `axial_shift_${num}`, `chasingtemp_top_${num}`, `chasingtemp_bottom_${num}`, `cond_flow_${num}`,
        `shift_gen_${num}`, `max_load_${num}`, `min_load_${num}`, `avg_load_shift_${num}`
      ]))),
      createdby: body.updatedby || "",
      updatedby: body.updatedby || ""
    });

    await client.query(insertquery, inputArray);
    return res.status(200).json({ success: true, message: "Unit 1 insert successful" });

  } catch (error) {
    console.error("Unit 1 insert failed:", error);
    return res.status(200).json({ success: false, msg: "Insert failed", error });
  } finally {
    client.release();
  }
};


/**
 * Get data for TG DCS LSTG Unit 1
 */
exports.gettgdcslstgunit1 = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    console.log("gettgdcslstgunit1", body);

    const selectquery = `
      SELECT * FROM tgdcs_lstgunit1
      WHERE shiftdate = $1 AND shiftname = $2 AND activeflag = true
      ORDER BY updateddate DESC
      LIMIT 1
    `;

    const result = await client.query(selectquery, [body.shiftdate, body.shiftname]);

    if (result.rows.length > 0) {
      return res.status(200).json({
        success: true,
        data: result.rows[0],
        updated_at: result.rows[0].updateddate
      });
    } else {
      return res.status(200).json({ success: true, data: [], message: "No record found" });
    }

  } catch (error) {
    console.error("Error in gettgdcslstgunit1:", error);
    return res.status(500).json({ success: false, message: "Fetch failed", error });
  } finally {
    client.release();
  }
};
