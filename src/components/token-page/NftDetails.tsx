import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Link } from "@chakra-ui/next-js";
import {
  AccordionButton,
  Text,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NFT } from "thirdweb";
import { shortenAddress } from "thirdweb/utils";

type Props = {
  nft: NFT;
};

// Define the block explorer URL directly in this file
const BLOCK_EXPLORER_URL = "https://explorer.bit-rock.io";

export function NftDetails(props: Props) {
  const { type, nftContract } = useMarketplaceContext();
  const { nft } = props;

  const contractUrl = `${BLOCK_EXPLORER_URL}/token/${nftContract.address}`;
  const tokenUrl = `${BLOCK_EXPLORER_URL}/token/${nftContract.address}/instance/${nft.id.toString()}`;

  const linkColor = useColorModeValue("purple.600", "purple.300");

  return (
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          Details
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Flex direction="row" justifyContent="space-between" mb="1">
          <Text>Contract address</Text>
          <Link color={linkColor} href={contractUrl} target="_blank">
            {shortenAddress(nftContract.address)}
          </Link>
        </Flex>
        <Flex direction="row" justifyContent="space-between" mb="1">
          <Text>Token ID</Text>
          <Link color={linkColor} href={tokenUrl} target="_blank">
            {nft.id.toString()}
          </Link>
        </Flex>
        <Flex direction="row" justifyContent="space-between" mb="1">
          <Text>Token Standard</Text>
          <Text>{type}</Text>
        </Flex>
        <Flex direction="row" justifyContent="space-between" mb="1">
          <Text>Chain</Text>
          <Text>{nftContract.chain.name ?? "Unnamed chain"}</Text>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}
