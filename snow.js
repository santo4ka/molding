(function () {
    const STORAGE_KEY = 'snowEnabled';
    const MAX_SNOW = 70; //больше меньше
    const SPAWN_INTERVAL = 700; //густота снега

    let snowflakes = [];
    let timer = null;

    function createSnowflake() {
        if (snowflakes.length >= MAX_SNOW) return;

        const s = document.createElement('div');
        s.className = 'snowflake';
        s.textContent = '❄';

        const size = Math.random() * 10 + 6;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 20;
        const startY = Math.random() * -100;

        s.style.fontSize = size + 'px';
        s.style.left = left + 'vw';
        s.style.top = startY + 'px';
        s.style.opacity = Math.random() * 0.5 + 0.4;
        s.style.animationDuration = duration + 's';
        s.style.animationDelay = Math.random() * 5 + 's';

        document.body.appendChild(s);
        snowflakes.push(s);

        setTimeout(() => {
            s.remove();
            snowflakes = snowflakes.filter(f => f !== s);
        }, (duration + 5) * 1000);
    }

    function startSnow() {
        if (timer) return;
        timer = setInterval(createSnowflake, SPAWN_INTERVAL);
    }

    function stopSnow() {
        clearInterval(timer);
        timer = null;
        snowflakes.forEach(s => s.remove());
        snowflakes = [];
    }

    function toggleSnow(force) {
        const enabled = force !== undefined
            ? force
            : localStorage.getItem(STORAGE_KEY) !== 'false';

        localStorage.setItem(STORAGE_KEY, enabled);

        enabled ? startSnow() : stopSnow();
        toggleBtn.textContent = enabled ? '❄ Снег: ВКЛ' : '❄ Снег: ВЫКЛ';
    }

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'snow-toggle';
    document.body.appendChild(toggleBtn);

    toggleBtn.onclick = () => {
        toggleSnow(localStorage.getItem(STORAGE_KEY) === 'false');
    };

    toggleSnow();
})();
