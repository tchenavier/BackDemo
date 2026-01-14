
//recuper élement du DOM
const monInput = document.getElementById('monInput');
const monButon = document.getElementById('button');
const monButon2 = document.getElementById('button2');

// Ajout d'un écouteur d'événement sur le bouton
monButon.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputValue: monInput.value })
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
});

monButon2.addEventListener('click', () => {
    fetch('/info')
        .then(responsebrute => responsebrute.json()) //Recupération de la réponse réseau et transformation en json
        .then(
            responsejson => {
                document.getElementById('reponse').innerHTML = responsejson.cle1; //récupération de la réponse trensformer en json et utilisation (récupération de cle1)
            });
});

