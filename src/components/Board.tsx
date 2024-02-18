import { HStack } from "@chakra-ui/react";
import Column from "./Column";
import AddColumn from "./AddColumn";
import { Board } from "../hooks/useBoards";

interface Props {
  board: Board;
  isLoading: boolean;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
}

const BoardDetails = ({ board, isLoading, updateBoard }: Props) => {
  if (isLoading) return null;
  if (!board) return null;

  return (
    <HStack
      height="100%"
      width="100%"
      paddingTop="1.5rem"
      paddingLeft="1.5rem"
      gap={6}
    >
      {board.columns.map((column) => {
        return (
          <Column
            key={column}
            tasks={board.tasks.filter((task) => task.currentStatus === column)}
            boardName={column}
          />
        );
      })}

      <AddColumn board={board} updateBoard={updateBoard} />
    </HStack>
  );
};

export default BoardDetails;
