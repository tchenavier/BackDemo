const express = require('express'); // var expresse prend expresse pour le http
const app = express(); // instasie expresse

app.use(express.static('public'));
app.use(express.json());

app.get('/login', (req, res) => { // C'est une route type get donc par navigateur
    res.send('page login');
});

app.get('/info', (req, res) => { // C'est une route mais type "get" donc que par formulaire
    res.json({ cle1: 'crée compte', cle2: '' }); // Requet json mieux compri par navigateur
});

app.post('/register', (req, res) => { // C'est une route mais type "post" donc que par formulaire
    console.log('Données reçues pour l\'inscription');
    console.log(req.body);
    res.send('crée compte');
});

app.listen(3000, () => { //express écoute sur le port 3000 et affiche un message dans le console
    console.log('server runing')
});  //Le poind virgule c'est juste pour dire la fin de la fonction