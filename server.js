const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const sgMail = require("@sendgrid/mail");
require("dotenv/config");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  console.log(req.url);
  next();
});
app.post("/sendemail", (req, res) => {
  console.log(req.body);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: req.body.email,
    from: "skillatriauser@gmail.com", // Use the email address or domain you verified above
    subject: "Response from Thrina Akpala",
    // text: req.body.message,
    html: `<div><p>Hello ${req.body.name}</p><p>Thank you for contacting us. We will get back to you shortly</p> <p>Regards, Thrina</p></div>`,
  };
//   const msg2 = {
//     to:"skillatriauser@gmail.com",
//     subm
//   }
  //ES6
  sgMail.send(msg).then(
    () => {
      res.send("Thank you for submitting the form");
    },
    (error) => {
      console.error(error);
      res.status(400).send("error occured");
      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
});
app.get("/", (req, res) => {
  res.render("contact");
});
// app.use("/product", productsRoutes);

// app.use("/", (req, res) => {
//     res.render("home", {user: "Ishaq"});
// });

app.listen(3000, () => {
  console.log("server running");
});
