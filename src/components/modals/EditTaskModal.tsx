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
import { useEffect, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  board: Board;
  task: Partial<Task>;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
}

const AddTaskModal = ({ isOpen, onClose, board, task, updateBoard }: Props) => {
  const taskNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const [subtasks, setSubtasks] = useState<string[]>();
  const toast = useToast();

  useEffect(() => {
    setSubtasks((task.subTasks || []).map((subtask) => subtask?.name || ""));
  }, [isOpen]);

  const handleInputChange = (index: number, value: string) => {
    let updatedSubtasks = [...(subtasks ?? [])];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    const updatedSubtasks = [...(subtasks ?? []), ""];
    setSubtasks(updatedSubtasks);
  };

  const handleRemoveSubtask = (index: number) => {
    const updatedSubtasks = [...(subtasks ?? [])];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const handleCloseModal = () => {
    setSubtasks((task.subTasks || []).map((subtask) => subtask?.name || "")); // Reset the state when modal is closed
    onClose(); // Call onClose to close the modal
  };

  const handleEditTask = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if any required field is empty
    if (
      !taskNameRef.current?.value ||
      !statusRef.current?.value ||
      subtasks?.some((subtask) => !subtask)
    ) {
      toast({
        title: "Required fields are empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newSubtasks: Partial<SubTask>[] | null = subtasks
      ? subtasks.map((subtask) => ({ name: subtask }))
      : null;

    let updatedTasks = [...board.tasks]; // Create a copy of the tasks array

    const editedTaskIndex = updatedTasks.findIndex((t) => t._id === task._id); // Find the index of the task to edit

    if (editedTaskIndex !== -1) {
      // If the task to edit exists in the board
      updatedTasks[editedTaskIndex] = {
        ...updatedTasks[editedTaskIndex], // Maintain the existing properties
        name: taskNameRef.current?.value || "", // Update the name
        subTasks: newSubtasks
          ? newSubtasks.map((subtask, index) => ({
              ...task.subTasks?.[index], // Retain the _id and isDone properties if available
              ...subtask,
            }))
          : [], // Update the subtasks
        currentStatus: statusRef.current?.value || "", // Update the current status
        description: descriptionRef.current?.value || "", // Update the description
      };

      const tempBoard: Partial<Board> = {
        ...board,
        tasks: updatedTasks, // Update the tasks array with the edited task
      };

      onClose();
      toast.promise(updateBoard(tempBoard, board._id), {
        success: { title: "Board updated.", position: "top-right" },
        error: { title: "An error occurred.", position: "top-right" },
        loading: { title: "Updating board...", position: "top-right" },
      });
    } else {
      toast({
        title: "Task not found.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent padding="0.5rem" width="30rem" maxW="full">
        <ModalHeader fontWeight="bold">Edit Task</ModalHeader>
        <ModalBody>
          <VStack>
            <FormControl isRequired>
              <FormLabel>Task Name</FormLabel>
              <Input
                placeholder="e.g. Take a coffee break"
                ref={taskNameRef}
                required
                defaultValue={task.name}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                defaultValue={task.description}
                ref={descriptionRef}
                onChange={() => {}}
                resize="vertical"
                minHeight="10rem"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Subtasks</FormLabel>
              {subtasks?.map((subtask, index) => {
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
              <Select ref={statusRef} defaultValue={task.currentStatus}>
                {board.columns.map((column, index) => (
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
              onClick={handleEditTask}
            >
              Save Task
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
