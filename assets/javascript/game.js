// Select word randomly from pool, without repeating word
// Display blank lines equal to word length
// Take user input letter
// If user input matches letter in word, display in correct spot or spots
// If letter does not match, lose one guess, display in list of wrong chances
// If word is completed, show image and play sound
// If out of chances, show alternate image and play sound
// Reset board with new word
// If out of words display big win message and reset play
var score = 0,
chances = 10,
usedLetters = [],
wordPool = ["avast", "ahoy", "matey", "scurvy", "eyepatch", "parrot", "treasure", "booty", "cutlass", "blunderbuss", "buccaneer", "cannon", "arrrrrrrr"],

// Selects word at random from wordPool
currentWord = wordPool[Math.floor(Math.random()*wordPool.length)];
// console.log(currentWord)
var blankLength = currentWord.length,

// Creates playArea array and fills with placeholder underscores
playArea = [];
for (i = 0; i < blankLength; i++) {
    playArea.push("_")
}

// Displays initial playArea
document.getElementById('playArea').textContent = playArea.join(" ");
document.getElementById('chances').textContent = chances;

document.onkeyup = function(event) {
    var userInput = event.key.toLowerCase(),
        matches = [];

        // Checks if the userInput string length is 1 to exclude function keys & checks if it is only a letter not a number
    if (userInput.length === 1 && userInput.search(/[a-z]/) > -1 ) {
        // Checks if the letter has been used already
        if (usedLetters.includes(userInput)) {
            // If currentWord does not contain userInput, player loses a chance, and it displays the letter in the wrongGuesses div
        } else if (currentWord.indexOf(userInput) === -1) {
            chances--
            document.getElementById('chances').textContent = chances;
            document.getElementById('wrongGuesses').textContent += userInput.toUpperCase() + " ";
            // loops over the current word and if the userInput occurs, it stores the index in a matches array
        } else {
            for (var i = 0; i < blankLength; i++) {
                if (currentWord[i] === userInput) {
                    matches.push(i);
                }
            }
        }
        // stores the userInput in the usedLetters array for future checks
        usedLetters.push(userInput)
    }
    // Uses match indices to replace same indices in playArea array with userInput
    for (i = 0; i < matches.length; i++) {
        playArea[matches[i]] = userInput
    }

// Displays contents of playArea with commas replaced by spaces for readability
    document.getElementById('playArea').textContent = playArea.join(" ").toLocaleUpperCase();
    
    // game over if chances reach zero
    if (chances <= 0) {
        document.getElementById('playArea').textContent = "You lose!"
    }

// Detects if word is complete and resets play for next word
    if (playArea.join("").toString() === currentWord) {
        score++
        currentWord = wordPool[Math.floor(Math.random()*wordPool.length)];
        chances = 10,
        usedLetters = []
        playArea = [],
        blankLength = currentWord.length;
        for (i = 0; i < blankLength; i++) {
            playArea.push("_")
        }
        document.getElementById('wrongGuesses').textContent = null
        document.getElementById('score').textContent = score
        document.getElementById('playArea').textContent = playArea.join(" ")
        document.getElementById('chances').textContent = chances
    }
}












