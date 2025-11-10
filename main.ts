input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    Regenbogenmodus()
})
function Spielmodus () {
    basic.showIcon(IconNames.Duck)
    spielrunden = 3
    modus = 1
    go = 0
    delay = 100
    schrittweite = 2
    punkte1 = 0
    punkte2 = 0
    streifen1 = neopixel.create(DigitalPin.P14, anzahlLeds, NeoPixelMode.RGB)
    streifen2 = neopixel.create(DigitalPin.P14, anzahlLeds, NeoPixelMode.RGB)
    streifen1.setPixelColor(0, neopixel.colors(NeoPixelColors.Yellow))
    streifen1.setPixelColor(1, neopixel.colors(NeoPixelColors.Yellow))
    streifen1.setPixelColor(2, neopixel.colors(NeoPixelColors.Yellow))
    streifen2.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
    streifen2.setPixelColor(1, neopixel.colors(NeoPixelColors.Blue))
    streifen2.setPixelColor(2, neopixel.colors(NeoPixelColors.Blue))
    for (let index = 0; index < 3; index++) {
        music.play(music.tonePlayable(988, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        basic.pause(1000)
    }
    music.play(music.tonePlayable(988, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    delay = 30
    go = 1
}
input.onButtonPressed(Button.A, function () {
    Lichtmodus()
})
input.onPinPressed(TouchPin.P2, function () {
    if (modus == 0) {
        farbe = neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255))
    } else {
        if (go == 1) {
            streifen2.rotate(schrittweite)
            punkte2 += 1
        }
    }
})
function Lichtmodus () {
    basic.showIcon(IconNames.Happy)
    modus = 0
    streifen1 = neopixel.create(DigitalPin.P14, anzahlLeds, NeoPixelMode.RGB)
    farbe = neopixel.colors(NeoPixelColors.Purple)
    delay = 20
}
input.onButtonPressed(Button.B, function () {
    Spielmodus()
})
input.onPinPressed(TouchPin.P1, function () {
    if (modus == 0) {
    	
    } else {
        if (go == 1) {
            streifen1.rotate(schrittweite)
            punkte1 += 1
        }
    }
})
function Regenbogenmodus () {
    basic.showIcon(IconNames.Ghost)
    modus = 2
    streifen1 = neopixel.create(DigitalPin.P14, anzahlLeds, NeoPixelMode.RGB)
    streifen1.showRainbow(1, 360)
}
let helligkeit = 0
let neueHelligkeit = 0
let farbe = 0
let streifen2: neopixel.Strip = null
let streifen1: neopixel.Strip = null
let punkte2 = 0
let punkte1 = 0
let schrittweite = 0
let delay = 0
let go = 0
let modus = 0
let spielrunden = 0
let anzahlLeds = 0
anzahlLeds = 60
music.setVolume(155)
Lichtmodus()
basic.forever(function () {
    if (modus == 0) {
        neueHelligkeit = pins.analogReadPin(AnalogPin.P0)
        if (helligkeit != neueHelligkeit) {
            helligkeit = neueHelligkeit
            streifen1.showColor(farbe)
            streifen1.setBrightness(Math.map(helligkeit, 0, 1023, 0, 255))
            streifen1.show()
        }
    }
    basic.pause(delay)
})
basic.forever(function () {
    if (modus == 2) {
        streifen1.setBrightness(Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, 0, 255))
        streifen1.rotate(1)
        streifen1.show()
    }
    basic.pause(delay)
})
basic.forever(function () {
    if (modus == 1) {
        streifen1.show()
        basic.pause(delay)
        streifen2.show()
        if (punkte1 * schrittweite >= spielrunden * anzahlLeds - schrittweite || punkte2 * schrittweite >= spielrunden * anzahlLeds - schrittweite) {
            go = 0
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.InBackground)
            delay = 200
            punkte1 = 0
            punkte2 = 0
        }
    }
    basic.pause(delay)
})
