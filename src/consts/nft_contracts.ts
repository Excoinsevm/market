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
 * Below is a list of all NFT contracts supported by this marketplace(s)
 * This is of course hard-coded for demo purpose
 *
 * In reality, the list should be dynamically fetched from your own data source
 */
export const NFT_CONTRACTS: NftContract[] = [
  {
    address: "0x8dDEC53Ad0FbBd07FC1e5E5C238dC8B9DcE45557",
    chain: bitrock,
    title: "Brock Computer Cats",
    thumbnailUrl:
      "https://1359df3adf00c991ec1e8d3ac7e1d8ad.ipfscdn.io/ipfs/bafybeicpymcc7az5mjopadvjh2lhmhgjso3l7rjdrl2rmvrqgxcyturr3q/IMG_1154.gif",
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
     {
    address: "0x57d80b8A597eB23A067f36F09E27D59CF85Ba89D",
    chain: bitrock,
    title: "Jamma's CommMutiny",
    thumbnailUrl:
      "https://d391b93f5f62d9c15f67142e43841acc.ipfscdn.io/ipfs/bafybeictfuagmsxpzig3skt2s3eljo7c6uhp77wmmx7pwsfo4kevvd6ioq/4c424c44-986f-494f-b373-28c847aef442.jpg",
    type: "ERC721",
  },
];
