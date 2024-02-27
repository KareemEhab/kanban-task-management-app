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
  Textarea,
  Select,
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import { Board, Task, SubTask } from "../../hooks/useBoards";
import { useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  board: Board | null;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
}

const AddTaskModal = ({ isOpen, onClose, board, updateBoard }: Props) => {
  const taskNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const [subtasks, setSubtasks] = useState(["", ""]);
  const toast = useToast();

  const handleInputChange = (index: number, value: string) => {
    let updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    const updatedColumns = [...subtasks, ""];
    setSubtasks(updatedColumns);
  };

  const handleRemoveSubtask = (index: number) => {
    const updatedColumns = [...subtasks];
    updatedColumns.splice(index, 1);
    setSubtasks(updatedColumns);
  };

  const handleCloseModal = () => {
    setSubtasks(["", ""]); // Reset the state when modal is closed
    onClose(); // Call onClose to close the modal
  };

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if any required field is empty
    if (
      !taskNameRef.current?.value ||
      !statusRef.current?.value ||
      subtasks.some((subtask) => !subtask)
    ) {
      toast({
        title: "Required fields are empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newSubtasks: Partial<SubTask>[] = subtasks.map((subtask) => {
      return { name: subtask };
    });

    let newTask: Partial<Task> = {
      name: taskNameRef.current?.value || "",
      subTasks: newSubtasks,
      currentStatus: statusRef.current?.value || "",
    };

    if (descriptionRef.current?.value) {
      newTask = {
        ...newTask,
        description: descriptionRef.current.value,
      };
    }

    const tempBoard: Partial<Board> = {
      ...board,
      tasks: [...(board?.tasks ?? []), newTask],
    };
    onClose();
    toast.promise(updateBoard(tempBoard, board?._id ?? ""), {
      success: { title: "Board updated.", position: "bottom-right" },
      error: { title: "An error occured.", position: "bottom-right" },
      loading: { title: "Updating board...", position: "bottom-right" },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent padding="0.5rem" width="30rem" maxW="full">
        <ModalHeader fontWeight="bold">Add New Task</ModalHeader>
        <ModalBody>
          <VStack>
            <FormControl isRequired>
              <FormLabel>Task Name</FormLabel>
              <Input
                placeholder="e.g. Take a coffee break"
                ref={taskNameRef}
                onChange={() => {}}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                ref={descriptionRef}
                onChange={() => {}}
                resize="vertical"
                minHeight="10rem"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Subtasks</FormLabel>
              {subtasks.map((subtask, index) => {
                return (
                  <HStack key={index}>
                    <Input
                      value={subtask}
                      key={index}
                      marginBottom={3}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      fontSize="0.8rem"
                      required
                    />
                    <Box onClick={() => handleRemoveSubtask(index)}>
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
                onClick={handleAddSubtask}
              >
                <Text color="purple.700">+ Add New Subtask</Text>
              </Button>
            </FormControl>
            <FormControl marginTop="1rem">
              <FormLabel>Current Status</FormLabel>
              <Select ref={statusRef}>
                {board?.columns.map((column, index) => (
                  <option key={index} value={column}>
                    {column}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              width="100%"
              bg="purple.800"
              borderRadius="full"
              marginY="1rem"
              _hover={{ bg: "purple.500" }}
              onClick={handleAddTask}
            >
              Create Task
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
