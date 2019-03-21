// Contents:
// -vars
// -initial setup
// -game logic
// -functions

var score = 0,
    chances = 10,
    usedLetters = [],
    wordPool = ["matey", "scurvy", "eyepatch", "parrot", "treasure", "booty", "cutlass", "buccaneer", "cannon", "arrrrrrrr"],
    currentWord = "",
    playArea = [];

// Initial setup
shuffle(wordPool)
function nextWord() {
    resetPlayVars()
    makeBlanks()
    resetDisplay()
}
nextWord()

// Runs game logic when key is pressed
document.onkeyup = function(event) {
    var userInput = event.key.toLowerCase(),
        matches = [];

    // Checks if the userInput string length is 1 to exclude function keys & checks if it is only a letter not a number
    if (userInput.length === 1 && userInput.search(/[a-z]/) > -1 ) {
        // Checks if the letter has been used already
        if (window.usedLetters.includes(userInput)) {
            // If currentWord does not contain userInput, player loses a chance, and it displays the letter in the wrongGuesses div
        } else if (currentWord.indexOf(userInput) === -1) {
            chances--
            document.getElementById('chances').textContent = chances;
            document.getElementById('wrongGuesses').textContent += userInput.toUpperCase() + " ";
            // loops over the current word and if the userInput occurs, it stores the index in a matches array
        } else {
            for (var v = 0; v < blankLength; v++) {
                if (currentWord[v] === userInput) {
                    matches.push(v);
                }
            }
        }
        // stores the userInput in the usedLetters array for future checks
        usedLetters.push(userInput)
    }
    // Uses match indices to replace same indices in playArea array with userInput
    for (b = 0; b < matches.length; b++) {
        playArea[matches[b]] = userInput
    }

    // Displays contents of playArea with commas replaced by spaces for readability
    document.getElementById('playArea').textContent = playArea.join(" ").toUpperCase();
    
    // game over if chances reach zero
    if (chances <= 0) {
        document.getElementById('title').textContent = "You Lose!"
        score = 0
        shuffle(wordPool);
        setTimeout( function(){
            document.getElementById('title').textContent = "Pirate's Hangman!"
            nextWord()
        }, 3000)
    // Detects if word is complete and resets play for next word
    } else if (playArea.join("").toString() === currentWord) {
        score++
        if (score < wordPool.length) {
            nextWord()
            // if score === word pool, player wins, game resets
        }   else if (score === wordPool.length) {
            document.getElementById('title').textContent = "You Win!"
            shuffle(wordPool);
            score = 0
            setTimeout( function(){
                document.getElementById('title').textContent = "Pirate's Hangman!"
                nextWord()
            }, 3000)
        }

    }
}

// Fisher-Yates Shuffle to randomize the wordPool
function shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array
};

// Function to be called when new word to guess is needed
function resetPlayVars() {
    currentWord = wordPool[score]
    chances = 10
    usedLetters = []
    playArea = []
};

// Fills playArea array with placeholder underscores
function makeBlanks() {
    blankLength = currentWord.length;
    for (c = 0; c < blankLength; c++) {
        playArea.push("_");
    }
}

// Resets the display
function resetDisplay() {
    document.getElementById('wrongGuesses').textContent = null
    document.getElementById('score').textContent = score
    document.getElementById('playArea').textContent = playArea.join(" ")
    document.getElementById('chances').textContent = chances
}
   






