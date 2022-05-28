const express = require("express");
const cors = require("cors");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const verify = require("jsonwebtoken/verify");
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

function verifyJWT(req, res, next) {
  //* reading header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }
    console.log(decoded);
    req.decoded = decoded;
    next();
  });
}
// * ========= mongoDB =====================

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sufxl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.get("/", (req, res) => {
  res.send("Hello From computer parts!");
});

app.listen(port, () => {
  console.log(` App listening on port ${port}`);
});
