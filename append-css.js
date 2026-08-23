const fs = require('fs');
const file = 'apps/frontend/src/app/globals.css';
let content = fs.readFileSync(file, 'utf8');

const additionalStyles = `
.home-glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.home-glow-accent {
  position: absolute;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(45,212,191,0.15) 0%, rgba(30,41,59,0) 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
}
`;

if (!content.includes('.home-glass-panel')) {
  fs.writeFileSync(file, content + '\n' + additionalStyles);
}
console.log('Appended styles');
