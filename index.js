const express = require('express');
const connectDB = require('./src/db/connect');
const cors = require('cors');
require('dotenv').config();

// auth
const authRoutes = require('./src/route/auth')
const videoRoutes = require('./src/route/videos')



const app = express();

app.use(express.json());

const port = process.env.PORT || 3410

const corsOptions = {
  origin: 'https://dmitryfrontender.github.io/adinspiration',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/video', videoRoutes);
app.get('/', (req, res) => {
  res.send('Hello Wlcome to adinspiration api!');
});



const start = async () => {
  try {
    await connectDB(process.env.MANGO_URL)
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
    console.log('connected to db');
    
  } catch (error) {
    console.log(error, 'me');
  }
};

start();