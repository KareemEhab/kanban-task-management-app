import { Card, CardBody, Text } from "@chakra-ui/react";

const TaskCard = () => {
  return (
    <Card
      width="17.5rem"
      paddingY="0.25rem"
      _hover={{
        cursor: "pointer",
        "& .button-text": {
          color: "purple.800",
        },
      }}
    >
      <CardBody userSelect="none">
        <Text className="button-text" fontWeight="bold">
          Build UI for onboarding flow
        </Text>
        <Text fontSize="0.8rem" fontWeight="bold" color="gray.400">
          1 of 3 subtasks
        </Text>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
