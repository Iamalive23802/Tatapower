const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");

/**
 * Insert Boiler Damper Status
 */
exports.insertboilerdamperstatus = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    console.log("Insert Boiler Damper body:", body);

    // Match frontend boiler keys exactly
    const boilers = [
      'b1_1', 'b1_2', 'b1_3', 'b1_4',
      'b2_1', 'b2_2', 'b2_3', 'b2_4',
      'b3_1', 'b3_2', 'b3_3', 'b3_4',
      'b4_1', 'b4_2', 'b4_3', 'b4_4'
    ];

    const dampers = ['inlet', 'bypass', 'outlet'];

    const fields = ['shiftdate', 'shiftname'];

    boilers.forEach(boiler => {
      dampers.forEach(damper => {
        fields.push(`${boiler}_${damper}_start`);
        fields.push(`${boiler}_${damper}_end`);
      });
    });

    // System fields
    fields.push('createdby', 'updatedby', 'activeflag', 'updateddate');

    const insertQuery = `
      INSERT INTO boiler_damper_status (
        ${fields.join(', ')}
      ) VALUES (
        ${fields.map((_, i) => `$${i + 1}`).join(', ')}
      )
    `;

    const inputArray = fields.map(field => {
      if (field === 'shiftdate') return body.shiftdate || body.shiftdatestr || null;
      if (field === 'createdby' || field === 'updatedby') return body.updatedby || null;
      if (field === 'activeflag') return true;
      if (field === 'updateddate') return new Date();
      return body[field] ?? null;
    });

    await client.query(insertQuery, inputArray);
    return res.status(200).json({ success: true, message: "Boiler damper data inserted successfully." });

  } catch (error) {
    console.error("Insert failed:", error);
    return res.status(500).json({ success: false, message: "Insert failed", error });
  } finally {
    client.release();
  }
};

/**
 * Get Boiler Damper Status by shift
 */
exports.getboilerdamperstatus = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    console.log("Get Boiler Damper body:", body);

    const shiftdate = body.shiftdate || body.shiftdatestr;
    const shiftname = body.shiftname;

    const query = `
      SELECT * FROM boiler_damper_status
      WHERE shiftdate = $1 AND shiftname = $2 AND activeflag = true
      ORDER BY updateddate DESC
      LIMIT 1
    `;

    const result = await client.query(query, [shiftdate, shiftname]);

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
    console.error("Fetch failed:", error);
    return res.status(500).json({ success: false, message: "Fetch failed", error });
  } finally {
    client.release();
  }
};
