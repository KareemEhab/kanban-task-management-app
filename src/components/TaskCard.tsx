import { Card, CardBody, Text, useDisclosure } from "@chakra-ui/react";
import { Board, Task } from "../hooks/useBoards";
import TaskModal from "./modals/TaskModal";

interface Props {
  board: Board;
  task: Partial<Task>;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
}

const TaskCard = ({ board, task, updateBoard }: Props) => {
  const {
    isOpen: isTaskOpen,
    onOpen: onTaskOpen,
    onClose: onTaskClose,
  } = useDisclosure();

  return (
    <Card
      width="17.5rem"
      paddingBottom="0.25rem"
      onClick={onTaskOpen}
      _hover={{
        cursor: "pointer",
        "& .button-text": {
          color: "purple.800",
        },
      }}
    >
      <CardBody userSelect="none">
        <Text className="button-text" fontWeight="bold" marginBottom="0.25rem">
          {task.name}
        </Text>
        <Text fontSize="0.8rem" fontWeight="bold" color="gray.400">
          {task.subTasks?.filter((subTask) => subTask.isDone === true).length}{" "}
          of {task.subTasks?.length} subtasks
        </Text>
      </CardBody>
      <TaskModal
        isOpen={isTaskOpen}
        onClose={onTaskClose}
        board={board}
        task={task}
        updateBoard={updateBoard}
      />
    </Card>
  );
};

export default TaskCard;
