// /*----- constants -----*/
var animals = [
    {
        name: 'horse',
        // sound : "neigh.aif"
        sound: "https://freesound.org/data/previews/19/19812_37876-lq.mp3"
    },
    {
        name: 'chicken',
        // sound : "cackle.aif"
        sound: "https://freesound.org/data/previews/120/120585_8043-lq.mp3"
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
        name: 'pig',
        sound: 'sounds/squeal3.mp3 '//"/media_command.php?media=s0dQIkPecgL4&amp;command=download_mp3"
    }


];
var bgMusic = new Audio("sounds/LittleRedRooster.mp3");

$('input:checkbox').change(function () {
    if ($(this).is(':checked')) {

        bgMusic.volume = 0.15;
        bgMusic.play();
    } else {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
});

const DURATION = 1500;
const GAP = 300;
var count;
var timerId;
var animalPlayer = new Audio();

/*----- cached elements -----*/
var sequenceCountEl = document.getElementById('sequence-count');
var messageEl = document.getElementById('message');
var playBtn = document.querySelector('button');

/*----- app's state (variables) -----*/
var sequence, guess, lose;
var isPlaying;

/*----- event listeners -----*/
$('button').on('click', playGame);
$('.animal').on('click', handleAnimalClick);

/*----- functions -----*/
function playGame() {

    lose = false;
    count = 30;
    timerId = setInterval(timer, 1000);

    sequence = [getRandomBetween(0, animals.length - 1)];
    playSequence(function () {
        guess = [];
        isPlaying = false;
    });
    render();
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
    var elem = event.target;
    var animalIdx = parseInt(elem.id.replace('animal', ''));
    elem.classList.add('active');
    setTimeout(function () {
        elem.classList.remove('active');
    }, 1000);
    guess.push(animalIdx);
    if (guess[guess.length - 1] !== sequence[guess.length - 1]) {
        lose = true;
        isPlaying = false;
    } else if (guess.length === sequence.length) {
        sequence.push(getRandomBetween(0, animals.length - 1));
        playSequence(function () {
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
        messageEl.textContent = 'Speak again animals!';
        playBtn.classList.remove('disabled');
    } else if (sequence.length) {
        messageEl.textContent = 'Who spoke when?';
        playBtn.classList.add('disabled');
    } else {
        messageEl.textContent = 'Click button to begin!';
        playBtn.classList.remove('disabled');
    }
}

function timer() {
    if (isPlaying) return;
    count--;
    document.querySelector('.timeout span').innerHTML = count + " seconds";

    if (count < 0) {
        clearInterval(timerId);
        document.querySelector('.timeout span').innerHTML = "";
        document.getElementById('message').innerHTML = "Time's Up! " + sequence.length;
    }
    render();
}

initialize();




