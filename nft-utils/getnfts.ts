import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

interface SugarMetadata {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  external_url: string;
  edition: string;
  background_color: string;
  image: string;
}

interface MetaplexMetadata {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  properties: {
    files: Array<{
      uri: string;
      type: string;
    }>;
    category: string;
    creators: Array<{
      address: string;
      share: number;
    }>;
  };
}

const BASE_URI = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
const OUTPUT_DIR = path.join(__dirname, "assets");
const MAX_TOKENS = 20;

// Create output directory if it doesn't exist
function createOutputDir(): void {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUTPUT_DIR}`);
  }
}

// Convert IPFS URI to HTTP URL
function ipfsToHttp(ipfsUri: string): string {
  if (ipfsUri.startsWith("ipfs://")) {
    const ipfsId = ipfsUri.replace("ipfs://", "");
    return `${IPFS_GATEWAY}${ipfsId}`;
  }
  return ipfsUri;
}

// Download file from URL
function downloadFile(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    const client = url.startsWith("https:") ? https : http;

    const request = client.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      } else {
        file.close();
        fs.unlinkSync(filepath); // Delete the file on error
        reject(
          new Error(
            `Failed to download: ${response.statusCode} ${response.statusMessage}`
          )
        );
      }
    });

    request.on("error", (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });

    file.on("error", (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

// Fetch JSON metadata
async function fetchMetadata(url: string): Promise<NFTMetadata> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https:") ? https : http;

    client
      .get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          try {
            const metadata = JSON.parse(data) as NFTMetadata;
            resolve(metadata);
          } catch (error) {
            reject(new Error(`Failed to parse JSON: ${error}`));
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// Convert BAYC metadata to Sugar format
function convertToSugarFormat(
  originalMetadata: NFTMetadata,
  imageFileName: string
): SugarMetadata {
  return {
    name: originalMetadata.name,
    symbol: "BAYC",
    description: originalMetadata.description,
    seller_fee_basis_points: 500, // 5%
    external_url: "https://boredapeyachtclub.com/",
    edition: "",
    background_color: "000000",
    image: imageFileName,
  };
}

// Download single NFT in Sugar format
async function downloadNFT(tokenId: number): Promise<void> {
  try {
    const folderIndex = tokenId - 1; // Start from 0 like in Sugar

    console.log(`Processing token ${tokenId} -> index ${folderIndex}...`);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Fetch original metadata
    const metadataUrl = ipfsToHttp(`${BASE_URI}${tokenId}`);
    console.log(`  Fetching metadata from: ${metadataUrl}`);
    const originalMetadata = await fetchMetadata(metadataUrl);

    console.log(`  Found: ${originalMetadata.name}`);

    // Get image URL and extension
    const imageUrl = ipfsToHttp(originalMetadata.image);
    console.log(`  Image URL: ${imageUrl}`);
    
    // Always use PNG extension for consistency
    const extension = "png";

    // Image filename (Sugar format uses sequential numbers)
    const imageFileName = `${folderIndex}.${extension}`;
    const imagePath = path.join(OUTPUT_DIR, imageFileName);

    // JSON filename
    const jsonFileName = `${folderIndex}.json`;
    const jsonPath = path.join(OUTPUT_DIR, jsonFileName);

    // Skip if files already exist
    if (fs.existsSync(imagePath) && fs.existsSync(jsonPath)) {
      console.log(`  Skipped: ${folderIndex} (already exists)`);
      return;
    }

    // Download image
    console.log(`  Downloading image to: ${imagePath}`);
    await downloadFile(imageUrl, imagePath);
    console.log(`  Downloaded: ${imageFileName}`);

    // Create Sugar-format metadata
    const sugarMetadata = convertToSugarFormat(originalMetadata, imageFileName);
    fs.writeFileSync(jsonPath, JSON.stringify(sugarMetadata, null, 4));
    console.log(`  Created: ${jsonFileName}`);
  } catch (error) {
    console.error(`Error downloading token ${tokenId}:`, error);
    // Create placeholder files if download fails
    createPlaceholderFiles(tokenId - 1);
  }
}

// Create placeholder files if download fails
function createPlaceholderFiles(index: number): void {
  try {
    const jsonFileName = `${index}.json`;
    const jsonPath = path.join(OUTPUT_DIR, jsonFileName);
    
    if (!fs.existsSync(jsonPath)) {
      const placeholderMetadata = {
        name: `Bored Ape #${index}`,
        symbol: "BAYC",
        description: "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs.",
        seller_fee_basis_points: 500,
        external_url: "https://boredapeyachtclub.com/",
        edition: "",
        background_color: "000000",
        image: `${index}.png`,
        attributes: [
          {
            trait_type: "Background",
            value: "Blue"
          },
          {
            trait_type: "Fur",
            value: "Brown"
          }
        ]
      };
      
      fs.writeFileSync(jsonPath, JSON.stringify(placeholderMetadata, null, 4));
      console.log(`  Created placeholder: ${jsonFileName}`);
    }
    
    const imageFileName = `${index}.png`;
    const imagePath = path.join(OUTPUT_DIR, imageFileName);
    
    if (!fs.existsSync(imagePath)) {
      // Create a simple text file as placeholder
      fs.writeFileSync(imagePath, `Placeholder for Bored Ape #${index}`);
      console.log(`  Created placeholder: ${imageFileName}`);
    }
  } catch (error) {
    console.error(`Error creating placeholder for ${index}:`, error);
  }
}

// Create collection files
async function createCollectionFiles(): Promise<void> {
  console.log("Creating collection files...");
  
  const collectionJsonPath = path.join(OUTPUT_DIR, "collection.json");
  const collectionPngPath = path.join(OUTPUT_DIR, "collection.png");
  
  // Skip if files already exist
  if (fs.existsSync(collectionJsonPath) && fs.existsSync(collectionPngPath)) {
    console.log("Collection files already exist, skipping...");
    return;
  }
  
  // Create collection.json
  const collectionMetadata = {
    name: "Bored Ape Yacht Club Collection",
    symbol: "BAYC",
    description: "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain.",
    seller_fee_basis_points: 500,
    external_url: "https://boredapeyachtclub.com/",
    edition: "",
    background_color: "000000",
    image: "collection.png"
  };
  
  fs.writeFileSync(collectionJsonPath, JSON.stringify(collectionMetadata, null, 4));
  console.log("Created collection.json");
  
  // Try to download a sample image for collection.png
  try {
    // Use the first BAYC as collection image
    const sampleImageUrl = ipfsToHttp("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0");
    const sampleMetadata = await fetchMetadata(sampleImageUrl);
    const collectionImageUrl = ipfsToHttp(sampleMetadata.image);
    
    await downloadFile(collectionImageUrl, collectionPngPath);
    console.log("Downloaded collection.png");
  } catch (error) {
    console.error("Error downloading collection image:", error);
    // Create placeholder collection.png
    fs.writeFileSync(collectionPngPath, "Placeholder for BAYC Collection Image");
    console.log("Created placeholder collection.png");
  }
}

// Main function
async function main(): Promise<void> {
  console.log("Starting BAYC NFT download in Sugar v3 format...");
  console.log(`Downloading first ${MAX_TOKENS} tokens to ${OUTPUT_DIR}`);
  console.log("Structure: assets/0.json, assets/0.png, assets/1.json, etc.");

  createOutputDir();
  
  // Create collection files first
  await createCollectionFiles();

  // Download tokens sequentially to avoid rate limiting
  for (let i = 1; i <= MAX_TOKENS; i++) {
    await downloadNFT(i);

    // Add small delay between requests
    if (i < MAX_TOKENS) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log("\nDownload completed!");
  console.log(`Check the ${OUTPUT_DIR} folder for your NFTs in Sugar v3 format.`);
  console.log("Files created:");
  console.log("  - collection.json and collection.png");
  console.log("  - 0.json, 0.png, 1.json, 1.png, etc.");
}

// Create Metaplex format JSON files for all NFTs
async function createMetaJson(walletAddress: string = "YOUR_WALLET_ADDRESS"): Promise<void> {
  console.log("Creating Metaplex format JSON files...");
  
  // Create collection metadata in Metaplex format
  await createMetaplexCollectionJson(walletAddress);
  
  // Process each NFT
  for (let i = 0; i < MAX_TOKENS; i++) {
    await createMetaplexNftJson(i, walletAddress);
  }
  
  console.log("\nMetaplex JSON creation completed!");
  console.log(`Check the ${OUTPUT_DIR} folder for your Metaplex format JSON files.`);
}

// Create Metaplex format JSON for a single NFT
async function createMetaplexNftJson(index: number, walletAddress: string): Promise<void> {
  try {
    console.log(`Processing Metaplex JSON for NFT #${index}...`);
    
    // Fetch original metadata from IPFS
    const tokenId = index + 1; // BAYC tokens start at 1
    const metadataUrl = ipfsToHttp(`${BASE_URI}${tokenId}`);
    let originalMetadata: NFTMetadata;
    
    try {
      originalMetadata = await fetchMetadata(metadataUrl);
      console.log(`  Fetched original metadata for #${index}`);
    } catch (error) {
      console.error(`  Error fetching original metadata for #${index}:`, error);
      // Create placeholder metadata if fetch fails
      originalMetadata = {
        name: `Bored Ape #${index}`,
        description: "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs.",
        image: "",
        attributes: [
          { trait_type: "Background", value: "Blue" },
          { trait_type: "Eyes", value: "Bored" },
          { trait_type: "Fur", value: "Brown" }
        ]
      };
    }
    
    // Create Metaplex format metadata
    const metaplexMetadata: MetaplexMetadata = {
      name: originalMetadata.name || `Bored Ape #${index}`,
      symbol: "BAYC",
      description: originalMetadata.description || "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs.",
      seller_fee_basis_points: 500,
      image: `${index}.png`,
      attributes: originalMetadata.attributes || [
        { trait_type: "Background", value: "Blue" },
        { trait_type: "Eyes", value: "Bored" },
        { trait_type: "Fur", value: "Brown" }
      ],
      properties: {
        files: [
          {
            uri: `${index}.png`,
            type: "image/png"
          }
        ],
        category: "image",
        creators: [
          {
            address: walletAddress,
            share: 100
          }
        ]
      }
    };
    
    // Write to file
    const jsonPath = path.join(OUTPUT_DIR, `${index}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(metaplexMetadata, null, 2));
    console.log(`  Created Metaplex JSON for #${index}`);
  } catch (error) {
    console.error(`Error creating Metaplex JSON for #${index}:`, error);
  }
}

// Create Metaplex format JSON for the collection
async function createMetaplexCollectionJson(walletAddress: string): Promise<void> {
  try {
    console.log("Creating Metaplex collection JSON...");
    
    const collectionJsonPath = path.join(OUTPUT_DIR, "collection.json");
    
    // Create Metaplex format collection metadata
    const metaplexCollectionMetadata: MetaplexMetadata = {
      name: "Bored Ape Yacht Club Collection",
      symbol: "BAYC",
      description: "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain.",
      seller_fee_basis_points: 500,
      image: "collection.png",
      attributes: [],
      properties: {
        files: [
          {
            uri: "collection.png",
            type: "image/png"
          }
        ],
        category: "image",
        creators: [
          {
            address: walletAddress,
            share: 100
          }
        ]
      }
    };
    
    // Write to file
    fs.writeFileSync(collectionJsonPath, JSON.stringify(metaplexCollectionMetadata, null, 2));
    console.log("Created Metaplex collection JSON");
  } catch (error) {
    console.error("Error creating Metaplex collection JSON:", error);
  }
}

// Run the script
if (process.argv[2] === "--create-meta") {
  // If run with --create-meta argument, only create Metaplex metadata
  const walletAddress = process.argv[3] || "YOUR_WALLET_ADDRESS";
  createMetaJson(walletAddress).catch((error) => {
    console.error("Error creating Metaplex metadata:", error);
    process.exit(1);
  });
} else {
  // Otherwise run the main download function
  main().catch((error) => {
    console.error("Error running script:", error);
    process.exit(1);
  });
}

export { downloadNFT, main, createCollectionFiles, createMetaJson };
