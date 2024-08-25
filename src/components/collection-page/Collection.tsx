import { MediaRenderer, useReadContract } from "thirdweb/react";
import { getNFT as getNFT721 } from "thirdweb/extensions/erc721";
import { getNFT as getNFT1155 } from "thirdweb/extensions/erc1155";
import { client } from "@/consts/client";
import { Box, Flex, Heading, Tab, TabList, Tabs, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { ListingGrid } from "./ListingGrid";
import { AllNftsGrid } from "./AllNftsGrid";

export function Collection() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const {
    type,
    nftContract,
    isLoading,
    contractMetadata,
    listingsInSelectedCollection,
    supplyInfo,
  } = useMarketplaceContext();

  const { data: firstNFT, isLoading: isLoadingFirstNFT } = useReadContract(
    type === "ERC1155" ? getNFT1155 : getNFT721,
    {
      contract: nftContract,
      tokenId: 0n,
      queryOptions: {
        enabled: isLoading || !!contractMetadata?.image,
      },
    }
  );

  const thumbnailImage =
    contractMetadata?.image || firstNFT?.metadata.image || "";

  return (
    <Box mt="24px" w="full" p={6} bg={useColorModeValue("gray.50", "gray.900")} borderRadius="lg" shadow="xl">
      <Flex direction="column" gap="4" alignItems="center">
        <MediaRenderer
          client={client}
          src={thumbnailImage}
          style={{
            borderRadius: "20px",
            width: "200px",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <Heading textAlign="center" fontSize="3xl" mt={4}>
          {contractMetadata?.name || "Unknown collection"}
        </Heading>
        {contractMetadata?.description && (
          <Text
            maxW={{ lg: "500px", base: "300px" }}
            textAlign="center"
            color={useColorModeValue("gray.700", "gray.200")}
            mt={2}
          >
            {contractMetadata.description}
          </Text>
        )}
        <Tabs
          variant="soft-rounded"
          colorScheme="teal"
          mt={6}
          onChange={(index) => setTabIndex(index)}
          isLazy
        >
          <TabList>
            <Tab fontWeight="bold">
              Listings ({listingsInSelectedCollection.length || 0})
            </Tab>
            <Tab fontWeight="bold">
              All items{" "}
              {supplyInfo
                ? `(${(
                    supplyInfo.endTokenId - supplyInfo.startTokenId + 1n
                  ).toString()})`
                : ""}
            </Tab>
          </TabList>
        </Tabs>
      </Flex>
      <Flex direction="column" mt={8}>
        {tabIndex === 0 && <ListingGrid />}
        {tabIndex === 1 && <AllNftsGrid />}
      </Flex>
    </Box>
  );
}
