// Countdown timer: sempre inicia em 00D 00H 16MIN 46S para cada visitante
let duration = (0 * 24 * 60 * 60) + (0 * 60 * 60) + (16 * 60) + 46;

// Function to update timer
function updateTimer() {
    duration--;

    if (duration < 0) {
        // Reset se expirar
        duration = (0 * 24 * 60 * 60) + (0 * 60 * 60) + (16 * 60) + 46;
    }

    const days = Math.floor(duration / (24 * 60 * 60));
    const hours = Math.floor((duration % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((duration % (60 * 60)) / 60);
    const seconds = Math.floor(duration % 60);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Update every second
setInterval(updateTimer, 1000);

// Initialize immediately
updateTimer();

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.plan-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(card);
    });
});

// =====================
// Sales Notifications
// =====================
(function () {
    const names = [
        'Lucas M.', 'Fernanda S.', 'Gabriel O.', 'Beatriz L.', 'Rafael T.',
        'Ana Clara R.', 'Matheus C.', 'Juliana P.', 'Pedro H.', 'Larissa V.',
        'Diego A.', 'Camila N.', 'Bruno F.', 'Mariana K.', 'Thiago B.',
        'Isabela G.', 'Victor R.', 'Letícia M.', 'Gustavo D.', 'Natalia E.',
        'Felipe J.', 'Priscila W.', 'Rodrigo C.', 'Amanda X.', 'Leonardo Z.',
        'Bianca H.', 'Henrique S.', 'Paloma T.', 'André L.', 'Vanessa Q.',
        'Caio M.', 'Rebeca F.', 'Eduardo N.', 'Sabrina I.', 'Vinicius P.'
    ];

    // Grow Evolution aparece ~70% das vezes, Essencial ~30%
    const plans = [
        { name: 'GROW Evolution', weight: 7 },
        { name: 'GROW Evolution', weight: 7 },
        { name: 'GROW Evolution', weight: 7 },
        { name: 'GROW Evolution', weight: 7 },
        { name: 'GROW Evolution', weight: 7 },
        { name: 'GROW Evolution', weight: 7 },
        { name: 'GROW Evolution', weight: 7 },
        { name: 'GROW Essencial', weight: 3 },
        { name: 'GROW Essencial', weight: 3 },
        { name: 'GROW Essencial', weight: 3 },
    ];

    const timeLabels = ['agora mesmo', 'há 1 min', 'há 2 min', 'há 3 min', 'há 5 min'];

    let nameIndex = Math.floor(Math.random() * names.length);

    function getNextName() {
        const name = names[nameIndex % names.length];
        nameIndex++;
        return name;
    }

    function getRandomPlan() {
        return plans[Math.floor(Math.random() * plans.length)].name;
    }

    function getRandomTime() {
        return timeLabels[Math.floor(Math.random() * timeLabels.length)];
    }

    function showNotification() {
        const container = document.getElementById('notif-container');
        if (!container) return;

        const name = getNextName();
        const plan = getRandomPlan();
        const time = getRandomTime();
        const isEvolution = plan === 'GROW Evolution';

        const notif = document.createElement('div');
        notif.className = 'sale-notif';
        notif.innerHTML = `
            <div class="notif-icon">
                <i class="fa-solid fa-bag-shopping"></i>
            </div>
            <div class="notif-body">
                <div class="notif-name">${name} comprou</div>
                <div class="notif-plan">Plano <span>${plan}</span></div>
                <div class="notif-time">
                    <div class="notif-dot"></div>
                    ${time}
                </div>
            </div>
        `;

        container.appendChild(notif);

        // Auto-remove after 5s with slide-out
        setTimeout(() => {
            notif.classList.add('hide');
            setTimeout(() => {
                if (notif.parentNode) notif.parentNode.removeChild(notif);
            }, 420);
        }, 5000);
    }

    // Intervalo aleatório entre 25 e 45 segundos para parecer mais real
    function randomInterval() {
        return Math.floor(Math.random() * (45000 - 25000 + 1)) + 25000;
    }

    function scheduleNext() {
        setTimeout(() => {
            showNotification();
            scheduleNext();
        }, randomInterval());
    }

    // Primeira notificação após 5 segundos
    setTimeout(() => {
        showNotification();
        scheduleNext();
    }, 5000);
})();

