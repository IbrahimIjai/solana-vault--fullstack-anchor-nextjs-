// create_placeholders.js
import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';

const OUTPUT_DIR = './assets';
const COLORS = [
  '#4287f5', // blue
  '#f54242', // red
  '#42f54e', // green
  '#f5d442', // yellow
  '#f542f2'  // pink
];

// Create a simple placeholder image
function createPlaceholderImage(index, width = 500, height = 500) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fill background with a color based on index
  const colorIndex = index % COLORS.length;
  ctx.fillStyle = COLORS[colorIndex];
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = '#ffffff';
  ctx.font = '60px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`Ape #${index}`, width / 2, height / 2);
  
  return canvas.toBuffer('image/png');
}

// Create placeholder images for NFTs
async function createPlaceholders() {
  console.log('Creating placeholder images...');
  
  // Create collection image
  const collectionImage = createPlaceholderImage('Collection', 500, 500);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'collection.png'), collectionImage);
  console.log('Created collection.png');
  
  // Create numbered images
  for (let i = 0; i < 20; i++) {
    const imageBuffer = createPlaceholderImage(i);
    fs.writeFileSync(path.join(OUTPUT_DIR, `${i}.png`), imageBuffer);
    console.log(`Created ${i}.png`);
  }
  
  console.log('All placeholder images created successfully!');
}

createPlaceholders().catch(console.error);
