import { Grid, GridItem, Show } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import BoardDetails from "./components/BoardDetails";
import useBoards from "./hooks/useBoards";
import { useState } from "react";

function App() {
  const { boards, isLoading, createBoard, updateBoard, deleteBoard } =
    useBoards();
  const [selectedBoard, setSelectedBoard] = useState(0);

  const handleDeleteBoard = (_id: string) => {
    setSelectedBoard(0);
    return deleteBoard(_id);
  };

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "260px 1fr",
      }}
      templateRows="auto 1fr"
      height="100vh"
    >
      <GridItem area="nav" minH={"100%"}>
        <Navbar
          board={boards ? boards[selectedBoard] : null}
          isLoading={isLoading}
          updateBoard={updateBoard}
          handleDeleteBoard={handleDeleteBoard}
        />
      </GridItem>
      <Show above="lg">
        <GridItem
          area="aside"
          minHeight="100%"
          minWidth="100%"
          overflowY="scroll"
          css={{ "&::-webkit-scrollbar": { display: "none" } }}
        >
          <Sidebar
            boards={boards}
            selectedBoard={selectedBoard}
            setSelectedBoard={setSelectedBoard}
            isLoading={isLoading}
            createBoard={createBoard}
          />
        </GridItem>
      </Show>
      <GridItem
        area="main"
        minHeight="100%"
        minWidth="100%"
        overflowY="scroll"
        css={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        <BoardDetails
          board={boards ? boards[selectedBoard] : null}
          isLoading={isLoading}
          updateBoard={updateBoard}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
