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
  Divider,
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
    <AccordionItem border="none">
      <AccordionButton
        _expanded={{ bg: "gray.100", color: "purple.600" }}
        borderRadius="md"
        px={4}
        py={3}
        _hover={{ bg: "gray.200" }}
      >
        <Box as="span" flex="1" textAlign="left" fontWeight="bold">
          Details
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} px={4}>
        <Flex direction="column" gap={4}>
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Text fontWeight="medium">Contract Address:</Text>
            <Link color={linkColor} href={contractUrl} target="_blank" _hover={{ textDecoration: "underline" }}>
              {shortenAddress(nftContract.address)}
            </Link>
          </Flex>
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Text fontWeight="medium">Token ID:</Text>
            <Link color={linkColor} href={tokenUrl} target="_blank" _hover={{ textDecoration: "underline" }}>
              {nft.id.toString()}
            </Link>
          </Flex>
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Text fontWeight="medium">Token Standard:</Text>
            <Text>{type}</Text>
          </Flex>
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Text fontWeight="medium">Chain:</Text>
            <Text>{nftContract.chain.name ?? "Unnamed chain"}</Text>
          </Flex>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}
