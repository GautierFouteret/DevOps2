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

// Route pour ajouter une tâche
app.post('/tasks', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).send({ error: 'Le champ task est requis.' });
    }
    res.status(201).send({ message: `Tâche ajoutée: ${task}` });
});

// Exemple de base de données de tâches en mémoire
const tasks = [
  { id: 1, task: 'Acheter du lait' },
  { id: 2, task: 'Faire les courses' }
];

// Route pour supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).send({ error: 'Tâche non trouvée.' });
    }

    tasks.splice(taskIndex, 1); // Suppression de la tâche par son index
    res.status(200).send({ message: `Tâche avec l'ID ${id} supprimée.` });
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

    it('Devrait ajouter une nouvelle tâche', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ task: 'Acheter du lait' }) // Envoi du body
            .set('Content-Type', 'application/json'); // Définir le type de contenu

        expect(response.status).toBe(201); // Vérifie le code HTTP (201 Created)
        expect(response.body).toEqual({ message: 'Tâche ajoutée: Acheter du lait' }); // Vérifie la réponse
    });

    it('Devrait pouvoir supprimer une tâche', async () => {
        // Supposons que la tâche avec l'ID 1 existe et que nous la supprimons
        const response = await request(app)
            .delete('/tasks/1') // ID de la tâche à supprimer
            .set('Content-Type', 'application/json'); // Définir le type de contenu
        
        expect(response.status).toBe(200); // Vérifie que la tâche a bien été supprimée
        expect(response.body).toEqual({ message: "Tâche avec l'ID 1 supprimée." }); // Vérifie la réponse
        
        // Vérifie que la tâche a bien été supprimée (en option, selon la logique de votre base de données)
        const taskResponse = await request(app).get('/tasks');
        expect(taskResponse.body).not.toContainEqual({ id: 1, task: 'Acheter du lait' });
    });

    it('Devrait retourner une erreur si la tâche à supprimer n\'existe pas', async () => {
        const response = await request(app)
            .delete('/tasks/999') // ID inexistant
            .set('Content-Type', 'application/json');
        
        expect(response.status).toBe(404); // Vérifie que la tâche n'a pas été trouvée
        expect(response.body).toEqual({ error: 'Tâche non trouvée.' }); // Vérifie la réponse
    });
});
