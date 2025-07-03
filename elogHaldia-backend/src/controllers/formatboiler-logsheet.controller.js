const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");

/**
 * Insert
 */
exports.insertBoilerAndBop = async (req, res) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);

    const { shiftdate, shiftname, shiftdatestr, ...readings } = body;

    const columns = ['shiftdate', 'shiftname', 'shiftdatestr', ...Object.keys(readings)];
    const values = [shiftdate, shiftname, shiftdatestr, ...Object.values(readings)];
    const placeholders = columns.map((_, i) => `$${i + 1}`);

    const query = `
      INSERT INTO boilerandbop_logsheet (${columns.join(', ')})
      VALUES (${placeholders.join(', ')})
    `;

    await client.query(query, values);
    res.json({ success: true, message: "New Boiler & BOP entry saved." });
  } catch (err) {
    console.error("Insert BoilerBOP Error:", err);
    res.status(500).json({ success: false, message: "Insert failed." });
  } finally {
    client.release();
  }
};

/**
 * Get the latest entry for a given shift
 */
exports.getBoilerAndBop = async (req, res) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    const { shiftdate, shiftname } = body;

    const query = `
      SELECT * FROM boilerandbop_logsheet
      WHERE shiftdate = $1 AND shiftname = $2
      ORDER BY created_at DESC
      LIMIT 1
    `;

    const result = await client.query(query, [shiftdate, shiftname]);

    if (result.rows.length > 0) {
      res.json({ success: true, data: result.rows[0] });
    } else {
      res.json({ success: false, message: "No data found for this shift." });
    }
  } catch (err) {
    console.error("Fetch BoilerBOP Error:", err);
    res.status(500).json({ success: false, message: "Fetch failed." });
  } finally {
    client.release();
  }
};
