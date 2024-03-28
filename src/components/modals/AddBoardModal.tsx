import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Box,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import { useRef, useState } from "react";
import { Board } from "../../hooks/useBoards";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  createBoard: (board: Partial<Board>) => Promise<void>;
}

const AddBoardModal = ({ isOpen, onClose, createBoard }: Props) => {
  const bgColor = useColorModeValue("white.800", "gray.700");

  const boardName = useRef<HTMLInputElement>(null);
  const [columns, setColumns] = useState(["TODO", "DOING"]);
  const toast = useToast();

  const handleInputChange = (index: number, value: string) => {
    let updatedColumns = [...columns];
    updatedColumns[index] = value;
    setColumns(updatedColumns);
  };

  const handleAddColumn = () => {
    const updatedColumns = [...columns, ""];
    setColumns(updatedColumns);
  };

  const handleRemoveColumn = (index: number) => {
    const updatedColumns = [...columns];
    updatedColumns.splice(index, 1);
    setColumns(updatedColumns);
  };

  const handleCloseModal = () => {
    setColumns(["TODO", "DOING"]); // Reset the state when modal is closed
    onClose(); // Call onClose to close the modal
  };

  const handleCreateBoard = () => {
    const board: Partial<Board> = {
      name: boardName.current?.value || "",
      columns: columns,
    };
    onClose();
    toast.promise(createBoard(board), {
      success: { title: "Board created.", position: "bottom-right" },
      error: { title: "An error occured.", position: "bottom-right" },
      loading: { title: "Creating board...", position: "bottom-right" },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent padding="0.5rem" width="30rem" maxW="full" bg={bgColor}>
        <ModalHeader fontWeight="bold">Add new board</ModalHeader>
        <ModalBody>
          <VStack>
            <FormControl>
              <FormLabel>Board Name</FormLabel>
              <Input placeholder="e.g. Web Design" ref={boardName} required />
            </FormControl>
            <FormControl>
              <FormLabel>Board Columns</FormLabel>
              {columns.map((column, index) => {
                return (
                  <HStack key={index}>
                    <Input
                      value={column}
                      key={index}
                      marginBottom={3}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      fontSize="0.8rem"
                    />
                    <Box onClick={() => handleRemoveColumn(index)}>
                      <MdCancel />
                    </Box>
                  </HStack>
                );
              })}
              <Button
                bg="white"
                width="100%"
                borderRadius="full"
                _hover={{ bg: "white", color: "purple.700" }}
                onClick={handleAddColumn}
              >
                <Text color="purple.700">+ Add New Column</Text>
              </Button>
            </FormControl>
            <Button
              width="100%"
              bg="purple.800"
              borderRadius="full"
              marginY="1rem"
              _hover={{ bg: "purple.500" }}
              onClick={handleCreateBoard}
            >
              Create New Board
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddBoardModal;
