const express = require("express");
const app = express();
const port = 1004;

const router = require("./routes");

/* router */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

/* views */
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views")); // 정적파일 적용 css,js,image

/* views mapping */
app.get("/", (req, res) => {
  res.render("index.ejs", { components: "login" });
});
app.get("/register", (req, res) => {
  res.render("index.ejs", { components: "register" });
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

module.exports = app;
