const { pool } = require("../utilities/dbconfig");
const crypto = require("./crypto");

/**
 * Insert a new Islanding entry (always adds, never overwrites)
 */
exports.insertIsisLanding = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decryptedBody = await crypto.decipher(req.body.encryptedbody);
    const body = JSON.parse(decryptedBody);

    const {
      shiftdate,
      shiftname,
      dc1_light,
      dc2_light,
      dc_source_switch,
      pt_switch,
      relay_main1,
      relay_main2,
      microm_relay,
      main1_relay_95a1,
      main1_relay_95b1,
      main1_relay_95c1,
      main2_relay_95a1,
      main2_relay_95b1,
      main2_relay_95c1,
      selector_unit1,
      selector_unit2,
      selector_feedback,
      speed_ctrl_off,
      boiler_selected,
      createdby = "system",
      updatedby = "system"
    } = body;

    const query = `
      INSERT INTO tgdcs_isislanding (
        shiftdate, shiftname,
        dc1_light, dc2_light, dc_source_switch, pt_switch,
        relay_main1, relay_main2, microm_relay,
        main1_relay_95a1, main1_relay_95b1, main1_relay_95c1,
        main2_relay_95a1, main2_relay_95b1, main2_relay_95c1,
        selector_unit1, selector_unit2, selector_feedback,
        speed_ctrl_off, boiler_selected,
        createdby, updatedby
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9,
        $10, $11, $12,
        $13, $14, $15,
        $16, $17, $18,
        $19, $20,
        $21, $22
      )
    `;

    const values = [
      shiftdate, shiftname,
      dc1_light, dc2_light, dc_source_switch, pt_switch,
      relay_main1, relay_main2, microm_relay,
      main1_relay_95a1, main1_relay_95b1, main1_relay_95c1,
      main2_relay_95a1, main2_relay_95b1, main2_relay_95c1,
      selector_unit1, selector_unit2, selector_feedback,
      speed_ctrl_off, boiler_selected,
      createdby, updatedby
    ];

    await client.query(query, values);
    res.json({ success: true, message: "Islanding data inserted successfully." });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ success: false, message: "Insert failed", error: err.message });
  } finally {
    client.release();
  }
};

/**
 * Get latest Islanding data by shift
 */
exports.getIsisLanding = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const decrypted = await crypto.decipher(req.body.encryptedbody);
    const { shiftdate, shiftname } = JSON.parse(decrypted);

    const query = `
      SELECT * FROM tgdcs_isislanding
      WHERE shiftdate = $1 AND shiftname = $2
      ORDER BY createddate DESC
      LIMIT 1
    `;

    const result = await client.query(query, [shiftdate, shiftname]);

    if (result.rows.length > 0) {
      res.json({ success: true, data: result.rows[0] });
    } else {
      res.json({ success: true, data: null, message: "No record found for the specified shift." });
    }
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, message: "Fetch failed", error: err.message });
  } finally {
    client.release();
  }
};
