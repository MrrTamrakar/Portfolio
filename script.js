
document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================================
    // 1. CINEMATIC SCREEN LAUNCH ANIMATION
    // =========================================================================
    const introLoader = document.getElementById("intro-loader");
    const introText = document.getElementById("intro-text");

    if (introLoader && introText) {
        setTimeout(() => {
            introText.classList.add("visible");
        }, 300);

        setTimeout(() => {
            introText.classList.remove("visible");
            setTimeout(() => {
                introText.innerText = "Design. Motion. Storytelling.";
                introText.classList.add("visible");
            }, 400);
        }, 1800);

        setTimeout(() => {
            introLoader.style.transform = "translateY(-100vh)";
        }, 3400);
    }

    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    // =========================================================================
    // 2. ORBITING BACKGROUND PARTICLES ENGINE
    // =========================================================================
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
            ctx.clearRect(0, 0, w, h);
            dots.forEach(d => {
                d.x += d.vx; d.y += d.vy;
                if (d.x < 0 || d.x > w) d.vx *= -1;
                if (d.y < 0 || d.y > h) d.vy *= -1;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(0, 122, 255, 0.15)";
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    // =========================================================================
    // 3. EXPERIENCE DATA
    //    achievements arrays use a special format:
    //      - strings starting with a digit + "." become bold role headings
    //      - all other strings become bullet points under the nearest heading
    //      - if no heading exists yet, bullets go into an unnamed first block
    // =========================================================================
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
            role: "Graphic Designer & Video Editor (Freelance)",
            timeline: "JUN 2024 - NOV 2025",
            achievements: [
                "Designed customizable social media posts, ads, and promotional creative assets.",
                "Edited promotional videos using Adobe Premiere Pro and After Effects.",
                "Delivered creative solutions for multiple partner businesses, enhancing brand consistency for Glorious Nepal Consultancy and driving a 15% booking increase for AT Travels & Tours."
            ],
            letterAsset: { path: "assets/craftalaya_letter.jpg", label: "View Craftalaya Tech Experience Letter" }
        },
        kashyap: {
            title: "Kashyap Advisors",
            role: "Graphic Designer & Video Editor",
            timeline: "DEC 2025 - MAY 2026",
            achievements: [
                "Led creative execution for group entities, ensuring a unified visual identity across all platforms.",
                "Developed marketing collateral, promotional campaigns, printing materials and consultancy-focused visual communication materials.",
                "Produced high-impact marketing videos and social media graphics to enhance digital engagement and brand positioning."
            ],
            letterAsset: { path: "assets/kashyap_letter.jpg", label: "View Kashyap Experience Letter" }
        },
        paila: {
            title: "Paila Education Consultancy",
            role: "Graphic Designer & Video Editor",
            timeline: "NOV 2025 - FEB 2026",
            achievements: [
                "1. Graphic Designer & Video Editor (Nov 2025 – Feb 2026)",
                "Designed social media posts, educational graphics, podcast videos and promotional visuals.",
                "Created thumbnails, banners, and motion graphics to optimize content delivery.",
                "Translated complex admission and visa documentation into clear, visually structured content.",
                "2. Intern (Jun 2025 – Sep 2025)",
                "Produced 100+ educational posts and motion-based graphics.",
                "Edited promotional and podcast videos for various platforms."
            ],
            letterAsset: { path: "assets/paila_letter.jpg", label: "View Paila Experience Letter" }
        },
        sprachschule: {
            title: "Sprachschule Kathmandu",
            role: "Digital Media Coordinator / Junior Assistant Manager / Graphic Designer",
            timeline: "OCT 2024 - NOV 2025",
            achievements: [
                "1. Digital Media Coordinator (Jul 2025 – Nov 2025)",
                "Planned and executed social media content calendars.",
                "Captured and edited event-based media and promotional content.",
                "2. Junior Assistant Manager (Jan 2025 – Jun 2025)",
                "Produced marketing materials including banners, bills, and flyers.",
                "Supported on-site event management and provided creative direction.",
                "3. Graphic Designer (Oct 2024 – Dec 2024)",
                "Designed branded social media posts and marketing graphics.",
                "Developed visual assets to support school programs and official announcements."
            ],
            letterAsset: { path: "assets/sprachschule_letter.jpg", label: "View Sprachschule Experience Letter" }
        }
    };

    // =========================================================================
    // 4. MODAL RENDERER — parses numbered headings vs bullet points
    // =========================================================================

    /**
     * Renders the achievements array into structured role blocks.
     * Lines that start with a digit followed by "." are treated as
     * bold role headings; everything else becomes a bullet point.
     */
    function renderAchievements(achievements) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("modal-achievements-wrapper");

        // Detect if this org has any numbered headings at all
        const hasHeadings = achievements.some(line => /^\d+\./.test(line.trim()));

        if (!hasHeadings) {
            // Simple single-role org — just a plain bulleted list
            const ul = document.createElement("ul");
            ul.classList.add("modal-role-points");
            achievements.forEach(point => {
                const li = document.createElement("li");
                li.innerText = point;
                ul.appendChild(li);
            });
            // Wrap in a single block for consistent padding
            const block = document.createElement("div");
            block.classList.add("modal-role-block");
            block.appendChild(ul);
            wrapper.appendChild(block);
            return wrapper;
        }

        // Multi-role org — group into blocks by heading
        let currentBlock = null;
        let currentList = null;

        achievements.forEach(line => {
            if (/^\d+\./.test(line.trim())) {
                // Start a new role block
                currentBlock = document.createElement("div");
                currentBlock.classList.add("modal-role-block");

                const heading = document.createElement("div");
                heading.classList.add("modal-role-heading");
                heading.innerText = line;
                currentBlock.appendChild(heading);

                currentList = document.createElement("ul");
                currentList.classList.add("modal-role-points");
                currentBlock.appendChild(currentList);

                wrapper.appendChild(currentBlock);
            } else {
                // Bullet point — attach to current block
                if (!currentList) {
                    // Edge case: bullets before any heading
                    currentBlock = document.createElement("div");
                    currentBlock.classList.add("modal-role-block");
                    currentList = document.createElement("ul");
                    currentList.classList.add("modal-role-points");
                    currentBlock.appendChild(currentList);
                    wrapper.appendChild(currentBlock);
                }
                const li = document.createElement("li");
                li.innerText = line;
                currentList.appendChild(li);
            }
        });

        return wrapper;
    }

    // =========================================================================
    // 5. MODAL OPEN / CLOSE LOGIC
    // =========================================================================
    const detailsModal = document.getElementById("experience-details-modal");
    const modalTitle = document.getElementById("modal-org-title");
    const modalRole = document.getElementById("modal-org-role");
    const modalTimeline = document.getElementById("modal-org-timeline");
    const modalAchievementsContainer = document.getElementById("modal-achievements-list");
    const modalActionArea = document.getElementById("modal-document-action-area");

    window.openDetailsModal = function(key) {
        const item = experienceDetailsData[key];
        if (!item || !detailsModal) return;

        modalTitle.innerText = item.title;
        modalRole.innerText = item.role;
        modalTimeline.innerText = item.timeline;

        // Clear and re-render achievements with the new structured renderer
        modalAchievementsContainer.innerHTML = "";
        modalAchievementsContainer.appendChild(renderAchievements(item.achievements));

        // Render optional experience letter button
        modalActionArea.innerHTML = "";
        if (item.letterAsset) {
            const btn = document.createElement("button");
            btn.classList.add("view-document-btn");
            btn.innerText = item.letterAsset.label;
            btn.onclick = () => {
                openCredentialModal(item.letterAsset.path, item.letterAsset.label);
            };
            modalActionArea.appendChild(btn);
        }

        detailsModal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    window.closeDetailsModal = function() {
        if (!detailsModal) return;
        detailsModal.classList.remove("active");
        const credModal = document.getElementById("credential-viewer-modal");
        if (!credModal.classList.contains("active")) {
            document.body.style.overflow = "";
        }
    };

    // =========================================================================
    // 6. SPA ROUTER — with scroll-to-top and browser history
    // =========================================================================
    let currentSection = 'work';

    window.switchSection = function(sectionTargetID, pushHistory = true) {
        _exitDedicatedPageSilent();
        closeDetailsModal();
        closeCredentialModal();

        document.querySelectorAll('.view-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        const targetedPanel = document.getElementById(`section-${sectionTargetID}`);
        if (targetedPanel) {
            requestAnimationFrame(() => {
                targetedPanel.classList.add('active');
            });
        }

        document.querySelectorAll('.nav-route').forEach(route => route.classList.remove('active'));
        const activeRouteButton = document.getElementById(`nav-${sectionTargetID}`);
        if (activeRouteButton) activeRouteButton.classList.add('active');

        // Scroll to top on every section switch
        window.scrollTo({ top: 0, behavior: "smooth" });

        if (pushHistory && sectionTargetID !== currentSection) {
            history.pushState({ section: sectionTargetID, page: 'main' }, '', `#${sectionTargetID}`);
        }
        currentSection = sectionTargetID;
    };

    // =========================================================================
    // 7. MOUSE HOVER RADIAL CARD LIGHTING
    // =========================================================================
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

    // =========================================================================
    // 8. JSON WORKS INJECTOR — with skeleton loader
    // =========================================================================
    let orgDataStore = [];
    const orgGridElement = document.getElementById("organization-grid");
    const orgSkeleton = document.getElementById("org-loading-skeleton");

    fetch("projects.json")
        .then(res => res.json())
        .then(data => {
            orgDataStore = data;
            renderOrganizationGrid(orgDataStore);
            registerCardLightingEffect();
            // Hide skeleton, show real grid
            if (orgSkeleton) orgSkeleton.style.display = "none";
            if (orgGridElement) orgGridElement.style.display = "";
        })
        .catch(err => {
            console.error("Error loading projects:", err);
            // Hide skeleton on error too, show an empty state
            if (orgSkeleton) orgSkeleton.style.display = "none";
            if (orgGridElement) {
                orgGridElement.style.display = "";
                orgGridElement.innerHTML = '<p style="color:var(--text-muted);padding:2rem 0;">Could not load projects. Please refresh.</p>';
            }
        });

    function renderOrganizationGrid(data) {
        if (!orgGridElement) return;
        orgGridElement.innerHTML = "";

        data.forEach(org => {
            const card = document.createElement("div");
            card.classList.add("org-card");
            if (org.id === "personal") card.classList.add("personal-card");
            card.setAttribute("onclick", `navigateToDedicatedPage('${org.id}')`);

            const logoSrc = org.id === "personal" ? "assets/My-logo.png" : `assets/logos/${org.id}.png`;
            const logoBoxClass = org.id === "personal" ? "glass-ui-logo-box personal-logo-box" : "glass-ui-logo-box";

            card.innerHTML = `
                <div class="org-card-header">
                    <div class="${logoBoxClass}">
                        <img src="${logoSrc}" alt="${org.organizationName} Logo" onerror="this.src='assets/logos/default-logo.png'">
                    </div>
                </div>
                <h3>${org.organizationName}</h3>
                <div class="org-role-tag">${org.skillsScope}</div>
                <p>${org.shortOverview}</p>
            `;
            orgGridElement.appendChild(card);
        });
    }

    // =========================================================================
    // 9. DEDICATED WORK PAGE — with browser history support
    // =========================================================================
    const mainPage = document.getElementById("main-portfolio-page");
    const dedicatedPage = document.getElementById("dedicated-work-page");
    const sectionsContainer = document.getElementById("project-sections-container");

    window.navigateToDedicatedPage = function(orgID) {
        const matchingOrg = orgDataStore.find(item => item.id === orgID);
        if (!matchingOrg || !dedicatedPage || !mainPage) return;

        document.getElementById("project-page-title").innerText = matchingOrg.organizationName;
        document.getElementById("project-page-desc").innerText = matchingOrg.shortOverview;
        document.getElementById("project-page-type").innerText = matchingOrg.skillsScope;

        sectionsContainer.innerHTML = "";

        matchingOrg.sections.forEach(sec => {
            const clientBlock = document.createElement("div");
            clientBlock.classList.add("client-showcase-block");

            let gridItemsHTML = "";
            sec.assets.forEach(asset => {
                let mediaEmbed = "";
                if (asset.type === "youtube") {
                    mediaEmbed = `<iframe src="https://www.youtube.com/embed/${asset.srcID}" allowfullscreen></iframe>`;
                } else {
                    mediaEmbed = `<img src="${asset.srcID}" alt="${asset.title}" onerror="this.parentNode.innerHTML='<div style=\\'padding:4rem;text-align:center;font-size:2rem;\\'>🎨</div>'">`;
                }

                gridItemsHTML += `
                    <div class="vault-item-node">
                        <div class="vault-media-box">${mediaEmbed}</div>
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
        dedicatedPage.classList.remove("sliding-out");
        dedicatedPage.classList.add("sliding-in");
        window.scrollTo({ top: 0, behavior: "instant" });

        history.pushState({ page: 'dedicated', orgID: orgID, section: currentSection }, '', `#work/${orgID}`);
    };

    function _exitDedicatedPageSilent() {
        if (!dedicatedPage || !mainPage) return;
        if (dedicatedPage.classList.contains("display-none")) return;
        dedicatedPage.classList.add("display-none");
        dedicatedPage.classList.remove("sliding-in");
        mainPage.classList.remove("display-none");
    }

    window.exitDedicatedPage = function() {
        if (!dedicatedPage || !mainPage) return;

        dedicatedPage.classList.remove("sliding-in");
        dedicatedPage.classList.add("sliding-out");

        setTimeout(() => {
            dedicatedPage.classList.add("display-none");
            dedicatedPage.classList.remove("sliding-out");
            mainPage.classList.remove("display-none");
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 350);

        history.back();
    };

    // =========================================================================
    // 10. BROWSER BACK / FORWARD BUTTON HANDLER
    // =========================================================================
    window.addEventListener('popstate', (event) => {
        const state = event.state;

        if (!state) {
            _exitDedicatedPageSilent();
            _showSectionOnly('work');
            return;
        }

        if (state.page === 'dedicated') {
            const matchingOrg = orgDataStore.find(item => item.id === state.orgID);
            if (matchingOrg) {
                document.getElementById("project-page-title").innerText = matchingOrg.organizationName;
                document.getElementById("project-page-desc").innerText = matchingOrg.shortOverview;
                document.getElementById("project-page-type").innerText = matchingOrg.skillsScope;
                mainPage.classList.add("display-none");
                dedicatedPage.classList.remove("display-none");
                dedicatedPage.classList.remove("sliding-out");
                dedicatedPage.classList.add("sliding-in");
                window.scrollTo({ top: 0, behavior: "instant" });
            }
        } else if (state.page === 'main') {
            _exitDedicatedPageSilent();
            _showSectionOnly(state.section || 'work');
        }
    });

    function _showSectionOnly(sectionID) {
        document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
        const targetedPanel = document.getElementById(`section-${sectionID}`);
        if (targetedPanel) {
            requestAnimationFrame(() => targetedPanel.classList.add('active'));
        }
        document.querySelectorAll('.nav-route').forEach(route => route.classList.remove('active'));
        const activeRouteButton = document.getElementById(`nav-${sectionID}`);
        if (activeRouteButton) activeRouteButton.classList.add('active');
        window.scrollTo({ top: 0, behavior: "smooth" });
        currentSection = sectionID;
    }

    history.replaceState({ page: 'main', section: 'work' }, '', '#work');

    // =========================================================================
    // 11. CREDENTIAL VIEWER MODAL
    // =========================================================================
    const credModal = document.getElementById("credential-viewer-modal");
    const credImg = document.getElementById("document-modal-img");
    const credTitle = document.getElementById("document-modal-title");

    window.openCredentialModal = function(imagePath, titleText) {
        if (!credModal || !credImg || !credTitle) return;
        credImg.src = imagePath;
        credTitle.innerText = titleText;
        credModal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    window.closeCredentialModal = function() {
        if (!credModal) return;
        credModal.classList.remove("active");
        const detModal = document.getElementById("experience-details-modal");
        if (!detModal.classList.contains("active")) {
            document.body.style.overflow = "";
        }
        setTimeout(() => { if (credImg) credImg.src = ""; }, 350);
    };

    // =========================================================================
    // 12. CONTACT FORM — async submit with success / error feedback
    // =========================================================================
    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("form-submit-btn");
    const successMsg = document.getElementById("form-success-msg");
    const errorMsg = document.getElementById("form-error-msg");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Hide any previous messages
            successMsg.style.display = "none";
            errorMsg.style.display = "none";

            // Disable button while sending
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending…";

            try {
                const formData = new FormData(contactForm);
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                const result = await response.json();

                if (result.success) {
                    successMsg.style.display = "block";
                    contactForm.reset();
                } else {
                    errorMsg.style.display = "block";
                }
            } catch (err) {
                errorMsg.style.display = "block";
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
            }
        });
    }

});


