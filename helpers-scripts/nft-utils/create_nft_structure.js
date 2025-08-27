// create_nft_structure.js
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = './assets';
const NUM_NFTS = 20;

// Create the assets directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Created directory: ${OUTPUT_DIR}`);
}

// Create collection.json
const collectionJson = {
  "name": "Bored Ape Yacht Club Collection",
  "symbol": "BAYC",
  "description": "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain.",
  "seller_fee_basis_points": 500,
  "external_url": "https://boredapeyachtclub.com/",
  "edition": "",
  "background_color": "000000",
  "image": "collection.png"
};

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'collection.json'), 
  JSON.stringify(collectionJson, null, 2)
);
console.log('Created collection.json');

// Create placeholder text file for collection.png
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'collection.png'), 
  'This is a placeholder for collection.png. Replace with an actual image.'
);
console.log('Created collection.png placeholder');

// Create numbered JSON files
for (let i = 0; i < NUM_NFTS; i++) {
  const nftJson = {
    "name": `Bored Ape #${i}`,
    "symbol": "BAYC",
    "description": "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs.",
    "seller_fee_basis_points": 500,
    "external_url": "https://boredapeyachtclub.com/",
    "edition": "",
    "background_color": "000000",
    "image": `${i}.png`,
    "attributes": [
      {
        "trait_type": "Background",
        "value": "Blue"
      },
      {
        "trait_type": "Fur",
        "value": "Brown"
      },
      {
        "trait_type": "Eyes",
        "value": "Bored"
      }
    ]
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, `${i}.json`), 
    JSON.stringify(nftJson, null, 2)
  );
  console.log(`Created ${i}.json`);

  // Create placeholder text file for each NFT image
  fs.writeFileSync(
    path.join(OUTPUT_DIR, `${i}.png`), 
    `This is a placeholder for Bored Ape #${i} image. Replace with an actual image.`
  );
  console.log(`Created ${i}.png placeholder`);
}

console.log('NFT structure creation completed!');
console.log(`Check the ${OUTPUT_DIR} folder for your NFT files.`);
