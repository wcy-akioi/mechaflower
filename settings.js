var tileSize = 512 // The size of the square tile, in pixels
var commaSeparate = false // If true, add commas to numbers.
var shortenThreshold = 15 // This determines which power of 10 will start shortening numbers. Set this to 16 (10 quadrillion) if unsure. To disable, set this to 0.
var shortenDecimals = 0 // number of decimal places for shortened numbers
var shortenSeparator = "" // This is the string that separates the shortened numbers between the number and the suffix. Example: Value "sep" = 1.234sepM for 1,234,567
var fractionScientific = 6 // This determines which negative power of 10 will start converting fractions to scientific notation. Set to 6 (one millionth) if unsure. To disable, set to 0.
var fractionDecimals = 8 // Maximum number of decimal places for fraction numbers, like 0.001234. Set this to 0 for automatic.
var fractionScientificDecimals = 15 // Maximum number of decimal places for scientific notation-converted fraction numbers, like 1.234x10^-3. Set this to 2 if unsure.
var font = "https://openprocessing-usercontent.s3.amazonaws.com/files/user280519/visual1360213/h7c9e2587bd3f8e21ad45f0cb010abcb3/ClearSans-Bold.ttf" // Font used for the text on tiles. Default: https://openprocessing-usercontent.s3.amazonaws.com/files/user280519/visual1360213/h7c9e2587bd3f8e21ad45f0cb010abcb3/ClearSans-Bold.ttf
var maxTextSize = 512 // Maximum text size for full numbers. The text never gets any larger than this.
var maxShortenTextSize = 320 // Maximum text size for shortened numbers.
var textOffsetY = 1 // If the tile text is off-center, then change this value until you're satisfied with the position.
var textShrink = 10000 // Change this to change the point when the tile text starts to decrease in size. Decrease this if you see the tile text going beyond the edges of the image.