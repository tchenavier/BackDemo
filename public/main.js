var i = 1;
//recuper élement du DOM
const login = document.getElementById('login');
const Password = document.getElementById('Password');
const monButon = document.getElementById('button');
const monButon2 = document.getElementById('button2');
const BoutonVote = document.getElementById('BoutonVote');
const afficheVote = document.getElementById('afficheVote');

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
        .then(vote => {
            const afficheVote = document.getElementById('afficheVote');
            vote.forEach(vote => { // users l'ensemble des user; user qu'un élément de users
                //création d'un input select option avec id en value et login en texte  
                const li = document.createElement('li');// crée un objet HTML
                li.value = vote.id;
                li.textContent = user.login;
                afficheVote.appendChild(li); //mette les option en enfant de la liste

            });
        });
    //afficheVote.AfficheVoteFonction(vote);
}

BoutonVote.addEventListener('click', () => {
    const usersList = document.getElementById('usersList');
    const selectedUserId = usersList.value;
    fetch('/Vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usersList: selectedUserId })
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
});

/*function AfficheVoteFonction(vote) {
    evenement.target.innerHTML = vote;
}*/