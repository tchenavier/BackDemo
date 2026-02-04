var i = 1;
//recuper élement du DOM
const login = document.getElementById('login');
const Password = document.getElementById('Password');
const monButon = document.getElementById('button');
const monButon2 = document.getElementById('button2');
const BoutonVote = document.getElementById('BoutonVote');
const afficheVote = document.getElementById('afficheVote');
const loginButton = document.getElementById('loginButton');
const ExiteButton = document.getElementById('ExitButton');

// Ajout d'un écouteur d'événement sur le bouton
monButon.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loginValue: login.value, passwordValue: Password.value })
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
    i++;
});

monButon2.addEventListener('click', () => {
    if (i == 1) {

        fetch('/info')
            .then(responsebrute => responsebrute.json()) //Recupération de la réponse réseau et transformation en json
            .then(
                responsejson => {
                    document.getElementById('reponse').innerHTML = responsejson.cle1; //récupération de la réponse trensformer en json et utilisation (récupération de cle1)
                });
    }
    else {
        fetch('/info')
            .then(responsebrute => responsebrute.json()) //Recupération de la réponse réseau et transformation en json
            .then(
                responsejson => {
                    document.getElementById('reponse').innerHTML = responsejson.cle2; //récupération de la réponse trensformer en json et utilisation (récupération de cle1)
                });
    }
});

window.onload = () => { // Une fois que la page est charger

    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const usersList = document.getElementById('usersList');
            users.forEach(user => { // users l'ensemble des user; user qu'un élément de users
                //création d'un input select option avec id en value et login en texte  
                const option = document.createElement('option');// crée un objet HTML
                option.value = user.id;
                option.text = user.login;
                usersList.appendChild(option);  //mette les option en enfant de la liste

            });
        });

    fetch('/resultaVote')
        .then(response => response.json())
        .then(logins => {//l'ensemble
            const afficheVote = document.getElementById('afficheVote');
            logins.forEach(login => { // users l'ensemble des user; user qu'un élément de users
                //création d'un input select option avec id en value et login en texte  
                const li = document.createElement('li');// crée un objet HTML
                // li.value = vote.id;
                li.innerHTML = login.login + " " + login.groupement;
                afficheVote.appendChild(li); //mette les option en enfant de la liste
            });
        });
    //afficheVote.AfficheVoteFonction(vote);
}

BoutonVote.addEventListener('click', () => {
    const usersList = document.getElementById('usersList');
    const selectedUserId = usersList.value;
    let electeur;
    electeur = localStorage.getItem('userId');//récuperation de l'id en localStorage
    if (electeur != null) {
        fetch('/Vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usersList: selectedUserId, idElecteur: electeur })
        }).then(response => response.text())
            .then(data => {
                alert(data);
            });
    }
    {
        console.log("Id non défini");
    }

});

loginButton.addEventListener('click', () => {
    const loginInput = document.getElementById('loginInput').value;
    const passwordInput = document.getElementById('passwordInput').value;

    fetch('/connexion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: loginInput, pasword: passwordInput })
    }).then(response => response.json())
        .then(data => {
            alert(data.message);
            alert('ID utilisateur : ' + data.user.id);
            localStorage.setItem('userId', data.user.id);//depose de l'id en localStorage
        });
});

ExiteButton.addEventListener('click', () => {
localStorage.removeItem('userId');
});
