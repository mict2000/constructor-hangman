var Letter = require('./letter.js')

function Word(wrd) {
    this.word = wrd
    this.letters = []
    this.wordFound = false

    // gets letters and pushes to letters array
    this.getLetters = function () {
        for (var i = 0; i < this.word.length; i++) {
            var newLetter = new Letter(this.word[i]);
            this.letters.push(newLetter);
        }
    }

    // checks to see if user found the current word
    this.checkWord = function () {
        if (this.letters.every(function (lttr) {
            return lttr.appear === true;
        })) {
            this.wordFound = true;
            return true;
        }
    }

    // checks to see if letter is in the word
    this.checkIfLetterFound = function (guessedLetter) {
        var whatToReturn = 0

        // iterates through each letter to see if it matches the guessed letter
        this.letters.forEach(function (lttr) {
            if (lttr.letter === guessedLetter) {
                lttr.appear = true
                whatToReturn++
            }
        })

        // if guessLetter matches Letter the letter should be shown
        return whatToReturn
    }

    this.wordRender = function () {
        var display = ''
        
        // render the word based on if letters are found or not
        this.letters.forEach(function (lttr) {
            var currentLetter = lttr.letterRender()
            display += currentLetter
        })
        return display
    }
}

module.exports = Word
