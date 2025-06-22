const express = require('express')
const mongoose = require("mongoose");
const app = express()
const port = 3000
const cors = require("cors")
const categoryRoutes = require("./routes/category")
const brandRoutes = require("./routes/brand")
const productRoutes = require("./routes/product")
const customerRoutes = require("./routes/customer")

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Server Running...')
})

// Mongo DB Connect
async function connectDB() {
  mongoose.connect("mongodb://localhost:27017/", {dbName:"e-comm-store-db"})  
  // console.log("monogodb connected")
}

connectDB().catch((err)=>{
  console.error(err)
})

// App Listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//----- API Start ------------------------------------------------
app.use("/category",categoryRoutes)
app.use("/brand",brandRoutes)
app.use("/product",productRoutes)
app.use("/customer",customerRoutes)