const express = require("express");
const app = express();
const connectDB = require("../db/connect");
const student = require("../model/student");
const User = require("../model/user");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(
  session({
    secret: "secret",
  })
);

app.use(bodyParser.urlencoded({}));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/getListUser", async (req, res) => {
  const data = await student.find();
  if (!data) return res.json({ success: false, msg: "cannot load list user" });
  return res.json({
    success: true,
    msg: "Get list user success",
    listUser: data,
  });
});

app.post("/login", async (req, res) => {
  const data = req.body;
  // console.log(data)
  const user = await User.findOne({ username: data.username });
  console.log(user);
  if (user === null || user === undefined)
    return res.json({ success: false, msg: "This user is not exists" });
  req.session.username = user.username;
  return res.json({ success: true, msg: "Login success" });
});

app.post("/addNewStudent", async (req, res) => {
  const data = req.body;
  const isExist = await student.findOne({ id: data.id });
  if (isExist)
    return res.json({
      success: false,
      msg: "Create student fail this student is exists",
    });
  student.create({
    id: data.id,
    name: data.name,
    major: data.major,
    age: data.age,
    address: data.address,
    phone: data.phone,
  });
  return res.json({ success: true, msg: "Create student success" });
});

app.delete("/deleteStudent/:id", async (req, res) => {
  const id = req.params.id;
  const isExist = await student.findOne({ id: id });
  if (isExist === undefined || isExist === null)
    return res.json({
      success: false,
      msg: `Delete student id ${id} fail, not exist in database`,
    });
  isExist.deleteOne();
  return res.json({ success: true, msg: `Delete student id ${id} success` });
});

app.put("/updateStudent/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const isExist = await student.findOne({ id: id });
  if (isExist === undefined || isExist === null)
    return res.json({
      success: false,
      msg: `Update student id ${id} fail, not exist in database`,
    });
  isExist.name = data.name;
  isExist.major = data.major;
  isExist.age = data.age;
  isExist.address = data.address;
  isExist.phone = data.phone;
  isExist.save();
  return res.json({ success: true, msg: `Update student id ${id} success` });
});

app.get("/getDetails/:id", async (req, res) => {
  const id = req.params.id;
  const isExist = await student.findById({ _id: id });

  console.log(`id here: ${id}`);
  if (isExist === undefined || isExist === null)
    return res.json({
      success: false,
      msg: `Get student id ${id} fail, not exist in database`,
    });
  return res.json({
    success: true,
    msg: `Get student id ${id} success`,
    data: isExist,
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000);
    console.log("server listen 5000");
  } catch (error) {
    console.log(`Something went wrong! ${error}`);
  }
};

start();
