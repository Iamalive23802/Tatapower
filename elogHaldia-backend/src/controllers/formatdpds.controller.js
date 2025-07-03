const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");
const _ = require("underscore");

/**
 * Insert boiler and BOP damper status data
 */
exports.insertboilerandbop = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    console.log("Insert Boiler BOP request body:", body);

    const boilers = [
      'b1_1', 'b1_2', 'b1_3', 'b1_4',
      'b2_1', 'b2_2', 'b2_3', 'b2_4',
      'b3_1', 'b3_2', 'b3_3', 'b3_4',
      'b4_1', 'b4_2', 'b4_3', 'b4_4'
    ];

    const parameters = [
      'main_steam_pressure', 'main_steam_flow', 'main_steam_temp', 'drum_level',
      'drum_pressure', 'id_fan_speed', 'id_fan_current', 'flue_gas_temp',
      'flue_gas_pressure_blr', 'flue_gas_pressure_idfan', 'eco_outlet_temp',
      'id_fan_igv_position', 'id_fan_de_temp', 'id_fan_nde_temp',
      'id_motor_de_temp', 'id_motor_nde_temp', 'id_motor_winding_temp',
      'vfd_drive_temp'
    ];

    const dynamicFields = [];
    boilers.forEach(boiler => {
      parameters.forEach(param => {
        dynamicFields.push(`${param}_${boiler}_r1`);
        dynamicFields.push(`${param}_${boiler}_r2`);
        dynamicFields.push(`${param}_${boiler}_r3`);
      });
    });

    const insertQuery = `
      INSERT INTO boilerandbop_damperstatus (
        shiftdate, shiftname,
        ${dynamicFields.join(', ')},
        createdby, updatedby
      ) VALUES (
        ${['$1', '$2', ...dynamicFields.map((_, i) => `$${i + 3}`), `$${dynamicFields.length + 3}`, `$${dynamicFields.length + 4}`].join(', ')}
      )
    `;

    const inputArray = [
      body.shiftdatestr,
      body.shiftname || "",
      ...dynamicFields.map(field => body[field] ?? null),
      body.updatedby || "",
      body.updatedby || ""
    ];

    await client.query(insertQuery, inputArray);

    console.log("Boiler & BOP data inserted successfully.");
    return res.status(200).json({ success: true, message: "Boiler & BOP insert successful" });

  } catch (error) {
    console.error("Boiler & BOP insert failed:", error);
    return res.status(500).json({ success: false, msg: "Insert failed", error });
  } finally {
    client.release();
  }
};


/**
 * Get boiler and BOP damper status data
 */
exports.getboilerandbop = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    console.log("Get Boiler BOP request:", body);

    const selectQuery = `
      SELECT * FROM boilerandbop_damperstatus
      WHERE shiftdate = $1 AND shiftname = $2 AND activeflag = true
      ORDER BY updateddate DESC
      LIMIT 1
    `;

    const result = await client.query(selectQuery, [body.shiftdate, body.shiftname]);

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
    console.error("Error in getboilerandbop:", error);
    return res.status(500).json({ success: false, message: "Fetch failed", error });
  } finally {
    client.release();
  }
};
