import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace text-white with text-textBase (except for buttons that might need to stay white)
  content = content.replace(/text-white(?! font-bold rounded-lg| font-medium rounded-lg)/g, 'text-textBase');
  
  // Replace border-white/10 with border-black/10
  content = content.replace(/border-white\/10/g, 'border-black/10');
  
  // Replace from-white to-white/60 with from-textBase to-textMuted (Hero title)
  content = content.replace(/from-white to-white\/60/g, 'from-textBase to-textMuted');
  
  // Replace bg-primary/50 with bg-black/5 (Contact inputs)
  content = content.replace(/bg-primary\/50/g, 'bg-black/5');
  
  // Replace bg-white/5 with bg-black/5 (Skills pill)
  content = content.replace(/bg-white\/5/g, 'bg-black/5');

  // Replace text-textBase for the Navbar hamburger so it stands out
  // Wait, text-textBase is fine for hamburger in light mode.
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
