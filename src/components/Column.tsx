import { Text, VStack } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import { Task } from "../hooks/useBoards";

interface Props {
  tasks: Task[];
  boardName: string;
}

const Column = ({ tasks, boardName }: Props) => {
  return (
    <VStack height="100%" align="left" gap={4} minW="17.5rem">
      <Text color="gray.400">
        {boardName} ({tasks.length})
      </Text>
      <VStack gap={5} paddingBottom="4rem">
        {tasks.map((task) => {
          return <TaskCard key={task._id} task={task} />;
        })}
      </VStack>
    </VStack>
  );
};

export default Column;
