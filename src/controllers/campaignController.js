const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class campaignController {
  async createCampaign(req, res) {
    const { videoUrl, startTime, endTime } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO campaigns (video_url, start_time, end_time) VALUES ($1, $2, $3) RETURNING *;",
        [videoUrl, startTime, endTime]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  async getCampaigns(req, res) {
    try {
      const result = await pool.query("SELECT * FROM campaigns;");
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  async getOneCampaign(req, res) {
    const { id } = req.params;
    const { videoUrl, startTime, endTime } = req.body;
    try {
      const result = await pool.query(
        "UPDATE campaigns SET video_url = $1, start_time = $2, end_time = $3 WHERE id = $4 RETURNING *;",
        [videoUrl, startTime, endTime, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).send("Campaign not found");
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  async updateCampaign(req, res) {
    const { id } = req.params;
    const { videoUrl, startTime, endTime } = req.body;
    try {
      const result = await pool.query(
        "UPDATE campaigns SET video_url = $1, start_time = $2, end_time = $3 WHERE id = $4 RETURNING *;",
        [videoUrl, startTime, endTime, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).send("Campaign not found");
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  async deleteCampaign(req, res) {
    const { id } = req.params;
    try {
      const result = await pool.query(
        "DELETE FROM campaigns WHERE id = $1 RETURNING *;",
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).send("Campaign not found");
      }
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
}

module.exports = new campaignController();
