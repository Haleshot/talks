#!/usr/bin/env node

import { execSync } from 'child_process';
import { readdirSync, statSync, existsSync, mkdirSync, cpSync, writeFileSync, readFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const basePath = process.env.BASE_PATH || '/talks/';

// Pattern: name-name-MM-YYYY (at least 2 parts before month-year)
const talkFolderPattern = /^.+-\d{2}-\d{4}$/;

function getTalkFolders() {
  return readdirSync(rootDir)
    .filter(name => {
      const fullPath = join(rootDir, name);
      return statSync(fullPath).isDirectory() &&
             talkFolderPattern.test(name) &&
             existsSync(join(fullPath, 'package.json'));
    })
    .sort((a, b) => {
      // Sort by date (newest first) - extract MM-YYYY from end
      const dateA = a.match(/(\d{2})-(\d{4})$/);
      const dateB = b.match(/(\d{2})-(\d{4})$/);
      if (dateA && dateB) {
        const yearDiff = parseInt(dateB[2]) - parseInt(dateA[2]);
        if (yearDiff !== 0) return yearDiff;
        return parseInt(dateB[1]) - parseInt(dateA[1]);
      }
      return a.localeCompare(b);
    });
}

function parseTalkFolder(folderName) {
  // Pattern: event-name-stuff-MM-YYYY
  const match = folderName.match(/^(.+)-(\d{2})-(\d{4})$/);
  if (!match) return null;

  const [, namePart, month, year] = match;
  const parts = namePart.split('-');

  // Try to extract event and topic from folder name
  // Convention: event-topic-MM-YYYY (e.g., rust-delhi-cocoindex-01-2026)
  const event = parts.slice(0, 2).join(' ');
  const topic = parts.slice(2).join(' ') || event;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[parseInt(month) - 1] || month;

  return {
    folder: folderName,
    event: capitalizeWords(event),
    topic: capitalizeWords(topic),
    date: `${monthName} ${year}`,
    month: parseInt(month),
    year: parseInt(year)
  };
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
  return match ? match[1] : '';
}

function parseFrontmatter(content) {
  const frontmatter = extractFrontmatter(content);
  const meta = {};

  if (!frontmatter) return meta;

  const lines = frontmatter.split('\n');

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const keyMatch = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!keyMatch) continue;

    const [, key, rawValue] = keyMatch;
    const value = rawValue.trim();

    if (value === '|') {
      const block = [];
      i += 1;
      while (i < lines.length && (/^\s+/.test(lines[i]) || lines[i] === '')) {
        block.push(lines[i].replace(/^\s{2}/, ''));
        i += 1;
      }
      i -= 1;
      meta[key] = block.join('\n').trim();
      continue;
    }

    if (value === '') {
      const list = [];
      let j = i + 1;
      while (j < lines.length) {
        const listItem = lines[j].match(/^\s*-\s+(.*)$/);
        if (!listItem) break;
        list.push(stripQuotes(listItem[1].trim()));
        j += 1;
      }
      if (list.length > 0) {
        meta[key] = list;
        i = j - 1;
        continue;
      }
      meta[key] = '';
      continue;
    }

    meta[key] = parseScalarValue(value);
  }

  return meta;
}

function parseScalarValue(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;

  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map(item => stripQuotes(item.trim()))
      .filter(Boolean);
  }

  return stripQuotes(value);
}

function stripQuotes(value) {
  return value.replace(/^['"]|['"]$/g, '');
}

function getTalkTitle(folderPath) {
  const slidesPath = join(folderPath, 'slides.md');
  if (existsSync(slidesPath)) {
    const content = readFileSync(slidesPath, 'utf-8');
    const frontmatter = parseFrontmatter(content);
    if (frontmatter.title) {
      return frontmatter.title;
    }
    const headingMatch = content.match(/^#\s+(.+)$/m);
    if (headingMatch) {
      return headingMatch[1].trim();
    }
  }
  return null;
}

function getTalkMeta(folderPath) {
  const slidesPath = join(folderPath, 'slides.md');
  const meta = { draft: false, tags: [] };
  if (existsSync(slidesPath)) {
    const content = readFileSync(slidesPath, 'utf-8');
    const frontmatter = parseFrontmatter(content);
    const infoDescription = typeof frontmatter.info === 'string'
      ? frontmatter.info
          .split('\n')
          .map(line => line.replace(/^#+\s*/, '').trim())
          .find(Boolean)
      : '';

    meta.draft = Boolean(frontmatter.draft);
    meta.event = frontmatter.event || '';
    meta.date = frontmatter.date || '';
    meta.description = frontmatter.description || infoDescription || '';
    meta.tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    meta.slidesUrl = frontmatter.slidesUrl || '';
    meta.linkedinUrl = frontmatter.linkedinUrl || '';
    meta.blogUrl = frontmatter.blogUrl || '';
    // The deck's own brand colour (themeConfig.primary) is nested, so read it directly.
    const primaryMatch = content.match(/primary:\s*['"]?(#[0-9a-fA-F]{3,8})/);
    meta.primary = primaryMatch ? primaryMatch[1] : '';
  }
  return meta;
}

function isUpcoming(month, year) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  return year > currentYear || (year === currentYear && month > currentMonth);
}

function buildTalk(folder) {
  const folderPath = join(rootDir, folder);
  const talkBasePath = `${basePath}${folder}/`;
  const hasLockfile = existsSync(join(folderPath, 'package-lock.json'));

  console.log(`\n📦 Building: ${folder}`);
  console.log(`   Base path: ${talkBasePath}`);

  try {
    // Let playwright-chromium fetch its browser so we can export real cover slides.
    // Decks without playwright fall back to a branded placeholder cover.
    execSync(hasLockfile ? 'npm ci' : 'npm install', {
      cwd: folderPath,
      stdio: 'inherit',
      env: {
        ...process.env,
        npm_config_fund: 'false',
        npm_config_audit: 'false',
      },
    });

    // Build with correct base path
    execSync(`npx slidev build --base ${talkBasePath}`, {
      cwd: folderPath,
      stdio: 'inherit'
    });

    // Copy built files to main dist
    const talkDist = join(folderPath, 'dist');
    const targetDir = join(distDir, folder);

    if (existsSync(talkDist)) {
      mkdirSync(targetDir, { recursive: true });
      cpSync(talkDist, targetDir, { recursive: true });
      console.log(`   ✅ Built successfully`);
      exportCover(folder, folderPath);
      return true;
    } else {
      console.log(`   ⚠️  No dist folder found`);
      return false;
    }
  } catch (error) {
    console.error(`   ❌ Build failed: ${error.message}`);
    return false;
  }
}

// Render the deck's cover slide to an image so the landing page can show real
// artwork from each talk. Falls back to a branded placeholder if export fails.
function exportCover(folder, folderPath) {
  const coversDir = join(distDir, 'covers');
  mkdirSync(coversDir, { recursive: true });
  const tmpDir = join(folderPath, '.cover-tmp');
  try {
    execSync(`npx slidev export slides.md --format png --range 1 --output ${join(tmpDir, 'c')}`, {
      cwd: folderPath,
      stdio: 'pipe',
    });
    const rendered = join(tmpDir, 'c', '1.png');
    if (existsSync(rendered)) {
      cpSync(rendered, join(coversDir, `${folder}.png`));
      console.log('   🖼️  Cover exported');
      return;
    }
    throw new Error('no rendered slide');
  } catch (error) {
    console.log(`   🎨 Cover export skipped (${error.message.split('\n')[0]}), using placeholder`);
    writeFallbackCover(folder, folderPath);
  } finally {
    try { rmSync(tmpDir, { recursive: true, force: true }); } catch (_) { /* ignore */ }
  }
}

function writeFallbackCover(folder, folderPath) {
  const meta = getTalkMeta(folderPath);
  const title = getTalkTitle(folderPath) || folder;
  const color = meta.primary || '#006cac';
  const lines = wrapText(title, 22).slice(0, 3);
  const text = lines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : 72}">${escapeHtml(line)}</tspan>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${color}"/>
    <stop offset="1" stop-color="${color}" stop-opacity="0.65"/>
  </linearGradient></defs>
  <rect width="1280" height="720" fill="url(#g)"/>
  <text x="80" y="300" fill="#ffffff" font-family="Georgia, serif" font-size="60" font-weight="700">${text}</text>
  <text x="80" y="650" fill="#ffffff" fill-opacity="0.85" font-family="Arial, sans-serif" font-size="26" letter-spacing="2">${escapeHtml((meta.event || '').toUpperCase())}</text>
</svg>`;
  writeFileSync(join(distDir, 'covers', `${folder}.svg`), svg);
}

function wrapText(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > maxChars && line) {
      lines.push(line.trim());
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Returns the public URL for a talk's cover, or null if none was produced.
function coverUrl(folder) {
  if (existsSync(join(distDir, 'covers', `${folder}.png`))) return `${basePath}covers/${folder}.png`;
  if (existsSync(join(distDir, 'covers', `${folder}.svg`))) return `${basePath}covers/${folder}.svg`;
  return null;
}

const ACTION_ICONS = {
  slides: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  blog: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
};

function slugifyTag(tag) {
  return String(tag).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Collect everything the landing page needs to know about one talk.
function talkData(talk) {
  const folderPath = join(rootDir, talk.folder);
  const meta = getTalkMeta(folderPath);
  return {
    ...talk,
    title: getTalkTitle(folderPath) || talk.topic,
    meta,
    upcoming: isUpcoming(talk.month, talk.year),
    event: meta.event || talk.event,
    date: meta.date || talk.date,
    cover: coverUrl(talk.folder),
    accent: meta.primary || '',
    tags: meta.tags || [],
    slidesHref: meta.slidesUrl || `${basePath}${talk.folder}/`,
  };
}

function buildActions(d) {
  const actions = [
    { label: 'Slides', icon: 'slides', href: d.slidesHref, primary: true },
    d.meta.linkedinUrl ? { label: 'LinkedIn Post', icon: 'linkedin', href: d.meta.linkedinUrl } : null,
    d.meta.blogUrl ? { label: 'Blog Post', icon: 'blog', href: d.meta.blogUrl } : null,
  ].filter(Boolean);
  return `<div class="talk-actions">${actions.map(a => `
        <span class="magnetic-wrap"><a href="${a.href}" class="action-link${a.primary ? ' primary' : ''}"${a.href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>
          <span>${a.label}</span>${ACTION_ICONS[a.icon] || ''}
        </a></span>`).join('')}
      </div>`;
}

function buildTags(d) {
  if (!d.tags.length) return '';
  return `<div class="talk-tags">${d.tags.map(t => `<span class="talk-tag">${escapeHtml(t)}</span>`).join('')}</div>`;
}

function buildBadges(d) {
  return [
    d.upcoming ? '<span class="talk-badge upcoming">Upcoming</span>' : '',
    d.meta.draft ? '<span class="talk-badge draft">Draft</span>' : '',
  ].filter(Boolean).join('');
}

function buildThumb(d, className) {
  if (!d.cover) {
    return `<a class="${className} ${className}--empty" href="${d.slidesHref}" aria-hidden="true" tabindex="-1"><span>${escapeHtml(d.title)}</span></a>`;
  }
  return `<a class="${className}" href="${d.slidesHref}" aria-label="Open ${escapeHtml(d.title)}">
        <img src="${d.cover}" alt="Cover slide for ${escapeHtml(d.title)}" loading="lazy" decoding="async" width="1280" height="720">
      </a>`;
}

function accentStyle(d) {
  return d.accent ? ` style="--card-accent: ${escapeHtml(d.accent)}"` : '';
}

function renderFeatured(d) {
  const badges = buildBadges(d);
  return `
    <article class="featured-card glow-card tilt reveal-up"${accentStyle(d)} data-tags="${d.tags.map(slugifyTag).join(' ')}">
      ${buildThumb(d, 'featured-thumb')}
      <div class="featured-body">
        <span class="kicker">★ Latest talk</span>
        <div class="talk-meta-row">
          <span class="talk-date">${escapeHtml(d.date)}</span>
          <span class="talk-event">${escapeHtml(d.event)}</span>
          ${badges ? `<span class="talk-badges">${badges}</span>` : ''}
        </div>
        <h2 class="featured-title"><a href="${d.slidesHref}">${escapeHtml(d.title)}</a></h2>
        ${d.meta.description ? `<p class="featured-desc">${escapeHtml(d.meta.description)}</p>` : ''}
        ${buildTags(d)}
        ${buildActions(d)}
      </div>
    </article>`;
}

function renderTalkCard(d) {
  const badges = buildBadges(d);
  return `
      <article class="talk-card glow-card tilt reveal-up"${accentStyle(d)} data-tags="${d.tags.map(slugifyTag).join(' ')}">
        ${buildThumb(d, 'talk-thumb')}
        <div class="talk-body">
          <div class="talk-card-header">
            <span class="talk-date">${escapeHtml(d.date)}</span>
            ${badges ? `<span class="talk-badges">${badges}</span>` : ''}
          </div>
          <h3 class="talk-title"><a href="${d.slidesHref}">${escapeHtml(d.title)}</a></h3>
          <div class="talk-event">${escapeHtml(d.event)}</div>
          ${d.meta.description ? `<p class="talk-description">${escapeHtml(d.meta.description)}</p>` : ''}
          ${buildTags(d)}
          ${buildActions(d)}
        </div>
      </article>`;
}

function renderFilters(data) {
  const tags = [...new Set(data.flatMap(d => d.tags))].sort((a, b) => a.localeCompare(b));
  if (tags.length === 0) return '';
  const buttons = [`<button class="filter-chip is-active" data-filter="all" type="button">All</button>`]
    .concat(tags.map(t => `<button class="filter-chip" data-filter="${slugifyTag(t)}" type="button">${escapeHtml(t)}</button>`));
  return buttons.join('');
}

function generateLandingPage(talks) {
  const landingTemplate = readFileSync(join(rootDir, 'landing', 'index.html'), 'utf-8');
  const styles = readFileSync(join(rootDir, 'landing', 'styles.css'), 'utf-8');

  const data = talks.map(talkData);
  const [featured, ...rest] = data;

  // Group the rest of the archive by year, newest first.
  const cardsByYear = new Map();
  rest.forEach(d => {
    if (!cardsByYear.has(d.year)) cardsByYear.set(d.year, []);
    cardsByYear.get(d.year).push(renderTalkCard(d));
  });

  const archive = [...cardsByYear.keys()]
    .sort((a, b) => b - a)
    .map(year => `
      <section class="year-group" data-year="${year}">
        <div class="year-label reveal-up"><span>${year}</span></div>
        <div class="year-talks">${cardsByYear.get(year).join('\n')}</div>
      </section>`)
    .join('\n');

  const html = landingTemplate
    .replace('{{FEATURED}}', featured ? renderFeatured(featured) : '')
    .replace('{{FILTERS}}', renderFilters(rest))
    .replace('{{TALKS}}', archive)
    .replace('{{STYLES}}', styles)
    .replace(/\{\{BASE_PATH\}\}/g, basePath);

  writeFileSync(join(distDir, 'index.html'), html);
  console.log('\n📄 Generated landing page');
}

async function main() {
  console.log('🚀 Building all presentations...\n');
  console.log(`Base path: ${basePath}`);

  // Create dist directory
  mkdirSync(distDir, { recursive: true });
  cpSync(join(rootDir, 'landing', 'fonts'), join(distDir, 'fonts'), { recursive: true });

  // Find all talk folders
  const folders = getTalkFolders();
  console.log(`Found ${folders.length} talk(s):`);
  folders.forEach(f => console.log(`  - ${f}`));

  if (folders.length === 0) {
    console.log('\n⚠️  No talk folders found. Expected pattern: name-MM-YYYY');
    process.exit(1);
  }

  // Build each talk
  const results = [];
  for (const folder of folders) {
    const success = buildTalk(folder);
    const parsed = parseTalkFolder(folder);
    if (success && parsed) {
      results.push(parsed);
    }
  }

  // Generate landing page
  if (results.length > 0) {
    generateLandingPage(results);
  }

  console.log(`\n✨ Done! Built ${results.length}/${folders.length} presentations.`);
}

export { getTalkFolders, parseTalkFolder, generateLandingPage };

// Only run the full build when invoked directly (not when imported for preview).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(console.error);
}
