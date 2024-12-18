const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Exemple de route GET
app.get('/', (req, res) => {
    res.send({ message: 'Bienvenue sur l\'API!' });
});

// Exemple de route POST
app.post('/data', (req, res) => {
    const { name } = req.body;
    res.send({ message: `Données reçues: ${name}` });
});

// Lancer le serveur sur le port 3000
app.listen(port, () => {
    console.log(`Le serveur est lancé sur http://localhost:${port}`);
});
