const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");

/**
 * Insert Boiler ID Fan Status
 */
exports.insertboileridfanstatus = async (req, res) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);

    const { shiftdate, shiftname, updatedby, ...statusFields } = body;

    // Soft delete existing
    await client.query(
      `UPDATE boiler_idfan_status SET activeflag = false WHERE shiftdate = $1 AND shiftname = $2`,
      [shiftdate, shiftname]
    );

    // Build dynamic field list and value placeholders
    const keys = Object.keys(statusFields);
    const fields = ['shiftdate', 'shiftname', ...keys, 'createdby', 'updatedby'];
    const placeholders = fields.map((_, i) => `$${i + 1}`);

    const values = [
      shiftdate,
      shiftname,
      ...keys.map(k => statusFields[k]),
      updatedby,
      updatedby
    ];

    const insertQuery = `
      INSERT INTO boiler_idfan_status (${fields.join(', ')})
      VALUES (${placeholders.join(', ')})
    `;

    await client.query(insertQuery, values);

    return res.status(200).json({ success: true, message: "Inserted successfully" });
  } catch (error) {
    console.error("Insert boiler ID Fan Status failed:", error);
    return res.status(500).json({ success: false, message: "Insert failed", error });
  } finally {
    client.release();
  }
};

/**
 * Fetch Boiler ID Fan Status
 */
exports.getboileridfanstatus = async (req, res) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    const { shiftdate, shiftname } = body;

    const result = await client.query(
      `SELECT * FROM boiler_idfan_status WHERE shiftdate = $1 AND shiftname = $2 AND activeflag = true ORDER BY updateddate DESC LIMIT 1`,
      [shiftdate, shiftname]
    );

    return res.status(200).json({
      success: true,
      data: result.rows[0] || null
    });
  } catch (error) {
    console.error("Fetch boiler ID Fan Status failed:", error);
    return res.status(500).json({ success: false, message: "Fetch failed", error });
  } finally {
    client.release();
  }
};
