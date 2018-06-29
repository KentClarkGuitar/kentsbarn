
//Who spoke?
// /*----- constants -----*/
var animals = [
    {
        name: 'horse',
        // sound : "neigh.aif"
        sound: "https://freesound.org/data/previews/19/19812_37876-lq.mp3"
    },
    {
        name: 'sheep',
        // sound : "sheep.aif"
        sound: "https://freesound.org/data/previews/34/34538_118241-lq.mp3"
    },
    {
        name: 'cow',
        // sound : "moo.aif"
        sound: "https://freesound.org/data/previews/58/58277_634166-lq.mp3"
    },
    {
        name: 'chicken',
        // sound : "cackle.aif"
        sound: "https://freesound.org/data/previews/120/120585_8043-lq.mp3"
    },
    {
        name: 'pig',
        sound: 'sounds/squeal3.mp3 '//"/media_command.php?media=s0dQIkPecgL4&amp;command=download_mp3"
    },
  
];



var animalPlayer = new Audio();

/*----- cached elements -----*/


/*----- app's state (variables) -----*/


/*----- event listeners -----*/
$('.animal').on('click', handleAnimalClick);

/*----- functions -----*/


function handleAnimalClick(evt) {


    var animalIdx = parseInt(evt.target.id.replace('animal', ''));
    animalPlayer.src = animals[animalIdx].sound;
    animalPlayer.play();



}






