const express = require('express')
const app = express()
const port = 3000
const mongoose=require("mongoose")
const userRoute=require('./routes/userRoute');
var cors=require("cors");
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(userRoute);
async function connectDb() {
    mongoose.connect("mongodb://localhost:27017/",{
        dbName:"UsersDb",
    });
}
connectDb().catch((err)=>console.error(err));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})