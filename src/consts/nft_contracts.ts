import type { Chain } from "thirdweb";
import { bitrock } from "./chains";

export type NftContract = {
  address: string;
  chain: Chain;
  type: "ERC1155" | "ERC721";

  title?: string;
  description?: string;
  thumbnailUrl?: string;
  slug?: string;
};

/**
 * Below is a list of all NFT contracts supported by your marketplace(s)
 * This is of course hard-coded for demo purpose
 *
 * In reality, the list should be dynamically fetched from your own data source
 */
export const NFT_CONTRACTS: NftContract[] = [
  {
    address: "0xDc971D6792dBECec1a0789D87EFb0a21D553AF50",
    chain: bitrock,
    title: "PopCatRock",
    thumbnailUrl:
      "https://848baf1d3aadd147b5cceb158406762a.ipfscdn.io/ipfs/QmWEC5JTxVPLWcJZBFmDXCCZJTYXbveDz29zwZBPPQ6L8n/IMG_1050-removebg-preview.png",
    type: "ERC721",
  },
];
