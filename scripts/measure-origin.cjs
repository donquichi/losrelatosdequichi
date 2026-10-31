// HTTP baseline only: this does not measure browser LCP, INP, CLS, or media startup.
const origin = process.env.ORIGIN || 'http://127.0.0.1:2368';
const publicSite = 'https://losrelatosdequichi.com';
const headers = {Host:new URL(publicSite).host, 'X-Forwarded-Proto':'https'};
(async()=>{
    const report = {measuredAt:new Date().toISOString(),origin,kind:'HTTP response baseline; not Core Web Vitals',samples:[]};
    for(const path of ['/', '/episodios/', '/tag/scp-foundation/', '/sobre-mi/']) {
        for(let sample=1;sample<=3;sample++) {
            const start=performance.now();
            const r=await fetch(origin+path,{headers,redirect:'manual',signal:AbortSignal.timeout(15000)});
            const headersMs=Math.round(performance.now()-start);
            const body=await r.arrayBuffer();
            report.samples.push({path,sample,status:r.status,headersMs,totalMs:Math.round(performance.now()-start),bytes:body.byteLength});
        }
    }
    console.log(JSON.stringify(report,null,2));
    if(report.samples.some(s=>s.status!==200))process.exitCode=1;
})().catch(e=>{console.error(e.message);process.exitCode=1;});
