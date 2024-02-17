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
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddBoardModal = ({ isOpen, onClose }: Props) => {
  const [columns, setColumns] = useState(["TODO", "DOING"]);

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new board</ModalHeader>
        <ModalBody>
          <VStack>
            <FormControl>
              <FormLabel>Board Name</FormLabel>
              <Input placeholder="e.g. Web Design" />
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
              bg="purple.700"
              borderRadius="full"
              marginY="1rem"
              _hover={{ bg: "purple.500" }}
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
