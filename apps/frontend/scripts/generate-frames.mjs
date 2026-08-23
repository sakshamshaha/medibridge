import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'images', 'homepage-sequence');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const TOTAL_FRAMES = 120;
const CANVAS_SIZE = 800;

for (let i = 1; i <= TOTAL_FRAMES; i++) {
  const progress = (i - 1) / (TOTAL_FRAMES - 1); // 0 to 1
  
  // Animation logic
  let explosion = 0;
  if (progress < 0.15) {
    explosion = 0;
  } else if (progress < 0.4) {
    explosion = (progress - 0.15) / 0.25;
  } else if (progress < 0.65) {
    explosion = 1 + (progress - 0.4) / 0.25;
  } else if (progress < 0.85) {
    explosion = 2;
  } else {
    explosion = 2 * (1 - (progress - 0.85) / 0.15);
  }

  const gap = explosion * 100;
  const topY = 300 - gap;
  const bottomY = 500 + gap;
  
  let particlesSVG = '';
  if (explosion > 0.1) {
    for (let p = 0; p < 20; p++) {
      const rand1 = (Math.sin(p * 12.9898) * 43758.5453) % 1;
      const rand2 = (Math.cos(p * 78.233) * 43758.5453) % 1;
      const px = 400 + (rand1 - 0.5) * 150 * explosion;
      const py = 400 + (rand2 - 0.5) * 200 * explosion;
      const opacity = Math.min(1, explosion * 2);
      particlesSVG += `<circle cx="${px}" cy="${py}" r="${4 + Math.abs(rand1)*4}" fill="#00B8D9" opacity="${opacity}" />`;
    }
  }

  const svg = `
<svg width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" viewBox="0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#050505" />
  
  <!-- Particles -->
  ${particlesSVG}
  
  <!-- Top Half -->
  <path d="M320,${topY + 100} L320,${topY} A80,80 0 0,1 480,${topY} L480,${topY + 100} Z" fill="url(#teal-grad)" />
  
  <!-- Bottom Half -->
  <path d="M320,${bottomY - 100} L320,${bottomY} A80,80 0 0,0 480,${bottomY} L480,${bottomY - 100} Z" fill="url(#green-grad)" />
  
  <!-- Outer glowing rings when exploded -->
  ${explosion > 0 ? `<circle cx="400" cy="400" r="${200 + explosion * 20}" stroke="#2ED9A0" stroke-width="2" fill="none" stroke-dasharray="10 10" opacity="${explosion * 0.5}" />` : ''}

  <defs>
    <linearGradient id="teal-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#00B8D9" />
      <stop offset="100%" stop-color="#006c80" />
    </linearGradient>
    <linearGradient id="green-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#197a5a" />
      <stop offset="100%" stop-color="#2ED9A0" />
    </linearGradient>
  </defs>
</svg>`;

  const fileName = `frame_${i.toString().padStart(4, '0')}.svg`;
  fs.writeFileSync(path.join(outDir, fileName), svg);
}

console.log(`Generated ${TOTAL_FRAMES} frames successfully.`);
