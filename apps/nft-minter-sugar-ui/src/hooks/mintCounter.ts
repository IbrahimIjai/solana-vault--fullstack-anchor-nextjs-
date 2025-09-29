import { MintCounterArgs } from "@metaplex-foundation/mpl-candy-guard";
import { deserialize } from "borsh";

export class MintCounterBorsh implements MintCounterArgs {
  count: number;
  constructor(args: MintCounterArgs) {
    this.count = args.count;
  }
  static schema: any = new Map([
    [
      MintCounterBorsh,
      {
        kind: "struct",
        fields: [
        //   ["accountDiscriminator", "Uint8Array"],
          ["count", "u16"],
        ],
      },
    ],
  ]);
  static fromBuffer(buffer: Buffer) {
    return deserialize(MintCounterBorsh.schema, new Uint8Array(buffer)) as MintCounterBorsh;
  }
}
