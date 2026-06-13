

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
            role: "Graphic Designer, Motion Designer & Video Editor",
            timeline: "APR 2026 - ONGOING",
            achievements: [
                "Directing creative visual identity for high-profile promotional campaigns.",
                "Managing complex project timelines and technical pacing adjustments.",
                "Delivering creative designs and videos for multiple partner businesses, enhancing brand consistency for Miss Universe Nepal, Bennevis, Bruxelles and 361."
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
            letterAsset: { path: "assets/craftalaya_letter.jpg", label: "View Craftalaya Experience Letter" }
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

    /**
     * Builds the HTML for one "media block" — graphics, videos, or motion —
     * for a given section (company-level or client-level).
     * Graphics support an optional "group" field (e.g. "Digital Designs",
     * "Printing Materials") which renders as its own labeled sub-grid.
     */
    function buildMediaBlocksHTML(section) {
        let html = "";

        // ---- GRAPHICS (with optional grouping) ----
        if (section.graphics && section.graphics.length > 0) {
            const groups = {};
            const ungrouped = [];

            section.graphics.forEach(asset => {
                if (asset.group) {
                    if (!groups[asset.group]) groups[asset.group] = [];
                    groups[asset.group].push(asset);
                } else {
                    ungrouped.push(asset);
                }
            });

            if (ungrouped.length > 0) {
                html += `<div class="media-subsection scroll-reveal">
                    <h4 class="media-subsection-title">Graphics</h4>
                    <div class="graphics-grid-layout">
                        ${ungrouped.map(asset => buildGraphicTile(asset)).join("")}
                    </div>
                </div>`;
            }

            Object.keys(groups).forEach(groupName => {
                html += `<div class="media-subsection scroll-reveal">
                    <h4 class="media-subsection-title">${groupName}</h4>
                    <div class="graphics-grid-layout">
                        ${groups[groupName].map(asset => buildGraphicTile(asset)).join("")}
                    </div>
                </div>`;
            });
        }

        // ---- VIDEOS ----
        if (section.videos && section.videos.length > 0) {
            html += `<div class="media-subsection scroll-reveal">
                <h4 class="media-subsection-title">Videos</h4>
                <div class="works-grid-layout">
                    ${section.videos.map(asset => buildVideoTile(asset)).join("")}
                </div>
            </div>`;
        }

        // ---- MOTION ----
        if (section.motion && section.motion.length > 0) {
            html += `<div class="media-subsection scroll-reveal">
                <h4 class="media-subsection-title">Motion Graphics</h4>
                <div class="works-grid-layout">
                    ${section.motion.map(asset => buildVideoTile(asset)).join("")}
                </div>
            </div>`;
        }

        return html;
    }

    function buildGraphicTile(asset) {
        return `
            <div class="graphic-item-node">
                <div class="graphic-media-box" onclick="openImageLightbox('${asset.srcID}', '${asset.title.replace(/'/g, "\\'")}')">
                    <img src="${asset.srcID}" alt="${asset.title}" loading="lazy" draggable="false" oncontextmenu="return false" onerror="this.parentNode.innerHTML='<div class=\\'media-fallback\\'>🎨</div>'">
                </div>
                <div class="graphic-item-meta"><p>${asset.title}</p></div>
            </div>
        `;
    }

    /**
     * Called via onloadedmetadata on each <video>. Switches the parent
     * .vault-media-box from a fixed 16:9 box (landscape default) to a
     * taller portrait box for 9:16 reels, and uses object-fit: contain
     * for portrait clips so nothing gets cropped.
     */
    window.adjustVideoBox = function(videoEl) {
        const box = videoEl.parentElement;
        if (!box || !videoEl.videoWidth || !videoEl.videoHeight) return;
        const ratio = videoEl.videoWidth / videoEl.videoHeight;
        if (ratio < 1) {
            // Portrait or square video — use its real aspect ratio, contain (no cropping)
            box.style.paddingTop = `${(1 / ratio) * 100}%`;
            videoEl.style.objectFit = "contain";
            box.style.background = "#000";
        }
        // Landscape videos keep the default 16:9 cover box defined in CSS
    };

    function buildVideoTile(asset) {
        return `
            <div class="vault-item-node">
                <div class="vault-media-box">
                    <video data-src="${asset.srcID}" controls controlsList="nodownload noremoteplayback" disablePictureInPicture preload="none" playsinline oncontextmenu="return false" onloadedmetadata="adjustVideoBox(this)" onerror="this.parentNode.innerHTML='<div class=\\'media-fallback\\'>🎬</div>'"></video>
                </div>
                <div class="vault-item-meta"><h4>${asset.title}</h4></div>
            </div>
        `;
    }

    /**
     * Renders the full content (company section + client subsections)
     * into #project-sections-container for the given org.
     */
    function renderDedicatedPageContent(matchingOrg) {
        if (!sectionsContainer) return;
        sectionsContainer.innerHTML = "";

        // Company-level section
        if (matchingOrg.companySection) {
            const cs = matchingOrg.companySection;
            const block = document.createElement("div");
            block.classList.add("client-showcase-block", "company-showcase-block");
            block.innerHTML = `
                <div class="client-block-header">
                    <h3>${cs.name}</h3>
                    <p>${cs.workTypeTag}</p>
                </div>
                ${buildMediaBlocksHTML(cs)}
            `;
            sectionsContainer.appendChild(block);
        }

        // Client subsections
        if (matchingOrg.clients && matchingOrg.clients.length > 0) {
            matchingOrg.clients.forEach(client => {
                const block = document.createElement("div");
                block.classList.add("client-showcase-block");
                block.innerHTML = `
                    <div class="client-block-header">
                        <h3>${client.name}</h3>
                        <p>${client.workTypeTag}</p>
                    </div>
                    ${buildMediaBlocksHTML(client)}
                `;
                sectionsContainer.appendChild(block);
            });
        }

        setupLazyVideoLoading(sectionsContainer);
        setupScrollReveal(sectionsContainer);
        buildDedicatedMiniNav(matchingOrg, sectionsContainer);
    }

    /**
     * Populates the sticky mini-nav with jump links to each company/client
     * block on the dedicated page. Only shown when there's more than one
     * block (i.e. the org has clients) — otherwise it stays hidden.
     */
    function buildDedicatedMiniNav(matchingOrg, container) {
        const miniNav = document.getElementById("dedicated-mini-nav");
        if (!miniNav) return;
        miniNav.innerHTML = "";

        const blocks = container.querySelectorAll(".client-showcase-block");
        if (blocks.length <= 1) return; // no need for jump nav on single-section pages

        blocks.forEach((block, idx) => {
            const heading = block.querySelector(".client-block-header h3");
            if (!heading) return;
            const label = heading.textContent.trim();
            const anchorId = `dedicated-block-${idx}`;
            block.id = anchorId;

            const link = document.createElement("a");
            link.href = `#${anchorId}`;
            link.textContent = label;
            link.onclick = (e) => {
                e.preventDefault();
                document.getElementById(anchorId).scrollIntoView({ behavior: "smooth", block: "start" });
            };
            miniNav.appendChild(link);
        });
    }

    /**
     * Observes .scroll-reveal elements within the given container and
     * adds the "revealed" class (triggering a fade-up animation) once
     * each element scrolls into view.
     */
    function setupScrollReveal(container) {
        const elements = container.querySelectorAll(".scroll-reveal");
        if (!elements.length) return;

        if (!("IntersectionObserver" in window)) {
            elements.forEach(el => el.classList.add("revealed"));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

        elements.forEach(el => observer.observe(el));
    }

    /**
     * Observes all <video data-src="..."> elements within the given
     * container and assigns the real src (triggering load) only when
     * the video scrolls into view, saving bandwidth on initial load.
     */
    function setupLazyVideoLoading(container) {
        const videos = container.querySelectorAll("video[data-src]");
        if (!videos.length) return;

        if (!("IntersectionObserver" in window)) {
            // Fallback: just load everything immediately
            videos.forEach(v => { v.src = v.dataset.src; v.removeAttribute("data-src"); });
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    if (video.dataset.src) {
                        video.src = video.dataset.src;
                        video.removeAttribute("data-src");
                        video.preload = "metadata";
                    }
                    obs.unobserve(video);
                }
            });
        }, { rootMargin: "200px 0px" });

        videos.forEach(v => observer.observe(v));
    }

    window.navigateToDedicatedPage = function(orgID) {
        const matchingOrg = orgDataStore.find(item => item.id === orgID);
        if (!matchingOrg || !dedicatedPage || !mainPage) return;

        document.getElementById("project-page-title").innerText = matchingOrg.organizationName;
        document.getElementById("project-page-desc").innerText = matchingOrg.shortOverview;
        document.getElementById("project-page-type").innerText = matchingOrg.skillsScope;

        renderDedicatedPageContent(matchingOrg);

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
                renderDedicatedPageContent(matchingOrg);
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

    // ---- Image Lightbox (zoom-in preview for graphic tiles) ----
    const lightboxModal = document.getElementById("image-lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");

    window.openImageLightbox = function(imagePath, titleText) {
        if (!lightboxModal || !lightboxImg) return;
        lightboxImg.src = imagePath;
        lightboxImg.alt = titleText || "Full size graphic preview";
        lightboxModal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    window.closeImageLightbox = function() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove("active");
        document.body.style.overflow = "";
        setTimeout(() => { if (lightboxImg) lightboxImg.src = ""; }, 300);
    };

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightboxModal && lightboxModal.classList.contains("active")) {
            window.closeImageLightbox();
        }
    });

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

    // =========================================================================
    // EXPERIENCE TIMELINE — draw-in line + staggered node fade-in on scroll
    // =========================================================================
    (function initTimelineReveal() {
        const tracks = document.querySelectorAll(".experience-vertical-track");
        if (!tracks.length || !("IntersectionObserver" in window)) {
            tracks.forEach(track => {
                track.classList.add("line-revealed");
                track.querySelectorAll(".timeline-node").forEach(n => n.classList.add("node-revealed"));
            });
            return;
        }

        const trackObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const track = entry.target;
                    track.classList.add("line-revealed");
                    const nodes = track.querySelectorAll(".timeline-node");
                    nodes.forEach((node, i) => {
                        setTimeout(() => node.classList.add("node-revealed"), i * 120);
                    });
                    obs.unobserve(track);
                }
            });
        }, { threshold: 0.15 });

        tracks.forEach(track => trackObserver.observe(track));
    })();

    // =========================================================================
    // GLOBAL MEDIA PROTECTION — disable right-click save & dragging on
    // all images/videos site-wide (covers logos, hero/about photos, and
    // dynamically-rendered org cards / dedicated page media)
    // =========================================================================
    document.addEventListener("contextmenu", (e) => {
        if (e.target.tagName === "IMG" || e.target.tagName === "VIDEO") {
            e.preventDefault();
        }
    });
    document.addEventListener("dragstart", (e) => {
        if (e.target.tagName === "IMG" || e.target.tagName === "VIDEO") {
            e.preventDefault();
        }
    });

    // Block long-press "Download image" / context menu on Android Chrome,
    // which fires via a long touchstart rather than the contextmenu event.
    let touchHoldTimer = null;
    document.addEventListener("touchstart", (e) => {
        if (e.target.tagName === "IMG" || e.target.tagName === "VIDEO") {
            touchHoldTimer = setTimeout(() => {
                e.target.style.pointerEvents = "none";
                setTimeout(() => { e.target.style.pointerEvents = ""; }, 50);
            }, 450);
        }
    }, { passive: true });
    document.addEventListener("touchend", () => {
        if (touchHoldTimer) { clearTimeout(touchHoldTimer); touchHoldTimer = null; }
    }, { passive: true });
    document.addEventListener("touchmove", () => {
        if (touchHoldTimer) { clearTimeout(touchHoldTimer); touchHoldTimer = null; }
    }, { passive: true });

});