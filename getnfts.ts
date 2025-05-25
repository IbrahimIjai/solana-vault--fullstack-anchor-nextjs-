import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

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

const BASE_URI = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
const OUTPUT_DIR = "./assets";
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
    return ipfsUri.replace("ipfs://", IPFS_GATEWAY);
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
    const tokenFolder = path.join(OUTPUT_DIR, folderIndex.toString());

    console.log(`Processing token ${tokenId} -> folder ${folderIndex}...`);

    // Create token folder
    if (!fs.existsSync(tokenFolder)) {
      fs.mkdirSync(tokenFolder, { recursive: true });
    }

    // Fetch original metadata
    const metadataUrl = ipfsToHttp(`${BASE_URI}${tokenId}`);
    const originalMetadata = await fetchMetadata(metadataUrl);

    console.log(`  Found: ${originalMetadata.name}`);

    // Get image URL and extension
    const imageUrl = ipfsToHttp(originalMetadata.image);
    const urlParts = imageUrl.split(".");
    const extension = urlParts[urlParts.length - 1].split("?")[0] || "png";

    // Image filename (Sugar format uses sequential numbers)
    const imageFileName = `${folderIndex}.${extension}`;
    const imagePath = path.join(tokenFolder, imageFileName);

    // Skip if files already exist
    const metadataPath = path.join(tokenFolder, "metadata.json");
    if (fs.existsSync(imagePath) && fs.existsSync(metadataPath)) {
      console.log(`  Skipped: folder ${folderIndex} (already exists)`);
      return;
    }

    // Download image
    await downloadFile(imageUrl, imagePath);
    console.log(`  Downloaded: ${imageFileName}`);

    // Create Sugar-format metadata
    const sugarMetadata = convertToSugarFormat(originalMetadata, imageFileName);
    fs.writeFileSync(metadataPath, JSON.stringify(sugarMetadata, null, 4));
    console.log(`  Created: metadata.json`);
  } catch (error) {
    console.error(`Error downloading token ${tokenId}:`, error);
  }
}

// Main function
async function main(): Promise<void> {
  console.log("Starting BAYC NFT download in Sugar v3 format...");
  console.log(`Downloading first ${MAX_TOKENS} tokens to ${OUTPUT_DIR}`);
  console.log("Structure: assets/0/, assets/1/, assets/2/, etc.");

  createOutputDir();

  // Download tokens sequentially to avoid rate limiting
  for (let i = 1; i <= MAX_TOKENS; i++) {
    await downloadNFT(i);

    // Add small delay between requests
    if (i < MAX_TOKENS) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log("\nDownload completed!");
  console.log(
    `Check the ${OUTPUT_DIR} folder for your NFTs in Sugar v3 format.`
  );
  console.log("Each folder contains:");
  console.log("  - metadata.json (Sugar format)");
  console.log("  - {index}.png (NFT image)");
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

export { downloadNFT, main };
