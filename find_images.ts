import fs from 'fs';
import path from 'path';

function search(dir: string, depth = 0) {
  if (depth > 4) return;
  try {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
          if (
            file !== 'node_modules' && 
            file !== '.git' && 
            file !== 'dist' && 
            file !== 'proc' && 
            file !== 'sys' && 
            file !== 'dev' &&
            file !== 'etc' &&
            file !== 'usr' &&
            file !== 'lib' &&
            file !== 'lib64' &&
            file !== 'var' &&
            file !== 'boot' &&
            file !== 'run'
          ) {
            search(fullPath, depth + 1);
          }
        } else {
          const ext = path.extname(file).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext)) {
            console.log('FOUND IMAGE:', fullPath);
          }
        }
      } catch (e) {}
    });
  } catch (e) {}
}

console.log('Searching for images...');
search('/');
console.log('Done searching.');
