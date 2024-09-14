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

export const NFT_CONTRACTS: NftContract[] = [
  {
      address: "0x281F8a70b8DE841266461C36CD75B8E68B9647E0",
    chain: bitrock,
    title: "Lucky Charm Time & Space",
    thumbnailUrl:
      "https://1359df3adf00c991ec1e8d3ac7e1d8ad.ipfscdn.io/ipfs/QmbcJHZooVP22BM9ZTRxLWNNnPzdtQxF9AhTGXoJyZxpTF/ezgif-2-e69b48ff61.gif",
    type: "ERC721",
  },
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
    address: "0x11D8d0eF07BdD5b2cF684957B5B386144ece4A36",
    chain: bitrock,
    title: "Rock Punks (RP)",
    thumbnailUrl:
      "https://0a0ff0247934a01d366a8c68ebe8847a.ipfscdn.io/ipfs/bafybeiglykfhbk7apkgtpodobtbctedvy6kptirycy6kw7stns7wrr5s24/5.png",
    type: "ERC721",
  },
    {
    address: "0xe1182a0e3d54025BAb41058a1d0058Bd7f6a0B3C",
    chain: bitrock,
    title: "Crypto Freak Trading Card - $HE-MAN",
    thumbnailUrl:
      "https://1359df3adf00c991ec1e8d3ac7e1d8ad.ipfscdn.io/ipfs/bafybeicr77hxsgnbmakaahbkgxmli3egqtfj6jvbxfh5zkmcmuacotggtq/download.gif",
    type: "ERC721",
  },
        // You can add more NFTs here...
];
