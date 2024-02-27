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
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Board, Task, SubTask } from "../../hooks/useBoards";
import { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import DeleteTaskModal from "./DeleteTaskModal";
import EditTaskModal from "./EditTaskModal";

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

  const {
    isOpen: isEditTaskOpen,
    onOpen: onEditTaskOpen,
    onClose: onEditTaskClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteTaskOpen,
    onOpen: onDeleteTaskOpen,
    onClose: onDeleteTaskClose,
  } = useDisclosure();

  useEffect(() => {
    setSubtasks(task.subTasks);
  }, [isOpen, board]);

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
        success: { title: "Changes saved.", position: "bottom-right" },
        error: { title: "An error has occured.", position: "bottom-right" },
        loading: { title: "Saving changes...", position: "bottom-right" },
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
        <HStack>
          <ModalHeader fontWeight="bold" flex="1">
            {task?.name}
          </ModalHeader>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<CiMenuKebab />}
              bg="gray.700"
              fontSize="1.5rem"
            />
            <MenuList>
              <MenuItem
                color="gray.500"
                fontWeight="bold"
                onClick={onEditTaskOpen}
              >
                Edit Task
              </MenuItem>
              <MenuItem
                color="red.500"
                fontWeight="bold"
                onClick={onDeleteTaskOpen}
              >
                Delete Task
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <ModalBody>
          <VStack>
            <FormControl>
              <Text
                fontSize="0.8rem"
                color="gray.500"
                marginTop="0.5rem"
                marginBottom="2rem"
              >
                {task?.description}
              </Text>
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
          <DeleteTaskModal
            isOpen={isDeleteTaskOpen}
            onClose={onDeleteTaskClose}
            board={board}
            task={task}
            updateBoard={updateBoard}
          />
          <EditTaskModal
            isOpen={isEditTaskOpen}
            onClose={onEditTaskClose}
            board={board}
            task={task}
            updateBoard={updateBoard}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
