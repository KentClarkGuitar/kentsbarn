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
];

const DURATION = 2000;
const GAP = 100;

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
    lose = false;
    
    //pick random number 
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
    var animalIdx = parseInt(evt.target.id.replace('animal', ''));
    animalPlayer.src = animals[animalIdx].sound;
    animalPlayer.play();
    guess.push(animalIdx);
    debugger;
    lose = guess[guess.length - 1] !== sequence[guess.length - 1];
    isPlaying = lose;
    if (!lose) {
        sequence.push(getRandomBetween(0, animals.length - 1));
        playSequence(function() {
            guess = [];
            isPlaying = false;
        });
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
        messageEl.textContent = 'Bummer - try again!';
    } else if (sequence.length) {
        messageEl.textContent = 'Keep it going!';
    } else {
        messageEl.textContent = 'Click Begin Button to Start';
    }
}

initialize();




