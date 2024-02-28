import { Spinner, VStack } from "@chakra-ui/react";
import SkeletonTask from "./SkeletonTask";

const SkeletonColumn = () => {
  return (
    <VStack height="100%" align="left" gap={6} minW="17.5rem">
      <Spinner />
      <SkeletonTask />
      <SkeletonTask />
      <SkeletonTask />
      <SkeletonTask />
    </VStack>
  );
};

export default SkeletonColumn;
