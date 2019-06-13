window.SMAudio = (function () {
    'use strict';

    // Global vars

    let audioFileName = "devil.mp3";
    let canvasWidth = 800;
    let canvasHeight = 600;
    let buttonName = "testbtn";
    let canvasName = "canvas";

    let audioContext = null;
    let audioBuffer = null;
    let audioSource = null;
    let audioAnalyser = null;
    let audioFequencies = null;
    let audioTimes = null;

    let playingFlag = false;
    let loadedCallback = null;
    let bucketCount = 32;
    let analyserCallback = null;
    let analyserCallbackMethod = "Analyse";

    // Functions and stuff

    function _raiseLoadedEvent() {
        if (loadedCallback) {
            loadedCallback();
        }
    }

    function _createAudioAnalyzer() {
        // The analyser is responsible for providing data on the playing sound
        audioAnalyser = audioContext.createAnalyser();
        audioAnalyser.connect(audioContext.destination); // The analyser connects to the speaker output
        audioAnalyser.minDecibels = -140; // Loudest end of the audio to map
        audioAnalyser.maxDecibels = 0; // Quietest end of the audio to map
        audioFequencies = new Uint8Array(audioAnalyser.frequencyBinCount); // Set up some funky byte arrays to recieve the frequency data
        audioTimes = new Uint8Array(audioAnalyser.frequencyBinCount);
    }

    function _loadAudio(audioFileName, done) {

        // Use standard ajax to grab the audio file from the server
        let request = new XMLHttpRequest();

        request.open("GET", audioFileName, true);
        request.responseType = 'arraybuffer';

        request.onload = () => {
            audioContext.decodeAudioData(request.response, (buffer) => {

                audioBuffer = buffer;
                if (done) {
                    done();
                } else {
                    audioLoadedHandler();
                }

            });
        };
        request.send();
    }

    function _playAudio() {
        // The buffer source is responsible for holding the actual currently playing audio
        audioSource = audioContext.createBufferSource();

        audioSource.buffer = audioBuffer; // Attach our loaded buffer to the source/player buffer
        audioSource.connect(audioAnalyser); // The actual sound connects to the analyser
        audioSource.start(0); // Start at the beginning, this can be any SMTPE ticks, time period into the audio
    }

    function stopAudio() {
        if (audioSource) {
            audioSource.stop();
        }
    }

    function _processFrequencyBuckets() {
        if (analyserCallback) {
            audioAnalyser.smoothingTimeConstant = 0.8;
            audioAnalyser.fftSize = bucketCount;

            audioAnalyser.getByteFrequencyData(audioFequencies);

            let frequencies = [];

            for (let index = 0; index < audioAnalyser.frequencyBinCount; index++) {
                let value = audioFequencies[index];
                frequencies.push(value);
            }

            analyserCallback.invokeMethodAsync(analyserCallbackMethod, frequencies);

            if (playingFlag) {
                window.requestAnimationFrame(_processFrequencyBuckets);
            }
        }
    }

    function setAnalyserCallback(callback, method) {
        analyserCallback = callback;
        if (method) {
            analyserCallbackMethod = method;
        }
    }

    function setBucketCount(buckets) {
        bucketCount = buckets;
    }

    function setLoadedCallback(callBack) {
        loadedCallback = callBack;
    }

    function setAudioFile(filename) {
        audioFileName = filename;
    }

    function toggleAudio() {
        if (!playingFlag) {
            playAudio();
            window.requestAnimationFrame(_processFrequencyBuckets(bucketCount)); // This is what starts the FFT
            playingFlag = !playingFlag;
            raisePlaybackEvent("play");
        }
        else {
            stopAudio();
            playingFlag = !playingFlag;
            setButtonText(buttonName, "Play Audio");
            raisePlaybackEvent("stop");
        }
    }

    function playAndAnalyse(filename, callback) {
        setAudioFile(filename);
        setAnalyserCallback(callback);
        audioContext = new AudioContext();
        _createAudioAnalyzer();

        _loadAudio(audioFileName, () => {
            _playAudio();
            playingFlag = true;
            _processFrequencyBuckets();
        });
    }

    return {
        setBucketCount: setBucketCount,
        setLoadedCallback: setLoadedCallback,
        setAudioFile: setAudioFile,
        toggleAudio: toggleAudio,
        stopAudio: stopAudio,
        playAndAnalyse: playAndAnalyse
    };

}());
