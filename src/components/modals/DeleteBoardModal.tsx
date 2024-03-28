import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { Board } from "../../hooks/useBoards";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  board: Board | null;
  handleDeleteBoard: (_id: string) => Promise<void>;
}

const DeleteBoardModal = ({
  isOpen,
  onClose,
  board,
  handleDeleteBoard,
}: Props) => {
  const bgColor = useColorModeValue("white.800", "gray.700");

  const toast = useToast();

  const handleBoardDelete = () => {
    onClose();
    toast.promise(handleDeleteBoard(board?._id ?? ""), {
      success: { title: "Board deleted.", position: "bottom-right" },
      error: { title: "An error occured.", position: "bottom-right" },
      loading: { title: "Deleting board...", position: "bottom-right" },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent padding="1rem" width="30rem" maxW="full" bg={bgColor}>
        <ModalHeader fontWeight="bold" color="red.800">
          Delete this board?
        </ModalHeader>
        <ModalBody>
          <VStack>
            <Text color="gray.500" fontSize="0.85rem">
              Are you sure you want to delete the "{board?.name}" board? This
              action will remove all columns and tasks and cannot be reversed.
            </Text>
            <HStack width={"100%"}>
              <Button
                width="100%"
                bg="red.800"
                borderRadius="full"
                marginY="1rem"
                _hover={{ bg: "purple.500" }}
                onClick={handleBoardDelete}
              >
                Delete
              </Button>
              <Button
                bg="white"
                width="100%"
                borderRadius="full"
                _hover={{ bg: "white", color: "purple.700" }}
                onClick={onClose}
              >
                <Text color="purple.700">Cancel</Text>
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBoardModal;
