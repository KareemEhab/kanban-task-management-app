import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import BoardDetails from "./components/BoardDetails";
import useBoards from "./hooks/useBoards";
import { useState } from "react";

function App() {
  const { boards, isLoading, createBoard, updateBoard, deleteBoard } =
    useBoards();
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true); // State to control sidebar visibility

  const handleDeleteBoard = (_id: string) => {
    setSelectedBoard(0);
    return deleteBoard(_id);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: `${showSidebar ? "260px " : "0"} 1fr`,
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
      <GridItem area="aside" minHeight="100%" minWidth="100%">
        <Sidebar
          boards={boards}
          selectedBoard={selectedBoard}
          setSelectedBoard={setSelectedBoard}
          isLoading={isLoading}
          createBoard={createBoard}
          toggleSidebar={toggleSidebar}
        />
      </GridItem>
      <GridItem area="main" minHeight="100%" minWidth="100%" overflowY="scroll">
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
