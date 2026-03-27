#!/usr/bin/env node

import { execSync } from 'child_process';
import { readdirSync, statSync, existsSync, mkdirSync, cpSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

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

  console.log(`\n📦 Building: ${folder}`);
  console.log(`   Base path: ${talkBasePath}`);

  try {
    // Install dependencies
    execSync('npm install', {
      cwd: folderPath,
      stdio: 'inherit'
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

function generateLandingPage(talks) {
  const landingTemplate = readFileSync(join(rootDir, 'landing', 'index.html'), 'utf-8');
  const styles = readFileSync(join(rootDir, 'landing', 'styles.css'), 'utf-8');

  const talkCards = talks.map(talk => {
    const folderPath = join(rootDir, talk.folder);
    const title = getTalkTitle(folderPath) || talk.topic;
    const meta = getTalkMeta(folderPath);
    const upcoming = isUpcoming(talk.month, talk.year);
    const event = escapeHtml(meta.event || talk.event);
    const date = escapeHtml(meta.date || talk.date);
    const safeTitle = escapeHtml(title);
    const description = meta.description ? `<p class="talk-description">${escapeHtml(meta.description)}</p>` : '';
    const tags = meta.tags.length > 0
      ? `<div class="talk-tags">${meta.tags.map(tag => `<span class="talk-tag">${escapeHtml(tag)}</span>`).join('')}</div>`
      : '';
    const actions = [
      {
        label: 'Slides',
        href: meta.slidesUrl || `${basePath}${talk.folder}/`,
        primary: true,
      },
      meta.linkedinUrl ? { label: 'LinkedIn Post', href: meta.linkedinUrl } : null,
      meta.blogUrl ? { label: 'Blog Post', href: meta.blogUrl } : null,
    ].filter(Boolean);

    const badges = [
      upcoming ? '<span class="talk-badge upcoming">Upcoming</span>' : '',
      meta.draft ? '<span class="talk-badge draft">Draft</span>' : '',
    ].filter(Boolean).join('');

    const actionsMarkup = actions.length > 0
      ? `<div class="talk-actions">${actions.map(action => `
          <a href="${action.href}" class="action-link${action.primary ? ' primary' : ''}"${action.href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>
            ${action.label}
          </a>`).join('')}
        </div>`
      : '';

    return `
      <article class="talk-card">
        <div class="talk-card-header">
          <div class="talk-date">${date}</div>
          ${badges ? `<div class="talk-badges">${badges}</div>` : ''}
        </div>
        <h2 class="talk-title">${safeTitle}</h2>
        <div class="talk-event">${event}</div>
        ${description}
        ${tags}
        ${actionsMarkup}
      </article>`;
  }).join('\n');

  const html = landingTemplate
    .replace('{{TALKS}}', talkCards)
    .replace('{{STYLES}}', styles)
    .replace('{{BASE_PATH}}', basePath);

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

main().catch(console.error);
