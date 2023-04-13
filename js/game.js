let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenMode = false;



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    setAudio();
}

/**
 * this function is the key listener to check witch key pressed
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})

/**
 * this function checks if the key go up
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})

/**
 * this function size the game to fullscreen
 */
function fullscreen() {
    let content = document.getElementById('content');
    if (document.fullscreenElement === null) {
        content.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/**
 * this function checks if audio mute in localstorage
 */
function setAudio() {
    let storage = localStorage.getItem('audio');
    if (storage) {
        if (storage == 'false') {
            volumeMute();
        }
    } else {
        world.audio = true
    }
}

/**
 * this function restart the game
 */
function restart(id) {
    //window.location.reload();
    let content = document.getElementById(id);
    content.classList.add('d-none');
    document.getElementById('startscreen').classList.remove('d-none');
    document.getElementById('volume').classList.add('d-none');
}

/**
 * this function open the controls
 */
function openSettings() {
    let btn = document.getElementById('settingsBtn');
    btn.setAttribute('onclick', 'closeSettings()');
    btn.src = 'img/hud/close.svg'
    document.getElementById('settings').classList.remove('d-none');
}

/**
 * this function close the controls
 */
function closeSettings() {
    let btn = document.getElementById('settingsBtn');
    btn.setAttribute('onclick', 'openSettings()');
    btn.src = 'img/hud/settings.svg'
    document.getElementById('settings').classList.add('d-none');
}

/**
 * this function mute the game audio
 */
function volumeMute() {
    world.audio = false;
    let volume = document.getElementById('volume');
    volume.src = 'img/hud/volume-off.svg';
    volume.setAttribute('onclick', 'volumeUp()');
    localStorage.setItem('audio', false)
}

/**
 * this function turn the audio on
 */
function volumeUp() {
    world.audio = true;
    let volume = document.getElementById('volume');
    volume.src = 'img/hud/volume.svg';
    volume.setAttribute('onclick', 'volumeMute()');
    localStorage.setItem('audio', true)
}

