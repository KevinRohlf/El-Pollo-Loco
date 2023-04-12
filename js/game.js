let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenMode = false;



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    } 

    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    } 

    if(e.keyCode == 38) {
        keyboard.UP = true;
    } 

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    } 

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }     

    if(e.keyCode == 68) {
        keyboard.D = true;
    }     
})

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    } 

    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    } 

    if(e.keyCode == 38) {
        keyboard.UP = false;
    } 

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    } 

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    } 
    
    if(e.keyCode == 68) {
        keyboard.D = false;
    }  
})

function fullscreen() {
    document.getElementById('content').requestFullscreen();
}

function restart() {
    window.location.reload();
}

function openSettings() {
    let btn = document.getElementById('settingsBtn');
    btn.setAttribute('onclick', 'closeSettings()');
    btn.src = 'img/hud/close.svg'
    document.getElementById('settings').classList.remove('d-none');
}

function closeSettings() {
    let btn = document.getElementById('settingsBtn');
    btn.setAttribute('onclick', 'openSettings()');
    btn.src = 'img/hud/settings.svg'
    document.getElementById('settings').classList.add('d-none');
}

function volumeMute() {
    world.audio = false;
    let volume = document.getElementById('volume');
    volume.src = 'img/hud/volume-off.svg';
    volume.setAttribute('onclick', 'volumeUp()');
}

function volumeUp() {
    world.audio = true;
    let volume = document.getElementById('volume');
    volume.src = 'img/hud/volume.svg';
    volume.setAttribute('onclick', 'volumeMute()');
}