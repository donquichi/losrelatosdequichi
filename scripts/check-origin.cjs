// Run inside the Ghost container, or set ORIGIN to an accessible Ghost origin.
// Checks published pages and image variants without credentials or database access.
const origin = process.env.ORIGIN || 'http://127.0.0.1:2368';
const site = 'https://losrelatosdequichi.com';
const headers = {Host: new URL(site).host, 'X-Forwarded-Proto': 'https'};

async function request(path) {
    const response = await fetch(origin + path, {headers, redirect: 'manual'});
    if (response.status !== 200) {
        throw new Error(`${path} returned ${response.status}`);
    }
    return response;
}

async function main() {
    const paths = new Set(['/','/page/2/']);
    for (const sitemap of ['posts', 'pages', 'tags', 'authors']) {
        const xml = await (await request(`/sitemap-${sitemap}.xml`)).text();
        for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
            paths.add(new URL(match[1]).pathname);
        }
    }

    const representative = new Set([
        '/',
        '/el-proyecto-de-las-sombras-el-experimento-que-cambiaba-lo-que-las-personas-veian/',
        '/scp-1867-el-caracol-que-aseguraba-haber-explorado-el-mundo/',
        '/tag/scp-foundation/',
        '/sobre-mi/'
    ]);
    const imagePaths = new Set();
    for (const path of paths) {
        const started = performance.now();
        const html = await (await request(path)).text();
        if (!representative.has(path)) continue;
        const summary = {
            path,
            bytes: Buffer.byteLength(html),
            ms: Math.round(performance.now() - started),
            images: (html.match(/<img\b/g) || []).length,
            lazyImages: (html.match(/loading="lazy"/g) || []).length,
            relatedCards: (html.match(/class="quichi-related-card"/g) || []).length,
            recommendations: (html.match(/class="quichi-post-popular-item/g) || []).length
        };
        if (summary.relatedCards > 4 || summary.recommendations > 5) {
            throw new Error(`Too many recommendation cards: ${path}`);
        }
        const preloads = (html.match(/<link\b[^>]*rel="preload"[^>]*>/g) || []).join('\n');
        if (path === '/' && preloads.includes('ChatGPT-Image-May-15--2026--10_53_45-AM--1--1.png')) {
            throw new Error('Unused homepage cover image still referenced');
        }
        console.log(JSON.stringify(summary));
        for (const match of html.matchAll(/(?:src|href)="([^\"]*\/format\/webp\/[^\"]*)"/g)) {
            imagePaths.add(new URL(match[1], site).pathname);
        }
    }
    for (const path of imagePaths) {
        const response = await request(path);
        if (!response.headers.get('content-type')?.includes('image/webp')) {
            throw new Error(`Wrong image format: ${path}`);
        }
        await response.arrayBuffer();
    }
    const css = await (await request('/assets/built/screen.css')).text();
    const artwork = new Set([...css.matchAll(/\.\.\/png\/(\d+)\.webp/g)].map(m => `/assets/png/${m[1]}.webp`));
    for (const path of artwork) await request(path);
    console.log(JSON.stringify({pagesChecked: paths.size, webpImagesChecked: imagePaths.size, categoryImagesChecked: artwork.size, result: 'passed'}));
}

main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
