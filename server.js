// configuração inicial
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// read JSON / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
//rota api
const pizzaRoutes = require("./routes/pizzaRoutes");

app.use("/pizza", pizzaRoutes);

// endpoint
app.get("/", (req, res) => {
  // mostrar req

  res.json({ message: "express: OK" });
});
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

// PORT
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster.3zkcikj.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
