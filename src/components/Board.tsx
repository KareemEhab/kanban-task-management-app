import { HStack } from "@chakra-ui/react";
import Column from "./Column";
import AddColumn from "./AddColumn";

const Board = () => {
  return (
    <HStack
      height="100%"
      width="100%"
      paddingTop="1.5rem"
      paddingLeft="1.5rem"
      gap={6}
    >
      <Column />
      <Column />
      <Column />
      <AddColumn />
    </HStack>
  );
};

export default Board;
