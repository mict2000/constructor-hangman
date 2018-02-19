var inquirer = require('inquirer')
var isLetter = require('is-letter')

var Word = require('./word.js')
var Game = require('./game.js')

var hangManDisplay = Game.newWord.hangman

var wordBank = Game.newWord.wordList
var guessesRemaining = 10
var guessedLetters = []
var display = 0
var currentWord

startGame()

function startGame() {
    console.log('---------------------------------------------------------')
    console.log('')
    console.log('Welcome to Top Surf Spots Hangman!')
    console.log('')
    console.log('---------------------------------------------------------')

    // clears guessedLetters before a new game starts if it's not already empty.
    if (guessedLetters.length > 0) {
        guessedLetters = []
    }

    inquirer.prompt([
        {
            name: 'play',
            type: 'confirm',
            message: 'Ready to play?'
        }
    ]).then(function (answer) {
        if (answer.play) {
            console.log('')            
            console.log('You get 10 chances to spell the best surf spots in the world!')
            console.log('Good Luck!')
            newGame()
        } else {
            console.log('Poof! Be gone!')
        }
    })
}

function newGame() {
    if (guessesRemaining === 10) {
        console.log('---------------------------------------------------------')

        // generates random number based on the wordBank
        var randNum = Math.floor(Math.random() * wordBank.length)
        currentWord = new Word(wordBank[randNum])
        currentWord.getLetters()

        // displays current word as blanks.
        console.log('')
        console.log(currentWord.wordRender())
        console.log('')
        promptUser()
    } else {
        resetGuessesRemaining()
        newGame()
    }
}

function resetGuessesRemaining() {
    guessesRemaining = 10
}

function promptUser() {
    inquirer.prompt([
        {
            name: 'chosenLetter',
            type: 'input',
            message: 'Choose a letter',
            validate: function(value) {
                if (isLetter(value)) {
                    return true
                } else {
                    return false
                }
            }
        }
    ]).then(function(ltr) {

        // turn letter into uppper case and store in variable
        var letterReturned = (ltr.chosenLetter).toUpperCase()

        // check to see if you guessed that letter already and set flag to false
        var guessedAlready = false
        for (var i = 0; i < guessedLetters.length; i++) {
            if(letterReturned === guessedLetters[i]) {
                guessedAlready = true
            }
        }

        if (guessedAlready === false) {
            // push letter into array
            guessedLetters.push(letterReturned)

            // variable to check if letter was in the word
            var found = currentWord.checkIfLetterFound(letterReturned)

            if (found === 0) {
                console.log('Yeah, no. That is wrong!')

                guessesRemaining--

                // counter for hangman display
                display++

                console.log('Guesses remaining: ' + guessesRemaining)
                console.log(hangManDisplay[display - 1]) // prints the hangman display

                console.log('---------------------------------------------------------')
                console.log('')
                console.log(currentWord.wordRender())
                console.log('')
                console.log('---------------------------------------------------------')
                console.log('Letters guessed: ' + guessedLetters)
            } else {
                console.log('Good job! Correct!')

                if (currentWord.checkWord() === true) {
                    console.log('')
                    console.log(currentWord.wordRender())
                    console.log('')
                    console.log('----- WINNER -----')
                    startGame()
                } else {
                    console.log('Guesses remaining: ' + guessesRemaining)
                    console.log('')
                    console.log(currentWord.wordRender())
                    console.log('')
                    console.log('---------------------------------------------------------')
                    console.log('Letters guessed: ' + guessedLetters)
                }
            }

            // if guessesRemaining and the current word isn't found prompt the user
            if (guessesRemaining > 0 && currentWord.wordFound === false) {
                promptUser();
            } else if (guessesRemaining === 0) { // if you don't have any guesses left and haven't found the word you lose
                console.log('')                
                console.log('----- GAME OVER -----')
                console.log('')
                console.log('The word you were trying to guess was: ' + currentWord.word)
                console.log('')                
            }
        } else { // prompts the user that they guessed that letter already
            console.log('You have guessed that letter already, try again.')
            promptUser();
        }
    })
}
