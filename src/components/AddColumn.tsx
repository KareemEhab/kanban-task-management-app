import {
  Box,
  VStack,
  Text,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import AddColumnModal from "./modals/AddColumnModal";
import { Board } from "../hooks/useBoards";

interface Props {
  board: Board | null;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
}

const AddColumn = ({ board, updateBoard }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white.600", "gray.750");

  return (
    <Box height="100%" paddingY="2.4rem" userSelect="none" onClick={onOpen}>
      <VStack
        height="100%"
        width="17.5rem"
        bg={bgColor}
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
      <AddColumnModal
        isOpen={isOpen}
        onClose={onClose}
        board={board}
        updateBoard={updateBoard}
      />
    </Box>
  );
};

export default AddColumn;
