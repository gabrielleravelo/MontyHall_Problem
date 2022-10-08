// 
class Statistics {
    constructor () {
        this.gamesWithSameDoorWon = [];
        this.gamesWithSameDoorLost = []
        this.gamesWithDoorChangeWon = [];
        this.gamesWithDoorChangeLost = [];
    }
}

class Game {
    constructor () {
        this.doors;
        this.doorPicked;
        this.openedGoatDoor;
        this.finalPick;
        this.won;
    }
}

class Door {
    constructor(number) {
        this.number = number;
        this.isCar = false;
        this.opened = false;
    }
}

// Init game

nbSimulation = 300;
var stat = new Statistics();
stat.gamesWithSameDoorWon = 0;
stat.gamesWithSameDoorLost = 0;
stat.gamesWithDoorChangeWon = 0;
stat.gamesWithDoorChangeLost = 0;
 

for ( let j = 0; j < nbSimulation ; j++){ 
    var game = new Game();
    var newdoor;
    game.doors = [];
    for (let i = 0; i < 3 ; i++){
        newdoor = new Door(i);
        game.doors.push(newdoor);
    }
       
     var randomIndex = function(x){
        return Math.floor(Math.random() * (x-0) + 0);
    }

    var carDoor = game.doors[randomIndex(3)];
    carDoor.isCar = true; // Select a door with a car randomly
    
    game.doorPicked = game.doors[randomIndex(3)]; // Pick a door randomly
    
    // OPEN goat door
    var goatDoor = game.doors.filter( obj => obj.isCar === false);
    var goatNumber = randomIndex(goatDoor.length);
    game.openedGoatDoor = goatDoor[goatNumber];
    if (game.doorPicked === game.openedGoatDoor){
        game.openedGoatDoor = goatDoor[+!goatNumber];
    }
    
    //OPEN a final pick door
    var closeDoor = game.doors.filter( obj => obj.number != game.openedGoatDoor.number);
    var closeNumber = randomIndex(closeDoor.length);
    game.finalPick = closeDoor[closeNumber];
    
    
    
    if (game.finalPick == carDoor){
        game.won = true;
    }
    if (game.finalPick == game.doorPicked && game.won){
        stat.gamesWithSameDoorWon++;
        
    } 
    if (game.finalPick == game.doorPicked && !game.won){
        stat.gamesWithSameDoorLost++;    
        
    } 
    if (game.finalPick != game.doorPicked && game.won){
        stat.gamesWithDoorChangeWon++;
        
    }
    if (game.finalPick != game.doorPicked && !game.won){
        stat.gamesWithDoorChangeLost++;
        
    }
    
}

// RESULT 
console.log(stat);

var stayWin = ((stat.gamesWithSameDoorWon * 100) / (stat.gamesWithSameDoorWon + stat.gamesWithSameDoorLost)).toFixed(2);
var switchWin = ((stat.gamesWithDoorChangeWon * 100) / (stat.gamesWithDoorChangeWon + stat.gamesWithDoorChangeLost)).toFixed(2);


// DISPLAY result
console.log(stayWin + " % of games won when not swicthing door.");
console.log(switchWin + " % of games won when swicthing door.");
