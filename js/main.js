// /*----- constants -----*/
var animals = [
    {
        name: 'horse',
        sound : "https://freesound.org/data/previews/19/19812_37876-lq.mp3"
    },
    {
        name: 'cow',
        sound : "https://freesound.org/data/previews/58/58277_634166-lq.mp3"
    },
    {
        name: 'sheep',
        sound : "https://freesound.org/data/previews/34/34538_118241-lq.mp3"
    },
    {
        name: 'chicken',
        sound : " https://freesound.org/data/previews/120/120585_8043-lq.mp3"
    },
];



var animalPlayer =  new Audio ();

// /*----- app's state (variables) -----*/
var sequence, guess;
var isPlaying;

// /*----- event listeners -----*/
$('button').on('click', playGame);
$('.animal').on('click', handleAnimalClick);


// /*----- functions -----*/
function playGame () {
    isPlaying = true;
    guess = [];
    //pick random number 
    sequence = [getRandomBetween(0, animals.length - 1)];
    playSequence(sequence);
}

function playSequence() {
    //use number to play animal
    animalPlayer.src = animals[sequence].sound;
    animalPlayer.play();
}

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleAnimalClick(evt) {
    if (isPlaying) return;
    animalPlayer.src = animals[parseInt(evt.target.id.replace('animal', ''))].sound;
    animalPlayer.play();
}

function initialize () {
    isPlaying = false;
    render();
}

function render () {

} 

initialize();
