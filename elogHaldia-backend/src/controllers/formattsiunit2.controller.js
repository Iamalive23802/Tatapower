const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");

/**
 * Insert data for TSI Unit 2
 */
exports.inserttsiunit2 = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    console.log("Insert TSI Unit 2 body:", body);

    const fields = [
      'shiftdate', 'shiftname',
      ...['1', '2', '3'].flatMap(num => [
        `thrust_nonactive_top_${num}`, `thrust_nonactive_bottom_${num}`,
        `thrust_active_top_${num}`, `thrust_active_bottom_${num}`,
        `turb_front_vib_top_${num}`, `turb_front_vib_bottom_${num}`,
        `turb_front_temp_top_${num}`, `turb_front_temp_bottom_${num}`,
        `turb_rear_temp_top_${num}`, `turb_rear_temp_bottom_${num}`,
        `turb_rear_vib_top_${num}`, `turb_rear_vib_bottom_${num}`,
        `gen_front_vib_top_${num}`, `gen_front_vib_bottom_${num}`,
        `gen_front_temp_top_${num}`, `gen_front_temp_bottom_${num}`,
        `gen_rear_vib_top_${num}`, `gen_rear_vib_bottom_${num}`,
        `gen_rear_temp_top_${num}`, `gen_rear_temp_bottom_${num}`
      ]),
      'createdby', 'updatedby'
    ];

    const insertquery = `
      INSERT INTO tgdcs_tsiunit2 (
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
    return res.status(200).json({ success: true, message: "TSI Unit 2 insert successful" });

  } catch (error) {
    console.error("TSI Unit 2 insert failed:", error);
    return res.status(200).json({ success: false, msg: "Insert failed", error });
  } finally {
    client.release();
  }
};

/**
 * Get data for TSI Unit 2
 */
exports.gettsiunit2 = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    console.log("gettsiunit2", body);

    const selectquery = `
      SELECT * FROM tgdcs_tsiunit2
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
    console.error("Error in gettsiunit2:", error);
    return res.status(500).json({ success: false, message: "Fetch failed", error });
  } finally {
    client.release();
  }
};
