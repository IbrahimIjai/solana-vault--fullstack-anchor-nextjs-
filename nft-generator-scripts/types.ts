export interface BAYCMetadata {
	image: string;
	attributes: Array<{
		trait_type: string;
		value: string;
	}>;
}

export interface MetaplexMetadata {
	name: string;
	symbol: string;
	description: string;
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