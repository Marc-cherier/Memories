// ==========================================================
// MEMORIES

var i = 0; // incrémentation
var nbcounter = 0; // compteur
const nbCards = 20; // nombre de cartes à trouver

const app = {

    nbcounter: 0,
    card1: [],
    card2: [],
    totalCards: nbCards * 2,
    player: [], // tableau comprenant les réponses du joueur (2 cartes -> ID et valeur)

    // initalisation
    init: function () {

        app.randomCard1();
        i = 0;
        app.randomCard2();
        i = 0;

        app.showCards();

        let takeCard = document.querySelectorAll(".card");
        takeCard.forEach(app.handleViewCard);

        let start = document.querySelector('.start');
        start.addEventListener('click', function () {
            location.reload();
        })
    },

    // tirage d'un nombre au hasard
    randomNumber: function () {

        return Math.floor(Math.random() * (19 - 0 + 1));
    },

    // création du tableau des pairs (carte1=index / carte2=valeur)
    randomCard1: function () {

        let radomNumber = app.randomNumber();

        while (i < nbCards) {

            if (radomNumber == i) {

                app.randomCard1();

            } else if ((!app.card1.includes(radomNumber))) {

                app.card1.push(radomNumber);
                i++;
            }

            app.randomCard1();
        }

        return;
    },

    randomCard2: function () {

        let radomNumber = app.randomNumber();

        while (i < nbCards) {

            if (radomNumber == i) {

                app.randomCard2();

            } else if ((!app.card2.includes(radomNumber))) {

                app.card2.push(radomNumber);
                i++;
            }

            app.randomCard2();
        }

        return;
    },

    // affichage des cartes
    showCards: function () {

        const page = document.querySelector('.container');

        for (let j = 0; j < nbCards; j++) {

            // carte 1
            let card1Container = document.createElement('div');
            page.appendChild(card1Container);

            let contentCard1 = document.createElement('div');
            card1Container.appendChild(contentCard1);

            contentCard1.classList.add('card');
            card1Container.classList.add('spaceOfCard');

            let image = document.createElement('img');
            contentCard1.appendChild(image);
            image.src = "./assets/images/card/" + app.card1[j] + ".gif";
            contentCard1.dataset.card = app.card1[j];
            contentCard1.id = i;
            i++;


            // carte 2
            let card2Container = document.createElement('div');
            page.appendChild(card2Container);

            let contentCard2 = document.createElement('div');
            card2Container.appendChild(contentCard2);

            contentCard2.classList.add('card');
            card2Container.classList.add('spaceOfCard');

            let imageBis = document.createElement('img');
            contentCard2.appendChild(imageBis);
            imageBis.src = "./assets/images/card/" + app.card2[j] + ".gif";

            contentCard2.dataset.card = app.card2[j];

            contentCard2.id = i;
            i++;
        }

        i = 0;
    },

    handleViewCard: function (clickOnCard) {

        clickOnCard.addEventListener('click', app.viewCard);
        return;
    },

    viewCard: function (e) {

        let event = e.currentTarget;

        console.log(event.dataset.card);

        if (!event.classList.contains('--selected')) { // vérifie que l'on clique pas sur la même carte

            event.classList.add("--selected");

            if (i < 2) {

                app.player.push([event.id, event.dataset.card]);
                i++;
            }

            if (i == 2) {

                app.resultOfCards();
            }
        }
        return;
    },

    resultOfCards: function () {

        console.log(app.totalCards);

        if (app.player[0][1] == app.player[1][1]) {

            console.log("gagné");
            app.totalCards = app.totalCards - 2;
            app.player.splice(0, 2);

        } else {

            console.log("perdu");

            setTimeout(app.cardReturn, 2000);

        }

        if (app.totalCards <= 0) {

            console.log("victoire");
        };

        i = 0;
    },

    cardReturn: function () {

        let deleteCard1 = document.getElementById(app.player[0][0]);
        let deleteCard2 = document.getElementById(app.player[1][0]);

        deleteCard1.classList.remove('--selected');
        deleteCard2.classList.remove('--selected');

        app.player.splice(0, 2);
        app.nbcounter++;

        let addCount = document.querySelector('.try');
        addCount.textContent = app.nbcounter;

        return;

    }

}

document.addEventListener('DOMContentLoaded', app.init);