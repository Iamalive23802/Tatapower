const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");

/**
 * Insert BOP logsheet data
 */
exports.insertBopLogsheet = async (req, res) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);

    const { shiftdate, shiftname, shiftdatestr } = body;

    const form = {
      shiftdate,
      shiftname,
      shiftdatestr,
      ...body.bfpStatus,
      ...body.acwStatus,
      ...body.boosterPumpStatus,
      ...body.hotwellPumpStatus,
      ...body.boilerFillPumpStatus,
      ...body.compressorStatus,
      createdby: body.updatedby || null,
      updatedby: body.updatedby || null,
      activeflag: true,
      updateddate: new Date()
    };

    const mapRows = (arr, prefix, keys) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((row, i) => {
        const idx = i + 1;
        keys.forEach(k => {
          form[`${prefix}${idx}_${k}`] = row[k];
        });
      });
    };

    mapRows(body.bfpUnit1and2Arr, 'bfp_row', [
      'parameter',
      'unit',
      'bfp1a',
      'bfp1b',
      'bfp1c',
      'bfp2a',
      'bfp2b',
      'bfp2c',
      'bfp3a',
      'bfp3b',
      'bfp3c'
    ]);

    mapRows(body.acwArr, 'acw_row', [
      'parameter',
      'unit',
      'acw1a',
      'acw1b',
      'acw2a',
      'acw2b',
      'acw3a',
      'acw3b'
    ]);

    mapRows(body.cwpArr, 'cwp_row', [
      'parameter',
      'unit',
      'cwpa',
      'cwpb',
      'cwpc',
      'cwpd'
    ]);

    mapRows(body.ctfansArr, 'ctfan', [
      'name',
      'status',
      'current',
      'unit',
      'lhs',
      'rhs'
    ]);

    mapRows(body.valvePosArr, 'valve_row', ['unit', 'lhs', 'rhs']);

    mapRows(body.conductivityArr, 'cond_row', [
      'parameter',
      'limit',
      'unit1',
      'unit2',
      'unit3'
    ]);

    mapRows(body.roomTempsArr, 'roomtemp_row', [
      'name',
      'temp',
      'shiftstart',
      'shiftend'
    ]);

    mapRows(body.serviceWaterPumpLevels, 'swp_row', [
      'name',
      'shiftstart',
      'shiftend'
    ]);

    Object.keys(form).forEach(key => {
      if (form[key] === '') form[key] = null;
    });

    const keys = Object.keys(form);
    const values = Object.values(form);
    const placeholders = keys.map((_, i) => `$${i + 1}`);

    const query = `
      INSERT INTO bop_logsheet (${keys.join(', ')})
      VALUES (${placeholders.join(', ')})
    `;

    await client.query(query, values);

    res.status(200).json({ success: true, message: 'BOP logsheet inserted.' });
  } catch (err) {
    console.error('Insert BOP logsheet error:', err);
    res.status(500).json({ success: false, message: 'Insert failed.' });
  } finally {
    client.release();
  }
};

/**
 * Get latest BOP logsheet data for a shift
 */
exports.getBopLogsheet = async (req, res) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);
    const { shiftdatestr, shiftname } = body;

    const query = `
      SELECT * FROM bop_logsheet
      WHERE shiftdate = $1 AND shiftname = $2 AND activeflag = true
      ORDER BY updateddate DESC LIMIT 1
    `;

    const result = await client.query(query, [shiftdatestr, shiftname]);

    if (result.rows.length > 0) {
      res.json({ success: true, data: result.rows[0] });
    } else {
      res.json({ success: false, message: 'No data found for this shift.' });
    }
  } catch (err) {
    console.error('Fetch BOP logsheet error:', err);
    res.status(500).json({ success: false, message: 'Fetch failed.' });
  } finally {
    client.release();
  }
};
