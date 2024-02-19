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
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import { Board } from "../hooks/useBoards";
import { useEffect, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  board: Board | null;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
}

const AddColumnModal = ({ isOpen, onClose, board, updateBoard }: Props) => {
  const boardName = useRef<HTMLInputElement>(null);
  const [columns, setColumns] = useState(board?.columns);
  const toast = useToast();

  useEffect(() => {
    setColumns(board?.columns || []);
  }, [isOpen, board?.columns]);

  const handleInputChange = (index: number, value: string) => {
    let updatedColumns = [...(columns ?? [])];
    updatedColumns[index] = value;
    setColumns(updatedColumns);
  };

  const handleAddColumn = () => {
    const updatedColumns = [...(columns ?? []), ""];
    setColumns(updatedColumns);
  };

  const handleRemoveColumn = (index: number) => {
    const updatedColumns = [...(columns ?? [])];
    updatedColumns.splice(index, 1);
    setColumns(updatedColumns);
  };

  const handleCloseModal = () => {
    setColumns(board?.columns); // Reset the state when modal is closed
    onClose(); // Call onClose to close the modal
  };

  const handleUpdateBoard = () => {
    const tempBoard: Partial<Board> = {
      name: boardName.current?.value || "",
      columns: columns ?? [],
    };

    onClose();

    if (board && board._id) {
      toast.promise(updateBoard(tempBoard, board._id), {
        success: { title: "Board updated", position: "top-right" },
        error: { title: "An error occurred", position: "top-right" },
        loading: { title: "Updating board...", position: "top-right" },
      });
    } else {
      // Handle the case where board or board._id is undefined
      console.error("Board or board ID is undefined");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent padding="0.5rem" width="30rem" maxW="full">
        <ModalHeader fontWeight="bold">Edit board</ModalHeader>
        <ModalBody>
          <VStack>
            <FormControl>
              <FormLabel>Board Name</FormLabel>
              <Input
                value={board?.name}
                placeholder="e.g. Web Design"
                ref={boardName}
                onChange={() => {}}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Board Columns</FormLabel>
              {columns?.map((column, index) => {
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
              onClick={handleUpdateBoard}
            >
              Save Board
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddColumnModal;
