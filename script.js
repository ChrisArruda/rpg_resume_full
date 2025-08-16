import { data } from './data.js';

// Debug: Verify data is loaded correctly
console.log('Script initialized with data:', {
  contact: data.contact,
  resumePdf: data.resumePdf,
  hasQuests: data.quests?.length > 0
});

// Helpers
const clamp = (n, min=0, max=100) => Math.max(min, Math.min(max, n));
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const toId = (s) => s.replace(/[^a-z0-9]+/gi, '-').toLowerCase();

// Mount HUD
$('#playerName').textContent = data.name;
$('#level').textContent = data.level;
$('#className').textContent = data.className;
$('#hpBar').style.width = clamp(data.hp) + '%';
$('#mpBar').style.width = clamp(data.mp) + '%';

// Stats
const statsList = $('#statsList');
data.stats.forEach(s => {
  const li = document.createElement('li');
  li.innerHTML = `<span>${s.label}</span><span class="meter"><span style="width:${clamp(s.value)}%"></span></span>`;
  statsList.appendChild(li);
});

// Inventory
const invList = $('#inventoryList');
data.inventory.forEach(i => {
  const li = document.createElement('li');
  li.textContent = i;
  invList.appendChild(li);
});

// Quests
const questList = $('#questList');
if (data.quests && Array.isArray(data.quests)) {
  console.log(`Found ${data.quests.length} quests`);
  
  data.quests.forEach((q, index) => {
    const li = document.createElement('li');
    li.className = 'quest';
    
    // Ensure we have a valid link
    const hasValidLink = q.link && typeof q.link === 'string' && q.link.trim() !== '' && q.link.trim() !== '#';
    const link = hasValidLink ? q.link.trim() : null;
    
    console.log(`Quest ${index + 1}:`, {
      title: q.title,
      hasLink: !!q.link,
      validLink: hasValidLink,
      link: link
    });
    
    li.innerHTML = `
      <div class="quest__top">
        <strong>${q.title || 'Untitled Quest'}</strong>
        ${q.difficulty ? `<span class="quest__meta">Difficulty ${q.difficulty}</span>` : ''}
      </div>
      ${q.summary ? `<div class="quest__meta">${q.summary}</div>` : ''}
      ${q.skills && q.skills.length ? `<div class="quest__meta">Loot: ${q.skills.join(', ')}</div>` : ''}
      ${hasValidLink ? 
        `<a class="btn btn--ghost view-project" 
            href="${link}" 
            target="_blank" 
            rel="noopener noreferrer"
            data-link="${link}">View Project</a>` : 
        '<span class="quest__soon">Coming Soon</span>'
      }
    `;
    
    questList.appendChild(li);
  });
}

// Guilds
const guildList = $('#guildList');
if (data.guilds && Array.isArray(data.guilds)) {
  data.guilds.forEach(g => {
    const li = document.createElement('li');
    li.className = 'guild';
    li.innerHTML = `
      <div>
        <div class="guild__name">${g.name || 'Untitled Guild'}</div>
        <div class="guild__role">${[g.role, g.dates, g.location].filter(Boolean).join(' • ')}</div>
      </div>
    `;
    guildList.appendChild(li);
  });
}

// Overview
$('#bioText').textContent = data.bio || 'No bio available';
const tree = $('#skillTree');
if (data.skillTree && Array.isArray(data.skillTree)) {
  data.skillTree.forEach(s => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${s.name || 'Skill'}</span><span class="meter"><span style="width:${clamp(s.value || 0)}%"></span></span>`;
    tree.appendChild(li);
  });
}

// Achievements
const badgesList = $('#badgesList');
if (data.badges && Array.isArray(data.badges)) {
  data.badges.forEach(b => {
  const li = document.createElement('li');
  li.className = 'badge';
  li.innerHTML = `<span class="dot"></span><span>${b.name}</span>`;
  badgesList.appendChild(li);
  });
}

// Resume
const resumeBtn = $('#downloadResume');
if (data.resumePdf && data.resumePdf.trim() !== '') {
  // Make sure the path is relative to the server root
  const resumeUrl = data.resumePdf.trim().startsWith('/') 
    ? data.resumePdf.trim() 
    : '/' + data.resumePdf.trim();
  
  console.log('Setting up resume download with URL:', resumeUrl);
  
  // Set the download attribute to the filename only
  const filename = resumeUrl.split('/').pop().split('?')[0];
  resumeBtn.href = resumeUrl;
  resumeBtn.download = filename;
  
  resumeBtn.addEventListener('click', async (e) => {
    try {
      console.log('Checking resume availability:', resumeUrl);
      const response = await fetch(resumeUrl, { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      
      if (!response.ok) {
        console.error('Resume not found at:', resumeUrl);
        throw new Error('Resume not found');
      }
      console.log('Resume found, proceeding with download');
      // Let the default download behavior happen
    } catch (error) {
      console.error('Error accessing resume:', error);
      e.preventDefault();
      const originalText = resumeBtn.textContent;
      resumeBtn.textContent = 'Resume not found';
      setTimeout(() => resumeBtn.textContent = originalText, 2000);
    }
  });
} else {
  console.warn('No resumePdf specified in data.js');
  resumeBtn.setAttribute('aria-disabled', 'true');
  resumeBtn.textContent = 'Resume not available';
  resumeBtn.removeAttribute('href');
}

// Contact - Start Quest Button
const contactBtn = $('#contactBtn');
if (data.contact?.email) {
  const email = data.contact.email.trim();
  console.log('Setting up contact button with email:', email);
  
  contactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const subject = 'Project inquiry from your site';
    const body = `Hi Chris,

I came across your portfolio and wanted to discuss a potential project.

Project Details:
- Timeline: 
- Budget: 
- Description: 

Looking forward to hearing from you!`;
    
    const mailtoUrl = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    console.log('Opening mailto link:', mailtoUrl);
    window.location.href = mailtoUrl;
  });
} else {
  console.warn('No contact email found in data.js');
  contactBtn.setAttribute('aria-disabled', 'true');
  contactBtn.textContent = 'Contact not available';
  contactBtn.removeAttribute('href');
}

// Copy Email Button
const copyEmailBtn = $('#copyEmail');
if (data.contact?.email) {
  const email = data.contact.email.trim();
  copyEmailBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      const originalText = copyEmailBtn.textContent;
      copyEmailBtn.textContent = 'Copied!';
      setTimeout(() => copyEmailBtn.textContent = originalText, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
      const originalText = copyEmailBtn.textContent;
      copyEmailBtn.textContent = 'Copy failed';
      setTimeout(() => copyEmailBtn.textContent = originalText, 2000);
    }
  });
} else {
  copyEmailBtn.setAttribute('aria-disabled', 'true');
  copyEmailBtn.textContent = 'Email not available';
}

// Tabs and keyboard navigation
const sections = ['#character','#quests','#guilds','#overview','#achievements'];
const focusSection = (idx) => {
  const target = document.querySelector(sections[idx]);
  if (!target) return;
  
  // Update URL without adding to browser history
  history.replaceState(null, '', sections[idx]);
  
  // Smooth scroll to section
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  
  // Update active tab
  $$('.tab').forEach((t, i) => {
    t.classList.toggle('is-active', i === idx);
    t.setAttribute('aria-selected', i === idx ? 'true' : 'false');
  });
  
  // Focus the target for keyboard navigation
  target.focus({ preventScroll: true });
};
$$('.tab').forEach((btn, i) => {
  btn.addEventListener('click', () => focusSection(i));
});

window.addEventListener('keydown', (e) => {
  const keyIndex = ['1','2','3','4','5'].indexOf(e.key);
  if (keyIndex >= 0){ focusSection(keyIndex); }
  if (['ArrowRight','l','L'].includes(e.key)){
    const current = $$('.tab').findIndex(t => t.classList.contains('is-active'));
    focusSection((current + 1) % sections.length);
  }
  if (['ArrowLeft','h','H'].includes(e.key)){
    const current = $$('.tab').findIndex(t => t.classList.contains('is-active'));
    focusSection((current - 1 + sections.length) % sections.length);
  }
});

// Initial mount
focusSection(0);
