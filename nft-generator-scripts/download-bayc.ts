import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { BAYCMetadata } from "./types";
import { convertToMetaplex } from "./utils/convert-to-metaplex";

// BORED APE BASE URI
// https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/
// BAYC Ethereum IPFS base folder
const BASE_URI =
	"https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq";

// How many tokens to download (BAYC has 10000, but test smaller first)
const MAX_TOKENS = 40;

// Ensure assets folder exists
const assetsDir = path.resolve("assets");
if (!fs.existsSync(assetsDir)) {
	fs.mkdirSync(assetsDir);
}

async function downloadFile(url: string, dest: string): Promise<void> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
	const buffer = await res.arrayBuffer();
	fs.writeFileSync(dest, Buffer.from(buffer));
	console.log(`✅ Saved: ${dest}`);
}

async function main() {
	for (let i = 0; i < MAX_TOKENS; i++) {
		try {
			// 1. Fetch metadata from BAYC (BAYC starts from 1)
			const metadataUrl = `${BASE_URI}/${i + 1}`;
			const metadataRes = await fetch(metadataUrl);
			if (!metadataRes.ok)
				throw new Error(`Failed to fetch metadata for #${i + 1}`);
			const metadata = await metadataRes.json() as BAYCMetadata;

			// Convert to Metaplex format and save
			const metaplexMetadata = convertToMetaplex(metadata, i + 1);
			const jsonPath = path.join(assetsDir, `${i}.json`);
			fs.writeFileSync(jsonPath, JSON.stringify(metaplexMetadata, null, 2));
			console.log(`📄 Metaplex metadata saved: ${jsonPath}`);

			// 2. Resolve IPFS image → HTTP gateway
			let imageUri: string = metadata.image;
			if (imageUri.startsWith("ipfs://")) {
				imageUri = `https://ipfs.io/ipfs/${imageUri.replace("ipfs://", "")}`;
			}

			const imgPath = path.join(assetsDir, `${i}.png`);
			await downloadFile(imageUri, imgPath);
		} catch (err: any) {
			console.error(`❌ Error on token #${i + 1}:`, err.message);
		}
	}

	// Create collection metadata
	const collectionMetadata = {
		name: "BAYC Collection",
		symbol: "BAYC",
		description: "Bored Ape Yacht Club NFT Collection",
		image: "collection.jpg",
		external_url: "https://boredapeyachtclub.com",
		properties: {
			files: [
				{
					uri: "collection.jpg",
					type: "image/jpeg",
				},
			],
			category: "image",
			creators: [
				{
					address: "8gEiTqA8FDQ9Y4sRco9nW6ATnpVCcSAcN9BCYxaPPgzR",
					share: 100,
				},
			],
		},
	};

	const collectionPath = path.join(assetsDir, "collection.json");
	fs.writeFileSync(collectionPath, JSON.stringify(collectionMetadata, null, 2));
	console.log(`🎨 Collection metadata saved: ${collectionPath}`);
}

main();
