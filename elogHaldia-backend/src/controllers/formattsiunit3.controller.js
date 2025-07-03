const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");

/**
 * Insert data for TSI Unit 3
 */
exports.inserttsiunit3 = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    console.log("Insert TSI Unit 3 body:", body);

    const fields = [
      'shiftdate', 'shiftname',

      'thrust_nonactive_top_1', 'thrust_nonactive_top_2', 'thrust_nonactive_top_3',
      'thrust_nonactive_bottom_1', 'thrust_nonactive_bottom_2', 'thrust_nonactive_bottom_3',
      'thrust_active_top_1', 'thrust_active_top_2', 'thrust_active_top_3',
      'thrust_active_bottom_1', 'thrust_active_bottom_2', 'thrust_active_bottom_3',

      'turb_front_vib_top_1', 'turb_front_vib_top_2', 'turb_front_vib_top_3',
      'turb_front_vib_bottom_1', 'turb_front_vib_bottom_2', 'turb_front_vib_bottom_3',
      'turb_front_temp_top_1', 'turb_front_temp_top_2', 'turb_front_temp_top_3',
      'turb_front_temp_lhs_1', 'turb_front_temp_lhs_2', 'turb_front_temp_lhs_3',

      'turb_rear_temp_lhs_1', 'turb_rear_temp_lhs_2', 'turb_rear_temp_lhs_3',
      'turb_rear_temp_rhs_1', 'turb_rear_temp_rhs_2', 'turb_rear_temp_rhs_3',
      'turb_rear_vib_top_1', 'turb_rear_vib_top_2', 'turb_rear_vib_top_3',
      'turb_rear_vib_bottom_1', 'turb_rear_vib_bottom_2', 'turb_rear_vib_bottom_3',

      'gear_temp1_lss_1', 'gear_temp1_lss_2', 'gear_temp1_lss_3',
      'gear_temp2_lss_1', 'gear_temp2_lss_2', 'gear_temp2_lss_3',
      'gear_temp3_lss_1', 'gear_temp3_lss_2', 'gear_temp3_lss_3',

      'gear_vib1_lss_1', 'gear_vib1_lss_2', 'gear_vib1_lss_3',
      'gear_vib2_lss_1', 'gear_vib2_lss_2', 'gear_vib2_lss_3',

      'gear_vib1_hss_1', 'gear_vib1_hss_2', 'gear_vib1_hss_3',
      'gear_vib2_hss_1', 'gear_vib2_hss_2', 'gear_vib2_hss_3',

      'gear_temp1_hss_1', 'gear_temp1_hss_2', 'gear_temp1_hss_3',
      'gear_temp2_hss_1', 'gear_temp2_hss_2', 'gear_temp2_hss_3',
      'gear_temp3_hss_1', 'gear_temp3_hss_2', 'gear_temp3_hss_3',

      'gen_front_vib_top_1', 'gen_front_vib_top_2', 'gen_front_vib_top_3',
      'gen_front_vib_bottom_1', 'gen_front_vib_bottom_2', 'gen_front_vib_bottom_3',
      'gen_front_temp_active_1', 'gen_front_temp_active_2', 'gen_front_temp_active_3',
      'gen_front_temp_nonactive_1', 'gen_front_temp_nonactive_2', 'gen_front_temp_nonactive_3',
      'gen_rear_vib_top_1', 'gen_rear_vib_top_2', 'gen_rear_vib_top_3',
      'gen_rear_vib_bottom_1', 'gen_rear_vib_bottom_2', 'gen_rear_vib_bottom_3',
      'gen_rear_temp_top_1', 'gen_rear_temp_top_2', 'gen_rear_temp_top_3',
      'gen_rear_temp_bottom_1', 'gen_rear_temp_bottom_2', 'gen_rear_temp_bottom_3',

      'createdby', 'updatedby'
    ];

    const insertquery = `
      INSERT INTO tgdcs_tsiunit3 (
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
    return res.status(200).json({ success: true, message: "TSI Unit 3 insert successful" });

  } catch (error) {
    console.error("TSI Unit 3 insert failed:", error);
    return res.status(200).json({ success: false, msg: "Insert failed", error });
  } finally {
    client.release();
  }
};

/**
 * Get data for TSI Unit 3
 */
exports.gettsiunit3 = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    console.log("gettsiunit3", body);

    const selectquery = `
      SELECT * FROM tgdcs_tsiunit3
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
    console.error("Error in gettsiunit3:", error);
    return res.status(500).json({ success: false, message: "Fetch failed", error });
  } finally {
    client.release();
  }
};
