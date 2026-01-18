(function () {
    const SNOW_COUNT = 100;
    const STORAGE_KEY = 'snowEnabled';
    let snowflakes = [];

    function createSnow() {
        for (let i = 0; i < SNOW_COUNT; i++) {
            const s = document.createElement('div');
            s.className = 'snowflake';
            s.textContent = '❄';

            const size = Math.random() * 10 + 8;
            s.style.fontSize = size + 'px';
            s.style.left = Math.random() * 100 + 'vw';

            const fall = Math.random() * 20 + 25;
            const sway = Math.random() * 6 + 6;
            s.style.animationDuration = `${fall}s, ${sway}s`;
            s.style.animationDelay = `${Math.random() * 10}s`;

            document.body.appendChild(s);
            snowflakes.push(s);
        }
    }

    function removeSnow() {
        snowflakes.forEach(s => s.remove());
        snowflakes = [];
    }

    function toggleSnow(force) {
        const enabled = force !== undefined
            ? force
            : localStorage.getItem(STORAGE_KEY) !== 'false';

        localStorage.setItem(STORAGE_KEY, enabled);

        if (enabled && snowflakes.length === 0) createSnow();
        if (!enabled) removeSnow();

        toggleBtn.textContent = enabled ? '❄ Снег: ВКЛ' : '❄ Снег: ВЫКЛ';
    }

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'snow-toggle';
    document.body.appendChild(toggleBtn);

    toggleBtn.onclick = () => {
        const current = localStorage.getItem(STORAGE_KEY) !== 'false';
        toggleSnow(!current);
    };

    toggleSnow();
})();
