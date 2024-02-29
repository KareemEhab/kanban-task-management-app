import { Grid, GridItem, Show } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import BoardDetails from "./components/BoardDetails";
import useBoards from "./hooks/useBoards";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

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
        md: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        md: `${showSidebar ? "260px " : "0"} 1fr`,
      }}
      templateRows="auto 1fr"
      height="100vh"
    >
      <GridItem area="nav" minH="100%" maxW="100%" overflow="hidden">
        <Navbar
          board={boards ? boards[selectedBoard] : null}
          isLoading={isLoading}
          updateBoard={updateBoard}
          handleDeleteBoard={handleDeleteBoard}
          boards={boards}
          selectedBoard={selectedBoard}
          setSelectedBoard={setSelectedBoard}
          createBoard={createBoard}
        />
      </GridItem>
      <Show above="md">
        <GridItem area="aside" minHeight="100%" minWidth="100%">
          <Sidebar
            boards={boards}
            selectedBoard={selectedBoard}
            setSelectedBoard={setSelectedBoard}
            isLoading={isLoading}
            createBoard={createBoard}
            toggleSidebar={toggleSidebar}
            showSidebar={showSidebar}
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
