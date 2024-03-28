import { HStack, useColorModeValue } from "@chakra-ui/react";
import Column from "./Column";
import AddColumn from "./AddColumn";
import { Board } from "../hooks/useBoards";
import SkeletonColumn from "./SkeletonColumn";

interface Props {
  board: Board | null;
  isLoading: boolean;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
}

const BoardDetails = ({ board, isLoading, updateBoard }: Props) => {
  const bgColor = useColorModeValue("white.700", "gray.800");

  return (
    <HStack
      height="100%"
      width="100%"
      paddingTop="1.5rem"
      paddingLeft="1.5rem"
      gap={6}
      bg={bgColor}
    >
      {isLoading && <SkeletonColumn />}
      {isLoading && <SkeletonColumn />}
      {isLoading && <SkeletonColumn />}

      {board?.columns.map((column) => (
        <Column
          key={column}
          board={board}
          tasks={board.tasks.filter((task) => task.currentStatus === column)}
          columnName={column}
          updateBoard={updateBoard}
        />
      ))}

      {!isLoading && board && (
        <AddColumn board={board} updateBoard={updateBoard} />
      )}
    </HStack>
  );
};

export default BoardDetails;
