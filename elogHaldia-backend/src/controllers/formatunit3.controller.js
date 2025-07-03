const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");
const _ = require("underscore");

/**
 * Insert data for TG DCS LSTG Unit 3
 */
exports.inserttgdcslstgunit3 = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    console.log("Insert Unit 3 body:", body);

    const fields = [
      'shiftdate', 'shiftname',
      ...['1', '2', '3'].flatMap(num => [
        `gen_active_power_${num}`, `gen_reactive_power_${num}`, `gen_voltage_${num}`, `gen_frequency_${num}`, `turbine_speed_${num}`,
        `excitation_voltage_${num}`, `excitation_current_${num}`, `gen_stator_current_max_${num}`, `gen_winding_temp_max_${num}`,
        `gen_hot_air_temp_${num}`, `gen_cold_air_temp_${num}`, `main_steam_pressure_${num}`, `main_steam_temp_${num}`,
        `wheel_chamber_pressure_${num}`, `condenser_vacuum_calc_${num}`, `turbine_exhaust_temp_${num}`, `lub_oil_header_pressure_${num}`,
        `aopmop_curr_${num}`, `ctrl_oil_pressure_${num}`, `sec_oil_pressure_${num}`, `lube_oil_temp_${num}`,
        `cw_pr_condenser_${num}`, `cw_temp_condenser_${num}`, `hotwell_level_${num}`, `cep_pressure_${num}`,
        `cep_current_${num}`, `conden_temp_${num}`, `lpheater_shell_pr_${num}`, `lpheater_level_${num}`,
        `deaeratorext_pressure_${num}`, `deaeratorext_temp_${num}`, `deaerator_pressure_${num}`, `deaerator_temp_${num}`, `deaerator_lev_${num}`,
        `prds_pressure_${num}`, `prds_temp_${num}`, `gland_sealing_pressure_${num}`, `gland_sealing_temp_${num}`,
        `tbv_brgno_${num}`, `tbt_brgno_${num}`, `gearbox_vib_max_${num}`, `gearbox_temp_max_${num}`,
        `axial_shift_${num}`, `chasingtemp_top_${num}`, `chasingtemp_bottom_${num}`, `cond_flow_${num}`,
        `shift_gen_${num}`, `max_load_${num}`, `min_load_${num}`, `average_load_shift_${num}`
      ]),
      'createdby', 'updatedby'
    ];

    const insertquery = `
      INSERT INTO tgdcs_lstgunit3 (
        ${fields.join(', ')}
      ) VALUES (
        ${fields.map((_, i) => `$${i + 1}`).join(', ')}
      )
    `;

    const inputArray = fields.map(field => {
      if (field === 'shiftdate') return body.shiftdatestr || null;
      if (field === 'createdby' || field === 'updatedby') return body.updatedby || null;
      return body[field] ?? null;
    });

    await client.query(insertquery, inputArray);
    return res.status(200).json({ success: true, message: "Unit 3 insert successful" });

  } catch (error) {
    console.error("Unit 3 insert failed:", error);
    return res.status(200).json({ success: false, msg: "Insert failed", error });
  } finally {
    client.release();
  }
};

/**
 * Get data for TG DCS LSTG Unit 3
 */
exports.gettgdcslstgunit3 = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    console.log("gettgdcslstgunit3", body);

    const selectquery = `
      SELECT * FROM tgdcs_lstgunit3
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
    console.error("Error in gettgdcslstgunit3:", error);
    return res.status(500).json({ success: false, message: "Fetch failed", error });
  } finally {
    client.release();
  }
};
