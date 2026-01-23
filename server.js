const express = require('express'); // var expresse prend expresse pour le http
const app = express(); // instasie expresse
const mysql = require('mysql2');
/*require('dotenv').config();
const Utilisateur = process.acce.env.Utilisateur;
const Mot_Passe = process.acce.env.Mot_Passe;
const Table = process.acce.env.Table;
const Adresse = process.acce.env.Adresse;*/

const connection = mysql.createConnection({
    host: '172.29.18.130',//localhost si votre node est sur la même VM que votre Bdd
    user: '',//non utilisateur
    password: '',//son mode de passe
    database: 'Teste'//table viser
    /*host: Adresse,//localhost si votre node est sur la même VM que votre Bdd
    user: Utilisateur,//non utilisateur
    password: Mot_Passe,//son mode de passe
    database: Table//table viser*/
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL.');
});

app.use(express.static('public'));
app.use(express.json());

app.get('/login', (req, res) => { // C'est une route type get donc par navigateur
    res.send('page login');
});

app.get('/info', (req, res) => { // C'est une route mais type "get" donc que par formulaire
    res.json({ cle1: 'crée compte', cle2: 'no' }); // Requet json mieux compri par navigateur
});
// Partie d'ajoue et de lecture 
app.post('/register', (req, res) => { // C'est une route mais type "post" donc que par formulaire
    console.log('Données reçues pour l\'inscription');
    console.log(req.body);
    connection.query( //sert a envoyer les donner au serveur
        'INSERT INTO user (`login`, `pasword`) VALUES (?,?)',
        [req.body.loginValue,req.body.passwordValue],
        (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'insertion dans la base de données :', err);
                res.status(500).json({ message: 'Erreur serveur' });
                return;
            }
            else {
                console.log('Insertion réussie, ID utilisateur :', results.insertId);
                res.json({ message: 'Inscription réussie !', userId: results.insertId });
            }

        }
    );
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {// * pour tout selectionner
    if (err) {//si erreur
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;//permet de pas exécuter se qui suit
    }
    res.json(results);//pas erreur
  });
});

app.post('/Vote', (req, res) => { // C'est une route mais type "post" donc que par formulaire
    console.log('Données reçues pour l\'vote');
    console.log(req.body);
    connection.query( //sert a envoyer les donner au serveur
        'INSERT INTO vote (`idUser`) VALUES (?)',
        [req.body.usersList],
        (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'insertion dans la base de données :', err);
                res.status(500).json({ message: 'Erreur serveur' });
                return;
            }
            else {
                console.log('Insertion réussie, ID utilisateur :', results.insertId);
                res.json({ message: 'Inscription réussie !', userId: results.insertId });
            }

        }
    );
});
app.get('/resultaVote', (req, res) => {
//connection.query('SELECT COUNT(user.login) FROM `vote`, `user` WHERE `user`.`id` = `vote`.`idUser` GROUP BY `login`', (err, results) => {// login pour ne selectionner que les pseudo (évite de révéler trop d'information)
//connection.query('SELECT  COUNT(login) FROM `vote`, `user` WHERE `user`.`id` = `vote`.`idUser` GROUP BY `login`', (err, results) => {// login pour ne selectionner que les pseudo (évite de révéler trop d'information)
//SELECT * , COUNT(`idUser`) AS vote_count FROM user JOIN vote ON user.id = vote.idUser GROUP BY `login` ORDER BY `vote_count` //code aide Thomas
//connection.query('SELECT * , COUNT(`idUser`) FROM `vote`, `user` WHERE `user`.`id` = `vote`.`idUser` GROUP BY `login` , `idUser`', (err, results) => {
connection.query('SELECT user.id, user.login, vote.idUser , COUNT(`idUser`) as toto FROM `vote`, `user` WHERE `user`.`id` = `vote`.`idUser` GROUP BY `login` , `idUser`', (err, results) => {      
    if (err) {//si erreur
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;//permet de pas exécuter se qui suit
    }
    res.json(results);//pas erreur
  });
});


app.listen(3000, () => { //express écoute sur le port 3000 et affiche un message dans le console
    console.log('server runing')
});  //Le poind virgule c'est juste pour dire la fin de la fonction