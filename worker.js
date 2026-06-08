// SMEČKA OG worker — náhľad karta pri zdieľaní report linku.
// Crawler (FB/WhatsApp/Messenger bot) prečíta OG meta → pekná karta.
// Bežný používateľ → presmerovanie na report (meta refresh + JS location.replace).
// Mirror U11 worker (cool-dust-9e62). Externý komponent — SMEČKA appka NEDOTKNUTÁ.
// ROLLBACK = v Cloudflare worker disable/delete (appka aj U11 worker nedotknuté).
//
// OG karta je STATICKÁ (logo + brand text, žiadne token-dáta) → bezpečné, crawler nevidí čísla.

export default {
  async fetch(request) {
    // Cieľ presmerovania = produkčný SMEČKA report (/exec). Ak by report vyžadoval token,
    // pridaj ho sem (?token=…) — ale POZOR, vtedy by token bol vo worker kóde (zváž radšej verejný report).
    const REPORT_URL = "https://script.google.com/macros/s/AKfycbxYLRcslCg1c35B1qitXYblGJup4WaoIZg9ZaC2VCRR-BeO80DdoQSpoCYBNIYp1ARPHA/exec";
    const OG_IMAGE   = "https://ferdo3.github.io/smecka-launcher/og-smecka.png";
    const WORKER_URL = new URL(request.url).origin + "/";

    const html = `<!DOCTYPE html><html lang="sk"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SMEČKA · Financie &amp; dochádzka</title>
<meta property="og:type" content="website">
<meta property="og:site_name" content="SMEČKA">
<meta property="og:title" content="SMEČKA · Financie &amp; dochádzka tímu">
<meta property="og:description" content="Prehľad financií a dochádzky volejbalového tímu SMEČKA.">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:url" content="${WORKER_URL}">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="refresh" content="0;url=${REPORT_URL}">
<style>body{font-family:-apple-system,Inter,sans-serif;background:#16324f;color:#fff;text-align:center;padding-top:42vh;margin:0}</style>
</head><body>Otváram report…<script>location.replace(${JSON.stringify(REPORT_URL)})</script></body></html>`;

    return new Response(html, { headers: { "content-type": "text/html;charset=UTF-8" } });
  }
}
