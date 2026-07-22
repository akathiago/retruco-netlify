import { execFileSync } from 'node:child_process';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const errors = [];

async function exists(relative) {
    try {
        await access(path.join(root, relative));
        return true;
    } catch {
        return false;
    }
}

async function checkHtml(relative) {
    const html = await readFile(path.join(root, relative), 'utf8');
    const references = [];
    for (const match of html.matchAll(/\b(?:src|href|data-fallback)=["']([^"']+)["']/g)) references.push(match[1]);
    for (const match of html.matchAll(/\bsrcset=["']([^"']+)["']/g)) {
        references.push(...match[1].split(',').map(item => item.trim().split(/\s+/)[0]));
    }
    for (const raw of references) {
        const clean = decodeURIComponent(raw.split(/[?#]/)[0]);
        if (!clean || clean.includes('${') || /^(?:https?:|data:|mailto:|tel:|javascript:|#)/.test(clean)) continue;
        const target = clean.startsWith('/') ? clean.slice(1) : path.join(path.dirname(relative), clean);
        if (!await exists(target)) errors.push(`${relative}: missing ${raw}`);
    }
}

execFileSync(process.execPath, ['--check', path.join(root, 'assets/js/site.js')], { stdio: 'inherit' });
for (const html of ['index.html', '404.html', 'faq-variantes.html', 'retrucocharacter/indexcharacter.html', 'truco/index.html']) {
    await checkHtml(html);
}

const creator = await readFile(path.join(root, 'retrucocharacter/indexcharacter.html'), 'utf8');
if (/window\.addEventListener\(['"]load/.test(creator)) errors.push('Creator still contains a window.load dependency.');
if (/querySelectorAll\(['"]img:not\(\.cesar-eyes/.test(creator)) errors.push('Creator still waits for every document image.');

if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
} else {
    console.log('Validation passed.');
}
