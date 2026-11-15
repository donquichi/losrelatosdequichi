(function () {
    pagination(true);
})();

(function () {
    const slides = Array.from(document.querySelectorAll('.quichi-slide'));
    if (slides.length < 2) return;
    const stage = slides[0].parentNode;
    let current = 0, timer, startX, startY;
    const dots = document.createElement('div');
    dots.className = 'quichi-roulette-dots';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    function show(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => { slide.classList.toggle('is-active', i === current); slide.setAttribute('aria-hidden', String(i !== current)); });
        dots.querySelectorAll('.quichi-dot').forEach((dot, i) => { dot.classList.toggle('is-active', i === current); if (i === current) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current'); });
    }
    function restart() { window.clearInterval(timer); if (!reduced.matches) timer = window.setInterval(() => show(current + 1), 5500); }
    function move(index) { show(index); restart(); }
    slides.forEach((slide, i) => { const dot = document.createElement('button'); dot.className = 'quichi-dot'; dot.type = 'button'; dot.setAttribute('aria-label', 'Ver episodio destacado ' + (i + 1)); dot.addEventListener('click', () => move(i)); dots.appendChild(dot); });
    stage.appendChild(dots);
    for (const [direction, label, symbol] of [[-1, 'Episodio anterior', '‹'], [1, 'Episodio siguiente', '›']]) {
        const button = document.createElement('button'); button.type = 'button'; button.className = 'quichi-carousel-arrow ' + (direction < 0 ? 'is-previous' : 'is-next'); button.setAttribute('aria-label', label); button.textContent = symbol; button.addEventListener('click', () => move(current + direction)); stage.appendChild(button);
    }
    stage.addEventListener('touchstart', event => { if (event.touches.length !== 1) return; startX = event.touches[0].clientX; startY = event.touches[0].clientY; }, {passive:true});
    stage.addEventListener('touchend', event => { if (startX === undefined || !event.changedTouches.length) return; const dx = event.changedTouches[0].clientX - startX, dy = event.changedTouches[0].clientY - startY; startX = undefined; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) move(current + (dx < 0 ? 1 : -1)); }, {passive:true});
    stage.addEventListener('touchcancel', () => { startX = undefined; }, {passive:true});
    stage.addEventListener('keydown', event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(current + (event.key === 'ArrowLeft' ? -1 : 1)); } });
    show(0); restart();
})();

(function () {
    const excerpts = Array.from(document.querySelectorAll(".quichi-home-excerpt"));
    const storyStartMarkers = [
        " En las madrugadas",
        " En la madrugada",
        " Durante las madrugadas"
    ];

    excerpts.forEach(function (excerpt) {
        const text = excerpt.textContent.replace(/\s+/g, " ").trim();
        const marker = storyStartMarkers.find(function (item) {
            return text.includes(item);
        });

        if (marker) {
            excerpt.textContent = text.slice(0, text.indexOf(marker)).trim();
        }
    });
})();

(function () {
    const section = document.querySelector(".quichi-platform-section");

    if (!section) {
        return;
    }

    const player = section.querySelector("[data-platform-player]");
    const tabs = Array.from(section.querySelectorAll("[data-platform-tab]"));
    const content = document.querySelector(".quichi-post-content");
    const platformOrder = ["youtube", "instagram", "tiktok", "facebook"];
    const platforms = {
        youtube: null,
        facebook: null,
        instagram: null,
        tiktok: null
    };

    const isUsableUrl = function (url) {
        return Boolean(url && !url.includes("{{$json") && /^https?:\/\//i.test(url));
    };

    const setPlatform = function (platform, url, sourceType) {
        if (!platforms[platform] && isUsableUrl(url)) {
            platforms[platform] = {
                url: url,
                sourceType: sourceType || "link"
            };
        }
    };

    const detectPlatform = function (url) {
        if (/youtube\.com|youtu\.be|youtube-nocookie\.com/i.test(url)) {
            return "youtube";
        }

        if (/facebook\.com|fb\.watch/i.test(url)) {
            return "facebook";
        }

        if (/instagram\.com/i.test(url)) {
            return "instagram";
        }

        if (/tiktok\.com/i.test(url)) {
            return "tiktok";
        }

        return "";
    };

    const readAutomationData = function () {
        if (!content) {
            return;
        }

        content.querySelectorAll(".quichi-platform-data a[data-platform]").forEach(function (link) {
            const platform = link.dataset.platform;
            const url = link.getAttribute("href");

            if (platformOrder.includes(platform)) {
                setPlatform(platform, url, "automation");
            }
        });
    };

    const readFallbackContent = function () {
        if (!content) {
            return;
        }

        content.querySelectorAll("iframe[src]").forEach(function (iframe) {
            const url = iframe.getAttribute("src");
            const platform = detectPlatform(url);

            if (platform) {
                setPlatform(platform, url, "iframe");
            }
        });

        content.querySelectorAll("a[href]").forEach(function (link) {
            if (link.closest(".quichi-platform-data")) {
                return;
            }

            const url = link.getAttribute("href");
            const platform = detectPlatform(url);

            if (platform) {
                setPlatform(platform, url, "link");
            }
        });
    };

    const youtubeEmbedUrl = function (url) {
        let videoId = "";

        try {
            const parsed = new URL(url);

            if (parsed.hostname.includes("youtu.be")) {
                videoId = parsed.pathname.split("/").filter(Boolean)[0] || "";
            } else if (parsed.searchParams.has("v")) {
                videoId = parsed.searchParams.get("v");
            } else if (parsed.pathname.includes("/embed/")) {
                videoId = parsed.pathname.split("/embed/")[1].split("/")[0];
            } else if (parsed.pathname.includes("/shorts/")) {
                videoId = parsed.pathname.split("/shorts/")[1].split("/")[0];
            }
        } catch (error) {
            return url;
        }

        return videoId ? "https://www.youtube.com/embed/" + videoId : url;
    };

    const instagramEmbedUrl = function (url) {
        try {
            const parsed = new URL(url);
            const parts = parsed.pathname.split("/").filter(Boolean);
            const type = parts[0];
            const shortcode = parts[1];

            if ((type === "p" || type === "reel" || type === "tv") && shortcode) {
                return "https://www.instagram.com/" + type + "/" + shortcode + "/embed";
            }
        } catch (error) {
            return url;
        }

        return url;
    };

    const tiktokEmbedUrl = function (url) {
        try {
            const parsed = new URL(url);
            const match = parsed.pathname.match(/\/video\/(\d+)/);

            if (match && match[1]) {
                return "https://www.tiktok.com/embed/v2/" + match[1];
            }
        } catch (error) {
            return url;
        }

        return url;
    };

    const iframe = function (src, title) {
        return '<iframe src="' + src + '" title="' + title + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    };

    const placeholder = function () {
        return '<div class="quichi-platform-placeholder">Este episodio todavia no esta disponible en esta plataforma.</div>';
    };

    const renderPlatform = function (platform) {
        const data = platforms[platform];

        if (!data) {
            return placeholder();
        }

        if (data.sourceType === "iframe") {
            return iframe(data.url, platform + " embed");
        }

        if (platform === "youtube") {
            return iframe(youtubeEmbedUrl(data.url), "YouTube video player");
        }

        if (platform === "instagram") {
            return iframe(instagramEmbedUrl(data.url), "Instagram embed");
        }

        if (platform === "tiktok") {
            return iframe(tiktokEmbedUrl(data.url), "TikTok video player");
        }

        return placeholder();
    };

    const setActiveTab = function (platform) {
        tabs.forEach(function (tab) {
            const active = tab.dataset.platformTab === platform;
            tab.classList.toggle("is-active", active);
            tab.setAttribute("aria-selected", active ? "true" : "false");
        });
    };

    const showPlatform = function (platform) {
        if (platform === "facebook") {
            return;
        }

        setActiveTab(platform);
        platformOrder.forEach(function (name) {
            player.classList.toggle("is-" + name, name === platform);
        });
        player.innerHTML = renderPlatform(platform);
    };

    const updateTabs = function () {
        tabs.forEach(function (tab) {
            const platform = tab.dataset.platformTab;
            const hasUrl = Boolean(platforms[platform]);

            tab.hidden = !hasUrl;
            tab.disabled = !hasUrl;
            tab.classList.toggle("is-hidden", !hasUrl);
            tab.setAttribute("aria-disabled", hasUrl ? "false" : "true");

            if (platform === "facebook" && hasUrl) {
                tab.dataset.externalUrl = platforms.facebook.url;
                tab.setAttribute("aria-label", "Abrir Facebook en una nueva pestaña");
            }
        });
    };

    const firstAvailablePlatform = function () {
        return platformOrder.find(function (platform) {
            return Boolean(platforms[platform]);
        }) || "";
    };

    readAutomationData();
    readFallbackContent();
    updateTabs();

    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            if (tab.dataset.platformTab === "facebook" && !tab.disabled) {
                window.open(platforms.facebook.url, "_blank", "noopener,noreferrer");
                return;
            }

            if (!tab.disabled) {
                showPlatform(tab.dataset.platformTab);
            }
        });
    });

    const initialPlatform = platforms.youtube ? "youtube" : firstAvailablePlatform();

    if (initialPlatform) {
        showPlatform(initialPlatform);
    } else {
        player.innerHTML = placeholder();
    }
})();

(function () {
    const audioPanel = document.querySelector(".quichi-audio-panel");

    if (!audioPanel) {
        return;
    }

    const player = audioPanel.querySelector("[data-quichi-audio-player]");
    const content = document.querySelector(".quichi-post-content");

    if (!player) {
        return;
    }

    const isUsableAudioUrl = function (url) {
        return Boolean(url && !url.includes("{{$json") && /^https?:\/\//i.test(url));
    };

    const isAudioUrl = function (url) {
        return /\.(mp3|m4a|wav|ogg|aac)(\?.*)?$/i.test(url || "");
    };

    const isSpreakerUrl = function (url) {
        return /spreaker\.com\/episode\//i.test(url || "");
    };

    const spreakerEpisodeId = function (url) {
        const match = (url || "").match(/--(\d+)(?:[/?#]|$)/);
        return match ? match[1] : "";
    };

    const loadSpreakerWidget = function () {
        if (document.querySelector('script[src="https://widget.spreaker.com/widgets.js"]')) {
            return;
        }

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://widget.spreaker.com/widgets.js";
        document.body.appendChild(script);
    };

    const renderSpreakerPlayer = function (sourceNode, url) {
        const link = document.createElement("a");
        const episodeId = sourceNode ? sourceNode.getAttribute("data-resource") : "";

        link.className = "spreaker-player";
        link.href = url;
        link.textContent = sourceNode && sourceNode.textContent.trim() ? sourceNode.textContent.trim() : "Escuchar en Spreaker.";
        link.setAttribute("data-resource", episodeId || "episode_id=" + spreakerEpisodeId(url));
        link.setAttribute("data-width", sourceNode ? sourceNode.getAttribute("data-width") || "100%" : "100%");
        link.setAttribute("data-height", sourceNode ? sourceNode.getAttribute("data-height") || "200px" : "200px");
        link.setAttribute("data-theme", sourceNode ? sourceNode.getAttribute("data-theme") || "light" : "light");
        link.setAttribute("data-playlist", sourceNode ? sourceNode.getAttribute("data-playlist") || "false" : "false");
        link.setAttribute("data-playlist-continuous", sourceNode ? sourceNode.getAttribute("data-playlist-continuous") || "false" : "false");
        link.setAttribute("data-chapters-image", sourceNode ? sourceNode.getAttribute("data-chapters-image") || "true" : "true");
        link.setAttribute("data-episode-image-position", sourceNode ? sourceNode.getAttribute("data-episode-image-position") || "right" : "right");
        link.setAttribute("data-hide-logo", sourceNode ? sourceNode.getAttribute("data-hide-logo") || "false" : "false");
        link.setAttribute("data-hide-likes", sourceNode ? sourceNode.getAttribute("data-hide-likes") || "false" : "false");
        link.setAttribute("data-hide-comments", sourceNode ? sourceNode.getAttribute("data-hide-comments") || "false" : "false");
        link.setAttribute("data-hide-sharing", sourceNode ? sourceNode.getAttribute("data-hide-sharing") || "false" : "false");
        link.setAttribute("data-hide-download", sourceNode ? sourceNode.getAttribute("data-hide-download") || "true" : "true");

        if (sourceNode && sourceNode.getAttribute("data-title")) {
            link.setAttribute("data-title", sourceNode.getAttribute("data-title"));
        }

        player.innerHTML = "";
        player.appendChild(link);
        loadSpreakerWidget();
    };

    const readAudioData = function () {
        if (!content) {
            return "";
        }

        const automationAudio = content.querySelector(".quichi-audio-data a[href], .quichi-audio-data audio[src], .quichi-audio-data source[src]");
        const automationUrl = automationAudio ? automationAudio.getAttribute("href") || automationAudio.getAttribute("src") : "";

        if (isUsableAudioUrl(automationUrl)) {
            return {
                node: automationAudio,
                url: automationUrl
            };
        }

        const audioElement = content.querySelector("audio[src], audio source[src]");
        const audioElementUrl = audioElement ? audioElement.getAttribute("src") : "";

        if (isUsableAudioUrl(audioElementUrl)) {
            return {
                node: audioElement,
                url: audioElementUrl
            };
        }

        const audioLink = Array.from(content.querySelectorAll("a[href]")).find(function (link) {
            if (link.closest(".quichi-platform-data")) {
                return false;
            }

            return isAudioUrl(link.getAttribute("href"));
        });

        return audioLink ? {
            node: audioLink,
            url: audioLink.getAttribute("href")
        } : null;
    };

    const audioData = readAudioData();
    const audioUrl = audioData ? audioData.url : "";

    if (!isUsableAudioUrl(audioUrl)) {
        player.classList.add("quichi-platform-placeholder");
        player.textContent = "Este episodio todavia no tiene narracion disponible.";
        return;
    }

    if (isSpreakerUrl(audioUrl)) {
        renderSpreakerPlayer(audioData.node, audioUrl);
        return;
    }

    player.innerHTML = [
        '<audio class="quichi-audio-control" controls preload="metadata">',
        '<source src="' + audioUrl + '">',
        'Tu navegador no puede reproducir este audio.',
        '</audio>'
    ].join("");
})();

(function () {
    const heroExcerpt = document.querySelector(".quichi-hero-excerpt");

    if (!heroExcerpt) {
        return;
    }

    const text = heroExcerpt.textContent.replace(/\s+/g, " ").trim();
    const storyStartMarkers = [
        " En las madrugadas",
        " En la madrugada",
        " Durante las madrugadas"
    ];
    const marker = storyStartMarkers.find(function (item) {
        return text.includes(item);
    });
    const cleanHeroText = marker ? text.slice(0, text.indexOf(marker)).trim() : text;
    const metadataLabels = {
        archivo: "Archivo",
        clasificacion: "Clasificacion",
        alias: "Alias",
        nombre: "Nombre",
        origen: "Origen",
        duracion: "Duracion"
    };
    const labelPattern = /(Archivo|Clasificaci[oó]n|Alias|Nombre|Origen|Duraci[oó]n)\s*:/gi;
    const labelMatches = Array.from(cleanHeroText.matchAll(labelPattern));
    const metadata = {};
    const normalizeKey = function (label) {
        return label
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace("clasificacion", "clasificacion")
            .replace("duracion", "duracion");
    };
    const cleanValue = function (value) {
        return value.replace(/^[\s\-–—:]+/, "").replace(/[\s\-–—]+$/, "").trim();
    };
    const firstLabelIndex = labelMatches.length ? labelMatches[0].index : -1;

    if (firstLabelIndex > 0) {
        const prefixText = cleanHeroText.slice(0, firstLabelIndex).trim();
        const archiveIndex = prefixText.toLowerCase().indexOf("archivo");

        if (archiveIndex >= 0) {
            metadata.archivo = cleanValue(prefixText.slice(archiveIndex));
        }
    }

    labelMatches.forEach(function (match, index) {
        const key = normalizeKey(match[1]);
        const start = match.index + match[0].length;
        const end = labelMatches[index + 1] ? labelMatches[index + 1].index : cleanHeroText.length;
        const value = cleanValue(cleanHeroText.slice(start, end));

        if (value) {
            metadata[key] = value;
        }
    });

    heroExcerpt.textContent = cleanHeroText;

    Object.keys(metadataLabels).forEach(function (key) {
        const row = document.querySelector('[data-quichi-meta-row="' + key + '"]');
        const valueNodes = document.querySelectorAll('[data-quichi-meta-value="' + key + '"]');

        if (metadata[key]) {
            valueNodes.forEach(function (valueNode) {
                valueNode.textContent = metadata[key];
            });
        } else if (row && key !== "duracion") {
            row.classList.add("is-hidden");
        }
    });

    const heroLabel = document.querySelector("[data-quichi-hero-meta-label]");
    const heroValue = document.querySelector("[data-quichi-hero-meta-value]");
    const heroRow = document.querySelector(".quichi-post-classification");
    const heroPriority = ["clasificacion", "origen", "archivo", "alias"];
    const heroKey = heroPriority.find(function (key) {
        return Boolean(metadata[key]);
    });

    if (heroKey && heroLabel && heroValue) {
        heroLabel.textContent = metadataLabels[heroKey];
        heroValue.textContent = metadata[heroKey];
    } else if (heroRow) {
        heroRow.classList.add("is-hidden");
    }
})();
