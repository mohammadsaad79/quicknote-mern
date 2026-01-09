require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connecDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const contactRoutes = require('./routes/contactRoutes');
const app = express();
connecDB();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://quicknote-mern.vercel.app"
  ],
  credentials: true,
}));
app.use(express.json());

app.use('/api', noteRoutes);
app.use('/api', userRoutes);
app.use('/api', contactRoutes);

app.get('/', (req, res) => {
    res.send('QuickNote API is working...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});