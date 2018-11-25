const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRouter = require('./routes/avatars');
const followerRouter = require('./routes/followers');
const app = express();
require('dotenv').load();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/frontend')));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname,'/dist/frontend/index.html'));
});;

app.use('/avatars', apiRouter);
app.use('/followers', followerRouter);

const PORT = '4000';
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}...`);
  console.log('press cntrl "c" to stop server.');
});
