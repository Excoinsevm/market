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
   {
    address: "0xD531735dB0C95A22f0669990bA97C244e68f0B10",
    chain: bitrock,
    title: "Cool Cats",
    thumbnailUrl:
      "https://1359df3adf00c991ec1e8d3ac7e1d8ad.ipfscdn.io/ipfs/QmYSfsK91RBifXmTxkAq6qw1ddGYZBFkbxXm1CojTWF4Yt/Untitled%20design.gif",
    type: "ERC1155",
  },
];
