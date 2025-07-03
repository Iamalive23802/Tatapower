const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");

// INSERT controller for tgdcs_auxeqp
exports.insertAuxEqp = async (req, res) => {
  const client = await pool.connect();
  try {
    const decrypted = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decrypted);
    console.log('Decrypted insert payload received.');

    const shiftdate = new Date(body.shiftdate).toISOString().slice(0, 10);
    const shiftname = body.shiftname;
    const now = new Date();
    const keys = Object.keys(body).filter(k => !['shiftdate', 'shiftname']);
    const columns = ['shiftdate', 'shiftname', ...keys, 'activeflag', 'updateddate'];
    const placeholders = columns.map((_, i) => `$${i + 1}`);
    const values = [shiftdate, shiftname, ...keys.map(k => body[k]), true, now];

    const insertQuery = `
      INSERT INTO tgdcs_auxeqp (${columns.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *;
    `;

    const result = await client.query(insertQuery, values);
    console.log('Insert successful for shift:', shiftdate, shiftname);

    res.status(200).json({
      success: true,
      data: result.rows[0],
      message: 'Inserted successfully.'
    });

  } catch (err) {
    console.error('Insert error:', err.stack || err.message);
    res.status(500).json({
      success: false,
      message: 'Insert failed',
      error: err.message
    });
  } finally {
    client.release();
  }
};

// GET controller tgdcs_auxeqp
exports.getAuxEqp = async (req, res) => {
  const client = await pool.connect();
  try {
    const decrypted = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decrypted);

    const shiftdate = new Date(body.shiftdate).toISOString().slice(0, 10);
    const shiftname = body.shiftname;

    const selectQuery = `
      SELECT * FROM tgdcs_auxeqp
      WHERE shiftdate = $1 AND shiftname = $2 AND activeflag = true
      ORDER BY updateddate DESC
      LIMIT 1;
    `;

    const result = await client.query(selectQuery, [shiftdate, shiftname]);

    if (result.rows.length > 0) {
      console.log('Data fetched for shift:', shiftdate, shiftname);
      res.status(200).json({
        success: true,
        data: result.rows[0]
      });
    } else {
      res.status(200).json({
        success: false,
        data: null,
        message: 'No record found for the specified shift.'
      });
    }

  } catch (err) {
    console.error('Fetch error:', err.stack || err.message);
    res.status(500).json({
      success: false,
      message: 'Fetch failed',
      error: err.message
    });
  } finally {
    client.release();
  }
};
