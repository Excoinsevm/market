import { NFT_CONTRACTS, type NftContract } from "@/consts/nft_contracts";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  selectedCollection: NftContract;
  setSelectedCollection: Dispatch<SetStateAction<NftContract>>;
};

export function ProfileMenu(props: Props) {
  const { selectedCollection, setSelectedCollection } = props;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCollections = NFT_CONTRACTS.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Accordion allowToggle w={{ lg: "300px", base: "90vw" }}>
        <AccordionItem border="none">
          <AccordionButton
            _expanded={{ bg: "teal.100", color: "teal.800" }}
            borderRadius="md"
            py={4}
          >
            <Box as="span" flex="1" textAlign="left" fontWeight="bold">
              Collections
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} p={2}>
            <Input
              placeholder="Search collections"
              mb={4}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              borderRadius="md"
            />
            {filteredCollections.map((item) => (
              <Button
                key={item.address}
                variant="ghost"
                h="56px"
                mb={3}
                borderRadius="md"
                onClick={() => setSelectedCollection(item)}
                w="full"
                justifyContent="flex-start"
                _hover={{ bg: "teal.50" }}
                _active={{ bg: "teal.100" }}
                opacity={item.address === selectedCollection.address ? 1 : 0.6}
              >
                <Flex direction="row" gap={3} align="center">
                  <Image src={item.thumbnailUrl ?? ""} w="40px" borderRadius="md" />
                  <Text>{item.title ?? "Unknown collection"}</Text>
                </Flex>
              </Button>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
