require("dotenv").config({ path: "./config.env" });
const express = require('express');
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const connection = process.env.MONGODB;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
const userRouter = require('./routes/User');
app.use('/user',userRouter);

const resourceRouter = require('./routes/Resource');
app.use('/resource',resourceRouter);
const slotRouter = require('./routes/Slot');
app.use('/slot',slotRouter);

const sessionRouter = require('./routes/Session');
app.use('/session',sessionRouter);

const eventRouter = require('./routes/Event');
app.use('/event',eventRouter);
const contactRouter = require('./routes/Contact');
app.use('/con',contactRouter);

const userdetailsRouter = require('./routes/Userdetail');
app.use('/userdetail',userdetailsRouter);

const slotsbookedRouter = require('./routes/SlotsBooked');
app.use('/slotbooked',slotsbookedRouter);

const statsRouter = require('./routes/Stats');
app.use('/stat',statsRouter);

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production') {
   
    app.use(express.static(path.join(__dirname, "client", "build")))
  
    app.get('*',(req, res) => {
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
  }
app.listen(PORT,()=>{
    console.log('Express Server Started');
});