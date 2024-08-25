import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  Flex,
  Text,
} from "@chakra-ui/react";

type Attribute = {
  trait_type?: string;
  value?: string | number | object;
};

export function NftAttributes({
  attributes,
}: {
  attributes: Attribute[];
}) {
  // Filter attributes to get items with 'trait_type'
  const items = attributes.filter(
    (item) => item.trait_type !== undefined
  );

  return (
    <AccordionItem border="none">
      <AccordionButton
        _expanded={{ bg: "gray.100", color: "blue.600" }}
        borderRadius="md"
        px={4}
        py={3}
        _hover={{ bg: "gray.200" }}
      >
        <Box as="span" flex="1" textAlign="left" fontWeight="bold">
          Traits
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} px={4}>
        <Flex direction="row" wrap="wrap" gap="4">
          {items.map((item, index) => (
            <Card
              key={index} // Use index as key
              as={Flex}
              flexDir="column"
              gap={3}
              py={3}
              px={4}
              bg="white"
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"
              boxShadow="sm"
            >
              {item.trait_type && (
                <Text
                  fontSize="sm"
                  textAlign="center"
                  fontWeight="medium"
                  color="gray.700"
                >
                  {item.trait_type}
                </Text>
              )}
              <Text
                fontSize="md"
                textAlign="center"
                fontWeight="bold"
                color="gray.800"
              >
                {typeof item.value === "object"
                  ? JSON.stringify(item.value, null, 2) // Format JSON with indentation
                  : item.value?.toString() ?? "N/A"} {/* Ensure item.value is a string */}
              </Text>
            </Card>
          ))}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}
