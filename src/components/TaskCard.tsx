import { Card, CardBody, Text } from "@chakra-ui/react";
import { Task } from "../hooks/useBoards";

interface Props {
  task: Partial<Task>;
}

const TaskCard = ({ task }: Props) => {
  return (
    <Card
      width="17.5rem"
      paddingBottom="0.25rem"
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
    </Card>
  );
};

export default TaskCard;
