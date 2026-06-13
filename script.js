document.addEventListener("DOMContentLoaded", () => {
    
    // 1. RE-ENGINEERED CINEMATIC SCREEN LAUNCH ANIMATION FLUID TIMELINE
    const introLoader = document.getElementById("intro-loader");
    const introText = document.getElementById("intro-text");

    if (introLoader && introText) {
        // Trigger subtle upward text fade-in shift
        setTimeout(() => {
            introText.classList.add("visible");
        }, 300);

        // Sequence text swapping smoothly
        setTimeout(() => {
            introText.classList.remove("visible");
            setTimeout(() => {
                introText.innerText = "Design. Motion. Storytelling.";
                introText.classList.add("visible");
            }, 400);
        }, 1800);

        // Lift loader curtain cleanly away
        setTimeout(() => {
            introLoader.style.transform = "translateY(-100vh)";
        }, 3400);
    }

    // Add this inside your existing DOMContentLoaded listener:
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    // FIXED HISTORY STATE
history.replaceState(
    {
        page: "section",
        id: "work"
    },
    "",
    ""
);
    // 2. ORBITING BACKGROUND PARTICLES ENGINE
    const canvas = document.getElementById('ambient-canvas');

    if (canvas) {
        const ctx = canvas.getContext('2d');

        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });

        const dots = [];

        for (let i = 0; i < 25; i++) {
            dots.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.2 + 1,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15
            });
        }

        function draw() {
            ctx.clearRect(0,0,w,h);

            dots.forEach(d => {
                d.x += d.vx;
                d.y += d.vy;

                if(d.x < 0 || d.x > w) d.vx *= -1;
                if(d.y < 0 || d.y > h) d.vy *= -1;

                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);

                ctx.fillStyle = "rgba(0, 122, 255, 0.15)";
                ctx.fill();
            });

            requestAnimationFrame(draw);
        }

        draw();
    }

    // 3. SECURE EXPERIENCE OBJECT DATABASE ENGINE
    const experienceDetailsData = {
        kaji: {
            title: "Kaji Production",
            role: "Lead Motion Designer & Video Editor",
            timeline: "APR 2026 - ONGOING",
            achievements: [
                "Lead end-to-end production of motion graphics and video content.",
                "Manage complex project timelines and technical pacing adjustments.",
                "Direct creative visual identity for high-profile promotional campaigns."
            ],
            letterAsset: null
        },

        craftalaya: {
            title: "Craftalaya",
            role: "Graphic Designer & Video Editor",
            timeline: "JUN 2024 - NOV 2025",
            achievements: [
                "Designed social media ads and promotional creative assets.",
                "Edited dynamic promotional videos using Adobe Premiere Pro and After Effects.",
                "Delivered creative solutions for partner businesses."
            ],
            letterAsset: {
                path: "assets/craftalaya_letter.jpg",
                label: "View Craftalaya Experience Letter"
            }
        }
    };

    // 4. INTERACTIVE BLURRED ACCORDION DETAIL OVERLAY MANAGER
    const detailsModal = document.getElementById("experience-details-modal");
    const modalTitle = document.getElementById("modal-org-title");
    const modalRole = document.getElementById("modal-org-role");
    const modalTimeline = document.getElementById("modal-org-timeline");
    const modalList = document.getElementById("modal-achievements-list");
    const modalActionArea = document.getElementById("modal-document-action-area");

    window.openDetailsModal = function(key) {

        const item = experienceDetailsData[key];

        if (!item || !detailsModal) return;

        modalTitle.innerText = item.title;
        modalRole.innerText = item.role;
        modalTimeline.innerText = item.timeline;

        modalList.innerHTML = "";

        item.achievements.forEach(pt => {
            const li = document.createElement("li");
            li.innerText = pt;
            modalList.appendChild(li);
        });

        modalActionArea.innerHTML = "";

        if (item.letterAsset) {

            const btn = document.createElement("button");

            btn.classList.add("view-document-btn");
            btn.innerText = item.letterAsset.label;

            btn.onclick = () => {
                openCredentialModal(
                    item.letterAsset.path,
                    item.letterAsset.label
                );
            };

            modalActionArea.appendChild(btn);
        }

        detailsModal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    window.closeDetailsModal = function() {

        if (!detailsModal) return;

        detailsModal.classList.remove("active");

        if (!document.getElementById("credential-viewer-modal")
            .classList.contains("active")) {

            document.body.style.overflow = "";
        }
    };

    // 5. MAIN SPA ROUTER PANEL INTERACTION ENGINE
    window.switchSection = function(sectionTargetID, fromPopState = false) {

        exitDedicatedPage();
        closeDetailsModal();
        closeCredentialModal();

        document.querySelectorAll('.view-panel')
            .forEach(panel => panel.classList.remove('active'));

        const targetedPanel =
            document.getElementById(`section-${sectionTargetID}`);

        if (targetedPanel)
            targetedPanel.classList.add('active');

        document.querySelectorAll('.nav-route')
            .forEach(route => route.classList.remove('active'));

        const activeRouteButton =
            document.getElementById(`nav-${sectionTargetID}`);

        if (activeRouteButton)
            activeRouteButton.classList.add('active');

        // FIXED HISTORY
        if (!fromPopState) {
            history.pushState(
                { page: "section", id: sectionTargetID },
                "",
                ""
            );
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // 6. MOUSE HOVER RADIAL CARD LIGHTING GRADIENTS
    function registerCardLightingEffect() {

        document.querySelectorAll('.org-card').forEach(card => {

            card.addEventListener('mousemove', (e) => {

                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // 7. JSON WORKS INJECTOR
    let orgDataStore = [];

    const orgGridElement =
        document.getElementById("organization-grid");

    fetch("projects.json")
        .then(res => res.json())
        .then(data => {

            orgDataStore = data;

            renderOrganizationGrid(orgDataStore);

            registerCardLightingEffect();
        })
        .catch(err =>
            console.error(
                "Error setting up corporate dataset arrays:",
                err
            )
        );

    function renderOrganizationGrid(data) {

        if (!orgGridElement) return;

        orgGridElement.innerHTML = "";

        data.forEach(org => {

            const card = document.createElement("div");

            card.classList.add("org-card");

            card.setAttribute(
                "onclick",
                `navigateToDedicatedPage('${org.id}')`
            );

            card.innerHTML = `
                <div class="org-card-header">
                    <div class="glass-ui-logo-box">
                        <img
                            src="assets/logos/${org.id}.png"
                            alt="${org.organizationName} Logo">
                    </div>
                </div>

                <h3>${org.organizationName}</h3>

                <div class="org-role-tag">
                    ${org.skillsScope}
                </div>

                <p>${org.shortOverview}</p>
            `;

            orgGridElement.appendChild(card);
        });
    }

    // 8. DEDICATED VAULT ROUTERS
    const mainPage =
        document.getElementById("main-portfolio-page");

    const dedicatedPage =
        document.getElementById("dedicated-work-page");

    const sectionsContainer =
        document.getElementById("project-sections-container");

    window.navigateToDedicatedPage = function(orgID, fromPopState = false) {

        const matchingOrg =
            orgDataStore.find(item => item.id === orgID);

        if(!matchingOrg || !dedicatedPage || !mainPage)
            return;

        document.getElementById("project-page-title")
            .innerText = matchingOrg.organizationName;

        document.getElementById("project-page-desc")
            .innerText = matchingOrg.shortOverview;

        document.getElementById("project-page-type")
            .innerText = matchingOrg.skillsScope;

        sectionsContainer.innerHTML = "";

        matchingOrg.sections.forEach(sec => {

            const clientBlock =
                document.createElement("div");

            clientBlock.classList.add("client-showcase-block");

            let gridItemsHTML = "";

            sec.assets.forEach(asset => {

                let mediaEmbed = "";

                if (asset.type === "youtube") {

                    mediaEmbed = `
                        <iframe
                            src="https://www.youtube.com/embed/${asset.srcID}"
                            allowfullscreen>
                        </iframe>
                    `;

                } else {

                    mediaEmbed = `
                        <img
                            src="${asset.srcID}"
                            alt="${asset.title}">
                    `;
                }

                gridItemsHTML += `
                    <div class="vault-item-node">
                        <div class="vault-media-box">
                            ${mediaEmbed}
                        </div>

                        <div class="vault-item-meta">
                            <h4>${asset.title}</h4>
                            <p>${asset.metaDescription}</p>
                        </div>
                    </div>
                `;
            });

            clientBlock.innerHTML = `
                <div class="client-block-header">
                    <h3>${sec.name}</h3>
                    <p>${sec.workTypeTag}</p>
                </div>

                <div class="works-grid-layout">
                    ${gridItemsHTML}
                </div>
            `;

            sectionsContainer.appendChild(clientBlock);
        });

        mainPage.classList.add("display-none");
        dedicatedPage.classList.remove("display-none");

        // FIXED HISTORY
        if (!fromPopState) {
            history.pushState(
                { page: "project", id: orgID },
                "",
                ""
            );
        }

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    };

    window.exitDedicatedPage = function() {

        if(!dedicatedPage || !mainPage) return;

        dedicatedPage.classList.add("display-none");
        mainPage.classList.remove("display-none");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    };

    // 9. CREDENTIAL VIEW OVERLAYS MECHANICS
    const credModal =
        document.getElementById("credential-viewer-modal");

    const credImg =
        document.getElementById("document-modal-img");

    const credTitle =
        document.getElementById("document-modal-title");

    window.openCredentialModal = function(imagePath, titleText) {

        if (!credModal || !credImg || !credTitle)
            return;

        credImg.src = imagePath;
        credTitle.innerText = titleText;

        credModal.classList.add("active");

        document.body.style.overflow = "hidden";
    };

    window.closeCredentialModal = function() {

        if (!credModal) return;

        credModal.classList.remove("active");

        if (!detailsModal.classList.contains("active")) {
            document.body.style.overflow = "";
        }

        setTimeout(() => {
            if (credImg) credImg.src = "";
        }, 350);
    };

    // FIXED BACK BUTTON SUPPORT
    window.addEventListener("popstate", (event) => {

        if (!event.state) return;

        if (event.state.page === "section") {

            exitDedicatedPage();

            switchSection(event.state.id, true);
        }

        if (event.state.page === "project") {

            navigateToDedicatedPage(
                event.state.id,
                true
            );
        }
if (
    event.state.page === "section" &&
    event.state.id === "work"
) {

    exitDedicatedPage();

    document.querySelectorAll('.view-panel')
        .forEach(panel =>
            panel.classList.remove('active')
        );

    const workPanel =
        document.getElementById("section-work");

    if (workPanel) {
        workPanel.classList.add("active");
    }

    document.querySelectorAll('.nav-route')
        .forEach(route =>
            route.classList.remove('active')
        );

    const workNav =
        document.getElementById("nav-work");

    if (workNav) {
        workNav.classList.add('active');
    }
}
    });
});