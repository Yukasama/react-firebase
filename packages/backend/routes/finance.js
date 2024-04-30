const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const FMP_API_KEY = process.env.FMP_API_KEY;
const FMP_API_URL = process.env.FMP_API_URL;

const routesList = {
  "income-statement": `/v3/income-statement/AAPL?limit=120&apikey=${FMP_API_KEY}`,
  "balance-sheet": `/v3/balance-sheet/AAPL?limit=120&apikey=${FMP_API_KEY}`,
};

const instance = axios.create({
  baseURL: FMP_API_URL,
});

router.get("/profile/:symbol", (req, res) => {
  const symbol = req.params.symbol;
  return instance
    .get(`/v3/profile/${symbol}?limit=120&apikey=${FMP_API_KEY}`)
    .then((response) => {
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
