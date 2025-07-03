const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");

/**
 * Insert Boiler HPDP & Agitator data
 */
exports.insertboilerhpdpagitator = async (req, res) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    const { shiftdate, shiftname, rows, updatedby } = body;

    // Soft-delete existing rows
    await client.query(
      `UPDATE boiler_hpdp_agitator SET activeflag = false WHERE shiftdate = $1 AND shiftname = $2`,
      [shiftdate, shiftname]
    );

    // Build dynamic insert query
    const insertQuery = `
      INSERT INTO boiler_hpdp_agitator (
        shiftdate, shiftname,
        boiler2_1_hpdp1, boiler2_1_hpdp2, boiler2_1_agitator,
        boiler3_1_hpdp1, boiler3_1_hpdp2, boiler3_1_agitator,
        boiler4_1_hpdp1, boiler4_1_hpdp2, boiler4_1_agitator,
        createdby, updatedby
      )
      VALUES
      ${rows.map((_, i) => {
        const offset = i * 13;
        return `(
          $${1 + offset}, $${2 + offset}, $${3 + offset}, $${4 + offset}, $${5 + offset},
          $${6 + offset}, $${7 + offset}, $${8 + offset}, $${9 + offset}, $${10 + offset},
          $${11 + offset}, $${12 + offset}, $${13 + offset}
        )`;
      }).join(',')}
    `;

    // Prepare values
    const finalValues = [];

    for (const row of rows) {
      finalValues.push(
        shiftdate, shiftname,
        row.boiler2_1_hpdp1,
        row.boiler2_1_hpdp2,
        row.boiler2_1_agitator,
        row.boiler3_1_hpdp1,
        row.boiler3_1_hpdp2,
        row.boiler3_1_agitator,
        row.boiler4_1_hpdp1,
        row.boiler4_1_hpdp2,
        row.boiler4_1_agitator,
        updatedby,
        updatedby
      );
    }

    await client.query(insertQuery, finalValues);

    return res.status(200).json({ success: true, message: 'Inserted successfully' });
  } catch (error) {
    console.error('Insert boiler HPDP Agitator failed:', error);
    return res.status(500).json({ success: false, message: 'Insert failed', error });
  } finally {
    client.release();
  }
};

/**
 * Fetch Boiler HPDP & Agitator data
 */
exports.getboilerhpdpagitator = async (req, res) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    const { shiftdate, shiftname } = body;

    const result = await client.query(
      `SELECT * FROM boiler_hpdp_agitator WHERE shiftdate = $1 AND shiftname = $2 AND activeflag = true ORDER BY updateddate ASC`,
      [shiftdate, shiftname]
    );

    return res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get boiler HPDP Agitator failed:', error);
    return res.status(500).json({ success: false, message: 'Fetch failed', error });
  } finally {
    client.release();
  }
};
