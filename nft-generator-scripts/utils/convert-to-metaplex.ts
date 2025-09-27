import { BAYCMetadata, MetaplexMetadata } from "../types";

export function convertToMetaplex(baycData: BAYCMetadata, tokenId: number): MetaplexMetadata {
	return {
		name: `BAYC #${tokenId}`,
		symbol: "BAYC",
		description: `Bored Ape Yacht Club NFT #${tokenId}`,
		image: `${tokenId}.png`,
		attributes: baycData.attributes,
		properties: {
			files: [
				{
					uri: `${tokenId}.png`,
					type: "image/png",
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
}