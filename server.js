const express = require ('express'); // var expresse prend expresse pour le http
const app = express(); // instasie expresse

app.get('/login', (req, res) => { // C'est une route get donc par navigateur
    res.send('page login');
});

app.post('/register', (req, res) => { // C'est une route mais poste donc que par formulaire
    res.send('crée compte');
});

app.listen(3000, () => { //express écoute sur le port 3000 et affiche un message dans le console
    console.log('server runing')
});  