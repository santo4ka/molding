(function () {
    const STORAGE_KEY = 'snowEnabled';
    const MAX_SNOW = 60;  // сильный снег
    const SPAWN_INTERVAL = 700; // чем меньше — тем гуще снег

    let snowflakes = [];
    let spawnTimer = null;

    function createSnowflake() {
        if (snowflakes.length >= MAX_SNOW) return;

        const s = document.createElement('div');
        s.className = 'snowflake';
        s.textContent = '❄';

        const size = Math.random() * 10 + 8;
        const left = Math.random() * 100;

        s.style.fontSize = size + 'px';
        s.style.left = left + 'vw';
        s.style.top = '-20px';

        const fallDuration = Math.random() * 20 + 25;
        const swayDuration = Math.random() * 6 + 6;

        s.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
        s.style.animationDelay = `0s`;

        document.body.appendChild(s);
        snowflakes.push(s);

        // удаляем снежинку после падения
        setTimeout(() => {
            s.remove();
            snowflakes = snowflakes.filter(f => f !== s);
        }, fallDuration * 1000);
    }

    function startSnow() {
        if (spawnTimer) return;
        spawnTimer = setInterval(createSnowflake, SPAWN_INTERVAL);
    }

    function stopSnow() {
        clearInterval(spawnTimer);
        spawnTimer = null;
        snowflakes.forEach(s => s.remove());
        snowflakes = [];
    }

    function toggleSnow(force) {
        const enabled = force !== undefined
            ? force
            : localStorage.getItem(STORAGE_KEY) !== 'false';

        localStorage.setItem(STORAGE_KEY, enabled);

        if (enabled) startSnow();
        else stopSnow();

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
