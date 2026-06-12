document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Page Loader Mask Dismissal
    const loader = document.querySelector('.page-loader');
    if(loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 200);
    }

    // 2. High-Fidelity SPA Route Link Architecture
    const routes = document.querySelectorAll('[data-target]');
    const panels = document.querySelectorAll('.view-panel');
    const navLinks = document.querySelectorAll('.nav-route');

    routes.forEach(route => {
        route.addEventListener('click', (e) => {
            const targetID = route.getAttribute('data-target');
            
            // Instantly transition viewport panels smooth
            panels.forEach(panel => {
                panel.classList.remove('active');
                if(panel.id === targetID) {
                    setTimeout(() => panel.classList.add('active'), 50);
                }
            });

            // Sync menu selector highlights
            navLinks.forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('data-target') === targetID) {
                    link.classList.add('active');
                }
            });

            // Push viewport scroll straight to zero axis
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 3. Kinetic Ambient Background Canvas Processing Pipeline
    const canvas = document.getElementById('ambient-canvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            alpha: Math.random() * 0.4 + 0.1
        });
    }

    function animateBg() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 122, 255, ${p.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(animateBg);
    }
    animateBg();

    // 4. Load Data array into Case Study Blocks
    let projectDataStore = [];
    const gridContainer = document.getElementById('dynamic-portfolio-grid');

    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            projectDataStore = data;
            renderGrid(projectDataStore);
            setupFilters();
        })
        .catch(err => console.error("Error building JSON portfolio cards:", err));

    function renderGrid(projects) {
        if(!gridContainer) return;
        gridContainer.innerHTML = "";
        
        projects.forEach((proj, index) => {
            const card = document.createElement('div');
            card.classList.add('project-card');
            card.style.animationDelay = `${index * 0.04}s`;

            let mediaHTML = proj.mediaType === "video" 
                ? `<video autoplay loop muted playsinline class="portfolio-media"><source src="${proj.mediaSrc}" type="video/mp4"></video>`
                : `<img src="${proj.mediaSrc}" alt="${proj.title}" class="portfolio-media" onerror="this.parentNode.innerHTML='<div class=\\'media-placeholder-graphic\\'>🎨</div>'">`;

            card.innerHTML = `
                <div class="card-media-wrapper">${mediaHTML}</div>
                <div class="card-content">
                    <div class="card-tags">
                        <span class="tag-category">${proj.title}</span>
                        <span class="tag-type">${proj.category === 'video' ? 'Motion/Film' : 'Graphic Layout'}</span>
                    </div>
                    <h3>${proj.client}</h3>
                    <p>${proj.description}</p>
                </div>`;
            gridContainer.appendChild(card);
        });