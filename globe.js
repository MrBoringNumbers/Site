// Raise Mobile Error
if (window.mobileCheck) {throw 'Globe is unsupported on mobile';}

// Start Globe Fade-In Timer
var startTime = new Date().getTime();

// Canvas settings
const canvas = document.getElementById("globe_canvas");
const context = canvas.getContext("2d");
canvas.width=1600;
canvas.height=1080;

var currentFrame = index => ((window.ImageSupport) ? `./globe (webp)/${index.toString().padStart(4, '0')}.webp` : `./globe (jpeg)/${index.toString().padStart(4, '0')}.jpeg`);

var loadedFrames = 0;
const frameCount = 1001;
const frameRate = 17;
const images = [];
const loadElement = document.getElementById("load");
const progress = document.getElementById("progress");

const xpos = 800 - (260/2)
const ypos = 540 - (260/2)

function incrementLoadedFrames() {
    loadedFrames += 1;
    if (loadedFrames == frameCount) {
        loadElement.style.display = 'none'
    } else {
        loadElement.style.display = ''
        progress.innerHTML = Math.floor( (loadedFrames/frameCount)*100 );
    }
}



// Setup Web Worker Listener

var worker = null

if (window.Worker) {
    console.log('Starting Globe Web Worker')
    worker = new Worker('globe_preload_web_worker.js')

    function workerListen(event) {
        images[event.data[0]] = new Image();
        images[event.data[0]].src = URL.createObjectURL(event.data[1])
        incrementLoadedFrames()
    }

    worker.addEventListener('message', workerListen)
} else {
    console.log('Web Worker is unsupported')
}

// End Setup


var preload_start_time = 0;

function preloadImages() {
    loadedFrames = 0
    console.log('preloading')
    preload_start_time = new Date().getTime();

    for (let i = 0; i < frameCount; i++) {

        if (worker) {worker.postMessage([i, currentFrame(i)])}

        else {
            images[i] = new Image();
            images[i].src = currentFrame(i);
            images[i].onload = incrementLoadedFrames
        }

    }

};

// Pause globe when not in view
spinInterval = null
function start_stop_globe(event) {
    clearInterval(spinInterval);
    if (event[0].isIntersecting) {spinInterval = setInterval(requestAnimationFrame,1000/frameRate,Step);}
}

const globe = document.getElementById('globe_container')
const globe_indicator = document.getElementById('globe_indicator')
globe.addEventListener('mousedown', function() {globe_indicator.style.transitionDuration = '300ms'; globe_indicator.style.transitionDelay = '300ms'; globe_indicator.style.opacity = 0;}, {passive: true})
globe.addEventListener('touchstart', function() {globe_indicator.style.transitionDuration = '300ms'; globe_indicator.style.transitionDelay = '300ms'; globe_indicator.style.opacity = 0;}, {passive: true})

const donut_img = new Image();
donut_img.src = './assets/donuthole.webp';
donut_img.onload = function(){
    donut_img.onload = null

    // Draw the first image
    const img = new Image();
    img.src = currentFrame(0);
    img.onload = function(){
        context.drawImage(img, xpos, ypos);
        context.drawImage(donut_img, 0, 0);

        // Decide Fade In
        if ((new Date().getTime() - startTime) > 50) {canvas.style.transition = 'opacity 700ms';}

        canvas.style.opacity = '1';
        window.addEventListener('load', function() {

            const loadSpeed = window.performance.timing["domContentLoadedEventEnd"] - window.performance.timing["connectStart"]
            console.log("PERF:", loadSpeed, "ms")
            if (loadSpeed > 1500) {return}

            // Show Indicator
            globe_indicator.style.opacity = 1;
            
            // Set Interval
            spinInterval = setInterval(requestAnimationFrame,1000/frameRate,Step);

            // Start preloading
            preloadImages()

            // Start globe observer
            let globe_observer = new IntersectionObserver(start_stop_globe);
            globe_observer.observe(globe);
        });

    }

}

// Dynamic Donuthole

function Resize_Donuthole() {
    if ((window.innerWidth/window.innerHeight) < 1) {
        donut_img.src = './assets/donuthole_smalltext.webp';
    } else {
        donut_img.src = './assets/donuthole.webp';
    }
}

Resize_Donuthole()
window.addEventListener('resize', Resize_Donuthole);

// End Dynamic Donuthole

var fi = 0

function Step() {
    fi += 1;
    if (fi >= frameCount) {fi = 0;}
    if (images[fi]) {
        context.drawImage(images[fi], xpos, ypos);
        context.drawImage(donut_img, 0, 0);
    }
}


// Globe Control
const period = Math.floor(600);
console.log('period distance:', period);


function TimeShift(event) {

    if (event.type == 'touchmove') {
        diffX = event.changedTouches[0].clientX - startX;
    } else {
        diffX = event.clientX - startX;
    }

    diffF = Math.floor( ((diffX/period)%1) * frameCount )

    new_fi = startF + diffF;

    if (new_fi > frameCount) {
        new_fi -= frameCount

    } else if (new_fi < 1) {
        new_fi = frameCount + new_fi
    }

    new_fi -= 1
    fi = new_fi

    requestAnimationFrame(Step)
}

function StartMove(event) {
    clearInterval(spinInterval);
    startF = fi;

    if (event.type == 'touchstart') {
        startX = event.changedTouches[0].clientX;
        globe.addEventListener('touchmove', TimeShift);

    } else {
        startX = event.clientX;
        globe.addEventListener('mousemove', TimeShift);
    }
}

function EndMove(event) {
    clearInterval(spinInterval);
    spinInterval = setInterval(requestAnimationFrame,1000/frameRate,Step);
    globe.removeEventListener('touchmove', TimeShift);
    globe.removeEventListener('mousemove', TimeShift);
}


globe.addEventListener('mousedown', StartMove);
globe.addEventListener('mouseup', EndMove);

globe.addEventListener('touchstart', StartMove, {passive: true});
globe.addEventListener('touchend', EndMove, {passive: true});
globe.addEventListener('touchcancel', EndMove, {passive: true});