
//Who spoke?
// /*----- constants -----*/
var animals = [
    {
        name: 'horse',
        // sound : "neigh.aif"
        sound: "https://freesound.org/data/previews/19/19812_37876-lq.mp3"
    },
    {
        name: 'cow',
        // sound : "moo.aif"
        sound: "https://freesound.org/data/previews/58/58277_634166-lq.mp3"
    },
    {
        name: 'sheep',
        // sound : "sheep.aif"
        sound: "https://freesound.org/data/previews/34/34538_118241-lq.mp3"
    },
    {
        name: 'chicken',
        // sound : "cackle.aif"
        sound: "https://freesound.org/data/previews/120/120585_8043-lq.mp3"
    },
    {
        name: 'goat',
        sound: "https://freesound.org/data/previews/385/385913_7097737-lq.mp3"
    },
    {
        name: 'pig',
        sound: 'sounds/squeal3.mp3'
    },
    // {
    //     name: 'duck',
    //     sound: "https://freesound.org/data/previews/419/419094_2667695-lq.mp3"
    // },
    // {
    //     name: 'frog',
    //     sound: "https://freesound.org/data/previews/326/326648_5642065-lq.mp3"
    // }


];
var bgMusic = new Audio("sounds/LittleRedRooster.mp3");

$('input:checkbox').change(function () {
    if ($(this).is(':checked')) {

        bgMusic.volume = 0.10;
        bgMusic.play();
    } else {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
});

const DURATION = 1200;
const GAP = 300;
var count;
var timerId;
// var bgMusic;
var animalPlayer = new Audio();

/*----- cached elements -----*/
var sequenceCountEl = document.getElementById('sequence-count');
var messageEl = document.getElementById('message');

/*----- app's state (variables) -----*/
var sequence, guess, lose;
var isPlaying;

/*----- event listeners -----*/
$('button').on('click', playGame);
$('.animal').on('click', handleAnimalClick);

/*----- functions -----*/
function playGame() {
    // var playNote = new Audio("https://www.freesound.org/data/previews/101/101137_1386366-lq.mp3");
    // playNote.play();


    $('button').attr('disabled', true);
    lose = false;
    count = 30;
    timerId = setInterval(timer, 1000);

    sequence = [getRandomBetween(0, animals.length - 1)];
    playSequence(function () {
        guess = [];
        isPlaying = false;
    });

}

function playSequence(doneCallback) {
    isPlaying = true;
    playItem(0);
    function playItem(idx) {
        if (idx < sequence.length) {
            setTimeout(function () {
                animalPlayer.src = animals[sequence[idx]].sound;
                animalPlayer.play();
                setTimeout(function () {
                    animalPlayer.pause();
                    playItem(idx + 1);
                }, DURATION);
            }, GAP);
        } else {
            doneCallback();
        }
    }
    render();
}

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleAnimalClick(evt) {
    if (isPlaying) return;
    count = 31;
    var animalIdx = parseInt(evt.target.id.replace('animal', ''));

    // animalPlayer.src = animals[animalIdx].sound;
    // animalPlayer.play();
    guess.push(animalIdx);

    if (guess.length === sequence.length) {
        lose = guess[guess.length - 1] !== sequence[guess.length - 1];
        isPlaying = lose;
        if (!lose) {
            sequence.push(getRandomBetween(0, animals.length - 1));
            playSequence(function () {
                guess = [];
                isPlaying = false;
            });
        }
    }
    render();

}

function initialize() {
    isPlaying = true;
    sequence = [];

    render();

}

function render() {
    sequenceCountEl.textContent = sequence.length;
    if (lose) {
        messageEl.textContent = 'Speak again animals!';
    } else if (sequence.length) {
        messageEl.textContent = 'Who spoke when?';
    } else {
        messageEl.textContent = 'Click button to begin!';
        $('button').attr('disabled', false)
    }
}

function timer() {

    count--;
    document.querySelector('.timeout').innerHTML = 'Play Time: ' + count + " seconds";

    if (count < 0) {
        clearInterval(timerId);
        document.querySelector('.timeout').innerHTML = "";
        document.getElementById('message').innerHTML = "Time's Up! " + sequence.length;
        $('button').attr('disabled', false)

    }
}
initialize();




