import { HStack, Spinner } from "@chakra-ui/react";
import Column from "./Column";
import AddColumn from "./AddColumn";
import { Board } from "../hooks/useBoards";

interface Props {
  board: Board | null;
  isLoading: boolean;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
}

const BoardDetails = ({ board, isLoading, updateBoard }: Props) => {
  return (
    <HStack
      height="100%"
      width="100%"
      paddingTop="1.5rem"
      paddingLeft="1.5rem"
      gap={6}
    >
      {(isLoading || !board) && <Spinner />}
      {board?.columns.map((column) => {
        return (
          <Column
            key={column}
            board={board}
            tasks={board.tasks.filter((task) => task.currentStatus === column)}
            columnName={column}
            updateBoard={updateBoard}
          />
        );
      })}

      <AddColumn board={board} updateBoard={updateBoard} />
    </HStack>
  );
};

export default BoardDetails;
