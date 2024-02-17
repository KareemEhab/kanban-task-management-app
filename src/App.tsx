import { Grid, GridItem, Show } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Board from "./components/Board";

function App() {
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
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem
          area="aside"
          minHeight="100%"
          minWidth="100%"
          overflowY="scroll"
          css={{ "&::-webkit-scrollbar": { display: "none" } }}
        >
          <Sidebar />
        </GridItem>
      </Show>
      <GridItem
        area="main"
        minHeight="100%"
        minWidth="100%"
        overflowY="scroll"
        css={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        <Board />
      </GridItem>
    </Grid>
  );
}

export default App;
