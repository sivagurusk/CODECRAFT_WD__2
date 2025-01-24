let startTime = 0;
        let elapsedTime = 0;
        let intervalId;
        let running = false;

        const timeDisplay = document.getElementById('time');
        const lapsList = document.getElementById('laps');

        function formatTime(ms) {
            const totalSeconds = Math.floor(ms / 1000);
            const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
            const seconds = String(totalSeconds % 60).padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        }

        function updateDisplay() {
            const currentTime = Date.now() - startTime + elapsedTime;
            timeDisplay.textContent = formatTime(currentTime);
        }

        document.getElementById('start').addEventListener('click', () => {
            if (!running) {
                running = true;
                startTime = Date.now();
                intervalId = setInterval(updateDisplay, 100);
            }
        });

        document.getElementById('pause').addEventListener('click', () => {
            if (running) {
                running = false;
                elapsedTime += Date.now() - startTime;
                clearInterval(intervalId);
            }
        });

        document.getElementById('reset').addEventListener('click', () => {
            running = false;
            clearInterval(intervalId);
            startTime = 0;
            elapsedTime = 0;
            timeDisplay.textContent = "00:00:00";
            lapsList.innerHTML = '';
        });

        document.getElementById('lap').addEventListener('click', () => {
            if (running) {
                const currentTime = Date.now() - startTime + elapsedTime;
                const lapItem = document.createElement('li');
                lapItem.textContent = formatTime(currentTime);
                lapsList.appendChild(lapItem);
            }
        });