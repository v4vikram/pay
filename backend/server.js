const express = require("express");
const app = express();

const cors = require("cors");


const paymentRoutes = require("./routes/payment");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/payment", paymentRoutes);
app.get("/", (req, res) => {
  res.send("Payment API is running");
})
app.listen(4000, () => {
  console.log("Payment server is running on port 4000");
});