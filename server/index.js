const keys = require("./keys");

const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// express
app.use(cors());
app.use(bodyParser.json());

// pg

const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on("error", () => console.log("Lost PG conn..."));

pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT)")
  .catch(err => console.log(err));

// redis

const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// express routes

app.get("/health", (req, res) => res.send("ok"));

app.get("/values/all", async (req, res) => {
  console.log("in here");
  try {
    const values = await pgClient.query("SELECT * FROM values");

    res.send(values.rows);
  } catch (err) {
    console.log("Error Occured!", err);
    res.send(err);
  }
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const { index } = req.body;
  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high");
  }

  redisClient.hset("values", index, "Nothing yet!");
  redisPublisher.publish("insert", index);

  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  res.send({ working: true });
});

app.listen(5000, err => {
  console.log("listening to 5000");
});
