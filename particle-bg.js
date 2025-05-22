function initParticleBackground(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    const particles = [];
    const PARTICLE_COUNT = 80;
    const MAX_DIST = 150;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            r: 2 + Math.random() * 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        // Track which pairs are already connected
        const connected = Array.from({ length: PARTICLE_COUNT }, () => ({}));

        // Get current theme
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        const particleColor = isDarkMode ? '#a080ff' : '#6b4bff';
        const lineColor = isDarkMode ? 'rgba(150, 100, 255,' : 'rgba(107, 75, 255,';

        // Draw lines for close particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    ctx.strokeStyle = lineColor + (1 - dist / MAX_DIST) + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    connected[i][j] = true;
                    connected[j][i] = true;
                }
            }
        }

        // Ensure every dot is connected to its nearest neighbor
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            let minDist = Infinity;
            let nearest = -1;
            for (let j = 0; j < PARTICLE_COUNT; j++) {
                if (i === j) continue;
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = j;
                }
            }
            if (nearest !== -1 && !connected[i][nearest]) {
                ctx.strokeStyle = lineColor + '0.2)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[nearest].x, particles[nearest].y);
                ctx.stroke();
                connected[i][nearest] = true;
                connected[nearest][i] = true;
            }
        }

        // Draw particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            ctx.beginPath();
            ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();

            // Move
            particles[i].x += particles[i].vx;
            particles[i].y += particles[i].vy;

            // Bounce
            if (particles[i].x < 0 || particles[i].x > w) particles[i].vx *= -1;
            if (particles[i].y < 0 || particles[i].y > h) particles[i].vy *= -1;
        }

        requestAnimationFrame(draw);
    }

    draw();
} 