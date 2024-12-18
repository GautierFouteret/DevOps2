const request = require('supertest');
const express = require('express');
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes définies dans votre API
app.post('/data', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send({ error: 'Le champ name est requis.' });
    }
    res.send({ message: `Données reçues: ${name}` });
});

describe('Tests de l\'API', () => {
    it('Devrait retourner un message avec le champ name envoyé', async () => {
        const response = await request(app)
            .post('/data')
            .send({ name: 'test' }) // Envoi du body
            .set('Content-Type', 'application/json'); // Définir le type de contenu
        
        expect(response.status).toBe(200); // Vérifie le code HTTP
        expect(response.body).toEqual({ message: 'Données reçues: test' }); // Vérifie la réponse
    });

    it('Devrait retourner une erreur si le champ name est absent', async () => {
        const response = await request(app)
            .post('/data')
            .send({}) // Envoi d'un body vide
            .set('Content-Type', 'application/json'); // Définir le type de contenu
        
        expect(response.status).toBe(400); // Vérifie le code HTTP
        expect(response.body).toEqual({ error: 'Le champ name est requis.' }); // Vérifie la réponse
    });
});
