import { Text, VStack } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import { Board, Task } from "../hooks/useBoards";

interface Props {
  board: Board;
  tasks: Partial<Task>[];
  columnName: string;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
}

const Column = ({ board, tasks, columnName, updateBoard }: Props) => {
  return (
    <VStack height="100%" align="left" gap={4} minW="17.5rem">
      <Text color="gray.400" fontWeight="bold">
        {columnName} ({tasks.length})
      </Text>
      <VStack gap={5} paddingBottom="4rem">
        {tasks.map((task) => {
          return (
            <TaskCard
              key={task._id}
              board={board}
              task={task}
              updateBoard={updateBoard}
            />
          );
        })}
      </VStack>
    </VStack>
  );
};

export default Column;
