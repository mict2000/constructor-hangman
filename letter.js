var Letter = function (ltr) {
    this.letter = ltr
    this.appear = false

    // function renders to screen
    this.letterRender = function () {
        if (this.letter == ' ') { // renders a blank
            this.appear = true
            return '  '
        } if (this.appear === false) { // renders _
            return ' _ '
        } else { // renders the letter
            return this.letter
        }
    }
}

module.exports = Letter