document.addEventListener('DOMContentLoaded', function() {
    const audio = new Audio('song.mp3'); // Replace with your actual music file
    const playPauseBtn = document.getElementById('playPauseBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const progressBar = document.querySelector('.progress-bar');
    const visualizerCanvas = document.getElementById('visualizer');
    const visualizerContext = visualizerCanvas.getContext('2d');

    // Set up the Web Audio API context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // Set up the visualizer
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    visualizerContext.fillStyle = '#e07a5f'; // Orangish color
    function drawVisualizer() {
        analyser.getByteFrequencyData(dataArray);

        visualizerContext.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

        const barWidth = visualizerCanvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * visualizerCanvas.height;
            visualizerContext.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }

        requestAnimationFrame(drawVisualizer);
    }

    drawVisualizer();

    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    nextBtn.addEventListener('click', function() {
        // Logic for playing the next track
        // Update audio.src with the path to the next track
        audio.play();
    });

    prevBtn.addEventListener('click', function() {
        // Logic for playing the previous track
        // Update audio.src with the path to the previous track
        audio.play();
    });

    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
    });
});
