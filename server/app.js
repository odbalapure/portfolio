const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const fs = require("fs");

require("dotenv").config();

/* Configure SendGrid */
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SEND_GRID_TOKEN,
    },
  })
);

app.use(cors({ origin: "*" }));
app.use(express.json());

/**
 * @desc Home page
 */
app.get("/", (req, res) => {
  res.send(`
    <div>
      <h1>My portfolio website</h1>
      <h3>REST Endpoints</h3>
      <ul>
        <li><b>Download Resume</b>: /resume</li>
        <li><b>Send message via email</b>: /message</  li>
      </ul>
    </div>
  `);
});

/**
 * @desc Return resume
 */
app.get("/resume", (req, res) => {
  const data = fs.readFileSync("./assets/Om Balapure - 2.5 YOE - 2 Months Notice.pdf");
  res.contentType("application/pdf");
  res.send(data);
});

app.post("/message", async (req, res) => {
  try {
    transporter.sendMail({
      to: "odbalapure@gmail.com",
      from: "ombalapure@outlook.com",
      subject: "Message from portfolio!",
      html: `
        <div>${req.body.msg}</div>
        <br />
        <div>Thanks,</div>
        <div>${req.body.name}<div>
        <div>${req.body.email}</div>
      `,
    });

    res.status(201).json({ msg: "Message sent successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Message couldn't be sent, try again later!" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server listening on port ${port}...`));
