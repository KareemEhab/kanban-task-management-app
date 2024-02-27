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
} from "@chakra-ui/react";
import { Board, Task } from "../../hooks/useBoards";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  board: Board;
  task: Partial<Task>;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
}

const DeleteTaskModal = ({
  isOpen,
  onClose,
  board,
  task,
  updateBoard,
}: Props) => {
  const toast = useToast();

  const handleTaskDelete = () => {
    const updatedBoard: Partial<Board> = {
      ...board,
      tasks: [
        ...board.tasks.filter((currentTask) => currentTask._id !== task._id),
      ],
    };
    onClose();
    toast.promise(updateBoard(updatedBoard, board._id), {
      success: { title: "Task deleted.", position: "bottom-right" },
      error: { title: "An error occured.", position: "bottom-right" },
      loading: { title: "Deleting task...", position: "bottom-right" },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent padding="1rem" width="30rem" maxW="full">
        <ModalHeader fontWeight="bold" color="red.800">
          Delete this task?
        </ModalHeader>
        <ModalBody>
          <VStack>
            <Text color="gray.500" fontSize="0.85rem">
              Are you sure you want to delete the "{task?.name}" task and its
              subtasks? This action cannot be reversed.
            </Text>
            <HStack width={"100%"}>
              <Button
                width="100%"
                bg="red.800"
                borderRadius="full"
                marginY="1rem"
                _hover={{ bg: "purple.500" }}
                onClick={handleTaskDelete}
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

export default DeleteTaskModal;
