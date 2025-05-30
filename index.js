require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const admin = require('./config/firebase');

const app = express();

// Middlewares sécurité
app.use(helmet());
app.use(cors());
app.use(express.json());

// Exemple de route de test
app.get('/status', (req, res) => {
          res.json({ status: 'API TeamUp! OK' });
});

// TODO: Ajouter les routes métier ici (auth, events, messages, etc.)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
          console.log(`TeamUp! API server running on port ${PORT}`);
}); 