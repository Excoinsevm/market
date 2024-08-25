import { client } from "@/consts/client";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Flex,
  SimpleGrid,
  useBreakpointValue,
  Text,
  Select,
} from "@chakra-ui/react";
import { MediaRenderer } from "thirdweb/react";
import { useState } from "react";

export function ListingGrid() {
  const { listingsInSelectedCollection, nftContract } = useMarketplaceContext();
  const [sortOrder, setSortOrder] = useState<string>('priceLowToHigh'); // Default sorting order
  const len = listingsInSelectedCollection.length;

  const columns = useBreakpointValue({
    base: 1,
    sm: Math.min(len, 2),
    md: Math.min(len, 4),
    lg: Math.min(len, 4),
    xl: Math.min(len, 5),
  });

  if (!listingsInSelectedCollection || !len) return <></>;

  // Sorting logic
  const sortedListings = [...listingsInSelectedCollection].sort((a, b) => {
    const priceA = parseFloat(a.currencyValuePerToken.displayValue);
    const priceB = parseFloat(b.currencyValuePerToken.displayValue);
    if (sortOrder === 'priceLowToHigh') {
      return priceA - priceB;
    } else if (sortOrder === 'priceHighToLow') {
      return priceB - priceA;
    }
    return 0;
  });

  return (
    <Box p={4} mx="auto" mt="20px">
      <Flex mb={4} justify="center">
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          width={{ base: "100%", sm: "auto" }}
          maxW="200px"
        >
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </Select>
      </Flex>
      <SimpleGrid columns={columns} spacing={4}>
        {sortedListings.map((item) => (
          <Box
            key={item.id}
            rounded="12px"
            as={Link}
            href={`/collection/${nftContract.chain.id}/${
              nftContract.address
            }/token/${item.asset.id.toString()}`}
            _hover={{ textDecoration: "none" }}
          >
            <Flex direction="column">
              <MediaRenderer client={client} src={item.asset.metadata.image} />
              <Text fontWeight="bold" mt={2}>
                {item.asset?.metadata?.name ?? "Unknown item"}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Price: {item.currencyValuePerToken.displayValue}{" "}
                {item.currencyValuePerToken.symbol}
              </Text>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
