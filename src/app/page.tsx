"use client";

import { NFT_CONTRACTS } from "@/consts/nft_contracts";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Home() {
  const cardBg = useColorModeValue("white", "gray.700");
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");
  const hoverEffect = useColorModeValue(
    { boxShadow: "xl", transform: "translateY(-2px)", transition: "all 0.2s" },
    { boxShadow: "dark-lg", transform: "translateY(-2px)", transition: "all 0.2s" }
  );

  return (
    <Flex direction="column" align="center" p={6}>
      <Box mt="24px" w="full" maxW="1200px">
        <Flex direction="column" gap={6}>
          
          {/* Trending Collections Section */}
          <Heading textAlign="center">Trending Collections</Heading>
          <Flex direction="row" wrap="wrap" mt="20px" gap={5} justifyContent="center">
            {NFT_CONTRACTS.map((item) => (
              <Link
                _hover={{ ...hoverEffect, textDecoration: "none" }}
                w={200} // Smaller width
                h={300} // Smaller height
                key={item.address}
                href={`/collection/${item.chain.id.toString()}/${item.address}`}
              >
                <Flex direction="column" align="center" bg={cardBg} border="1px" borderColor={cardBorderColor} shadow="md" p={4} borderRadius="md" overflow="hidden">
                  <Image src={item.thumbnailUrl} alt={`${item.title} thumbnail`} borderRadius="md" />
                  <Text fontSize="md" mt={3} fontWeight="bold">
                    {item.title}
                  </Text>
                </Flex>
              </Link>
            ))}
          </Flex>

          {/* Latest Updates Section */}
          <Heading textAlign="center" mt="40px">features</Heading>
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} mt="20px">
            {_latestUpdates.map((item) => (
              <GridItem
                key={item.title}
                p={4}
                border="1px"
                borderColor={cardBorderColor}
                borderRadius="md"
                bg={cardBg}
                shadow="md"
                _hover={hoverEffect}
              >
                <Heading size="sm" textTransform="uppercase" mb={2}>
                  {item.title}
                </Heading>
                {item.bullet_points.map((pt) => (
                  <Text pt={2} fontSize="md" key={pt}>
                    {pt}
                  </Text>
                ))}
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Box>
    </Flex>
  );
}

const _latestUpdates = [
  {
    title: "Latest software",
    bullet_points: [
      "Built with the latest thirdweb SDK (v5) and Next.js 14 (App router)",
    ],
  },
  {
    title: "Multi-chain",
    bullet_points: [
      "Seamlessly trade and browse items on bitrock",
      "New chains support coming soon",
    ],
  },
  {
    title: "Multiple collections supported",
    bullet_points: [
      "The PopMart supports multiple collections, you can view your owned NFTs and your listings",
      "If you own a project and want to sell on PopMart you can contact @PopCatDev on Telegram",
    ],
  },
  {
    title: "Upcoming features",
    bullet_points: [
      "Select different currencies (BROCK20) when creating listings",
    ],
  },
  {
    title: "Contribute",
    bullet_points: [
      "Contribute by donating to PopCat to help with development",
      "0x92a308892c4157823CF9CEf6fFb4578dCB1FF217",
    ],
  },
];
