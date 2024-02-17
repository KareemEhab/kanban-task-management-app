import { Box, VStack, Text } from "@chakra-ui/react";

const AddColumn = () => {
  return (
    <Box height="100%" paddingY="2.4rem" userSelect="none">
      <VStack
        height="100%"
        width="17.5rem"
        bg="gray.750"
        justify="center"
        align="center"
        _hover={{
          cursor: "pointer",
          "& .button-text": {
            color: "purple.800",
          },
        }}
      >
        <Text
          className="button-text"
          fontSize="1.5rem"
          fontWeight="bold"
          color="gray.400"
        >
          + New Column
        </Text>
      </VStack>
    </Box>
  );
};

export default AddColumn;
