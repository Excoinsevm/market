import { Box, Flex, Link, Text } from "@chakra-ui/react";
import type { NFT, ThirdwebContract } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";
import { client } from "@/consts/client";

export function OwnedItem(props: {
  nft: NFT;
  nftCollection: ThirdwebContract;
}) {
  const { nft, nftCollection } = props;
  return (
    <Box
      rounded="lg"
      borderWidth="1px"
      borderColor="gray.200"
      overflow="hidden"
      _hover={{ boxShadow: "lg", cursor: "pointer" }}
      as={Link}
      href={`/collection/${nftCollection.chain.id}/${
        nftCollection.address
      }/token/${nft.id.toString()}`}
      w="full" // Full width of the grid cell
      maxW="250px" // Ensures it doesn't get too wide
    >
      <Flex direction="column" align="center" p={4}>
        <MediaRenderer client={client} src={nft.metadata.image} style={{ width: '100%', height: 'auto' }} />
        <Text mt={2} fontWeight="bold" textAlign="center">
          {nft.metadata?.name ?? "Unknown item"}
        </Text>
      </Flex>
    </Box>
  );
}
