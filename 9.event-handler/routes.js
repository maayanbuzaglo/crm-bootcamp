const express = require("express");
const router = express.Router();
const { Client } = require("@elastic/elasticsearch");
const bodyParser = require("body-parser").json();
const elasticClient = new Client({
  node: "http://localhost:9200",
});

let domEvents = [
  {
    click: 0,
  },
];

// var redis = require("redis");
// var publisher = redis.createClient();

router.post("/domEvents", bodyParser, (req, res) => {
  //   publisher.publish("notification", "test", function () {
  //     process.exit(0);
  //   });
  //   return;

  elasticClient
    .index({
      index: "events",
      type: "events",
      body: req.body,
    })
    .then((resp) => {
      return res.status(200).json({
        msg: "event indexed",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        msg: "Error",
        err,
      });
    });
});

module.exports = router;
