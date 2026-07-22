import { createHash } from 'node:crypto';
import { access, cp, mkdir, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const output = path.join(root, 'dist');
const productionEntries = [
    'index.html', '404.html', 'faq-variantes.html', 'robots.txt', 'sitemap.xml',
    '_headers', '_redirects', 'assets', 'favicon', 'retrucocharacter', 'truco'
];
const hashedRoots = [
    'assets/css',
    'assets/js',
    'assets/imagenes/optimized',
    'assets/fuentes'
];
const textExtensions = new Set(['.html', '.css', '.js', '.json', '.xml', '.webmanifest', '.txt']);

const toPosix = value => value.split(path.sep).join('/');

async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const absolute = path.join(directory, entry.name);
        if (entry.isDirectory()) files.push(...await walk(absolute));
        else files.push(absolute);
    }
    return files;
}

async function copyProductionFiles() {
    await rm(output, { recursive: true, force: true });
    await mkdir(output, { recursive: true });
    for (const entry of productionEntries) {
        const source = path.join(root, entry);
        const destination = path.join(output, entry);
        const info = await stat(source);
        if (info.isDirectory()) await cp(source, destination, { recursive: true });
        else await cp(source, destination);
    }
}

async function hashAssets() {
    const manifest = {};
    for (const relativeRoot of hashedRoots) {
        const directory = path.join(output, relativeRoot);
        const files = await walk(directory);
        for (const absolute of files) {
            if (/OFL-.*\.txt$/i.test(absolute)) continue;
            const contents = await readFile(absolute);
            const hash = createHash('sha256').update(contents).digest('hex').slice(0, 10);
            const extension = path.extname(absolute);
            const renamed = `${absolute.slice(0, -extension.length)}.${hash}${extension}`;
            const oldRelative = toPosix(path.relative(output, absolute));
            const newRelative = toPosix(path.relative(output, renamed));
            await rename(absolute, renamed);
            manifest[oldRelative] = newRelative;
        }
    }
    return manifest;
}

async function rewriteReferences(manifest) {
    const files = await walk(output);
    for (const absolute of files) {
        const extension = path.extname(absolute).toLowerCase();
        const basename = path.basename(absolute);
        if (!textExtensions.has(extension) && !['_headers', '_redirects'].includes(basename)) continue;
        let contents = await readFile(absolute, 'utf8');
        let changed = false;
        for (const [original, versioned] of Object.entries(manifest)) {
            if (!contents.includes(original)) continue;
            contents = contents.split(original).join(versioned);
            changed = true;
        }
        if (changed) await writeFile(absolute, contents, 'utf8');
    }
}

async function assertNoStaleReferences(manifest) {
    const files = await walk(output);
    const textFiles = files.filter(file => textExtensions.has(path.extname(file).toLowerCase()));
    const stale = [];
    for (const absolute of textFiles) {
        const contents = await readFile(absolute, 'utf8');
        for (const original of Object.keys(manifest)) {
            if (contents.includes(original)) stale.push(`${toPosix(path.relative(output, absolute))}: ${original}`);
        }
    }
    if (stale.length) throw new Error(`Unversioned build references remain:\n${stale.join('\n')}`);
}

function localTarget(reference, sourceFile) {
    const clean = reference.trim().split(/[?#]/, 1)[0];
    if (!clean || clean.includes('${') || /^(?:[a-z]+:|\/\/|#)/i.test(clean)) return null;
    const decoded = decodeURIComponent(clean);
    return decoded.startsWith('/')
        ? path.join(output, decoded.slice(1))
        : path.resolve(path.dirname(sourceFile), decoded);
}

async function assertLocalReferencesExist() {
    const missing = [];
    for (const absolute of await walk(output)) {
        const extension = path.extname(absolute).toLowerCase();
        if (!['.html', '.css'].includes(extension)) continue;
        const contents = await readFile(absolute, 'utf8');
        const references = [];
        if (extension === '.html') {
            for (const match of contents.matchAll(/\b(?:src|href|poster|data-fallback)=["']([^"']+)["']/gi)) {
                references.push(match[1]);
            }
            for (const match of contents.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
                references.push(...match[1].split(',').map(candidate => candidate.trim().split(/\s+/)[0]));
            }
        } else {
            for (const match of contents.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) references.push(match[1]);
        }
        for (const reference of references) {
            const target = localTarget(reference, absolute);
            if (!target || !target.startsWith(output)) continue;
            try {
                await access(target);
            } catch {
                missing.push(`${toPosix(path.relative(output, absolute))}: ${reference}`);
            }
        }
    }
    if (missing.length) throw new Error(`Missing local build references:\n${missing.join('\n')}`);
}

await copyProductionFiles();
const manifest = await hashAssets();
await rewriteReferences(manifest);
await assertNoStaleReferences(manifest);
await assertLocalReferencesExist();
await writeFile(path.join(output, 'asset-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(`Built ${productionEntries.length} entries with ${Object.keys(manifest).length} versioned assets.`);
