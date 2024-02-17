import { Text, VStack } from "@chakra-ui/react";
import TaskCard from "./TaskCard";

const Column = () => {
  return (
    <VStack height="100%" align="left" gap={4}>
      <Text color="gray.400">TODO (4)</Text>
      <VStack gap={5} paddingBottom="4rem">
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </VStack>
    </VStack>
  );
};

export default Column;
