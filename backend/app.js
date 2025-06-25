const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server Running...");
});

// Mongo DB Connect
async function connectDB() {
  mongoose.connect("mongodb://localhost:27017/", { dbName: "e-comm-store-db" });
  // console.log("monogodb connected")
}

connectDB().catch((err) => {
  console.error(err);
});

// App Listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//----- API Start ------------------------------------------------
app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/product", verifyToken, isAdmin, productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth", authRoutes);
