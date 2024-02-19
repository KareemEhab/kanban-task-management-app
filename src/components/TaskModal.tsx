import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  VStack,
  FormControl,
  FormLabel,
  Text,
  useToast,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { Board, Task, SubTask } from "../hooks/useBoards";
import { useEffect, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  board: Board;
  task: Partial<Task>;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
}

const TaskModal = ({ isOpen, onClose, board, task, updateBoard }: Props) => {
  const statusRef = useRef<HTMLSelectElement>(null);
  const [subtasks, setSubtasks] = useState<Partial<SubTask>[]>();
  const toast = useToast();

  useEffect(() => {
    setSubtasks(task.subTasks);
  }, []);

  const handleCloseModal = () => {
    const updatedTasks: Partial<Task>[] = board.tasks
      .map((currentTask) => {
        if (currentTask._id === task._id)
          return {
            ...currentTask,
            subTasks: subtasks,
            currentStatus: statusRef.current?.value,
          };
        return currentTask; // Return the unchanged task if the condition doesn't match
      })
      .filter((task): task is Partial<Task> => task !== undefined);

    const updatedBoard: Board = { ...board, tasks: updatedTasks };
    onClose();
    if (JSON.stringify(board) !== JSON.stringify(updatedBoard))
      toast.promise(updateBoard(updatedBoard, board._id), {
        success: { title: "Changes saved.", position: "top-right" },
        error: { title: "An error has occured", position: "top-right" },
        loading: { title: "Saving changes...", position: "top-right" },
      });

    onClose(); // Call onClose to close the modal
  };

  const handleCheckboxChange = (subTaskId: string | undefined) => {
    if (!subtasks) return;

    const updatedSubtasks = subtasks.map((subTask) => {
      if (subTask._id === subTaskId)
        return { ...subTask, isDone: !subTask.isDone };
      return subTask;
    });

    setSubtasks(updatedSubtasks);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent padding="0.75rem" width="30rem" maxW="full">
        <ModalHeader fontWeight="bold">Add New Task</ModalHeader>
        <ModalBody>
          <VStack>
            <FormControl>
              <FormLabel color="gray.500" fontSize="0.9rem">
                Subtasks ({subtasks?.filter((subtask) => subtask.isDone).length}{" "}
                of {subtasks?.length})
              </FormLabel>
              {subtasks?.map((subTask) => (
                <Checkbox
                  key={subTask._id}
                  defaultChecked={subTask.isDone}
                  bg="gray.900"
                  width="100%"
                  padding="0.75rem"
                  borderRadius="0.25rem"
                  colorScheme="purple"
                  marginBottom="0.5rem"
                  onChange={() => handleCheckboxChange(subTask._id)}
                >
                  <Text
                    marginLeft="0.4rem"
                    fontSize="0.75rem"
                    fontWeight="bold"
                    color={subTask.isDone ? "gray" : "white"}
                    textDecoration={subTask.isDone ? "line-through" : "none"}
                  >
                    {subTask.name}
                  </Text>
                </Checkbox>
              ))}
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
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
