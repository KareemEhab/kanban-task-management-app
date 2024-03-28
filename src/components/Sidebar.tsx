import {
  Box,
  Skeleton,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarBtn from "./SidebarBtn";
import { CiGrid32 } from "react-icons/ci";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import AddBoardModal from "./modals/AddBoardModal";
import { Board } from "../hooks/useBoards";
import SidebarLightModeSwitch from "./SidebarLightModeSwitch";

interface Props {
  boards: Board[] | null;
  isLoading: boolean;
  selectedBoard: number;
  setSelectedBoard: (index: number) => void;
  createBoard: (board: Partial<Board>) => Promise<void>;
  toggleSidebar: () => void;
  showSidebar: boolean;
}

const Sidebar = ({
  boards,
  isLoading,
  selectedBoard,
  setSelectedBoard,
  createBoard,
  toggleSidebar,
  showSidebar,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue("white.800", "gray.700");

  return (
    <VStack minHeight="100%" justify="space-between" width="100%" bg={bgColor}>
      <Box width="100%" overflow="hidden">
        {showSidebar && (
          <Text color="gray.400" marginTop="1.5rem" paddingLeft="1.5rem">
            ALL BOARDS ({isLoading ? 0 : boards?.length})
          </Text>
        )}
        <VStack
          minW="100%"
          maxH="38rem"
          paddingRight="1.5rem"
          marginTop="1.5rem"
          gap={0}
          overflowY="auto"
        >
          {boards?.map((board, index) => {
            return (
              <SidebarBtn
                key={board._id}
                color="gray.400"
                icon={CiGrid32}
                isSelected={selectedBoard === index}
                onClick={() => {
                  setSelectedBoard(index);
                }}
              >
                {board.name}
              </SidebarBtn>
            );
          })}
          {isLoading && (
            <>
              <Skeleton
                width="100%"
                height="3rem"
                borderRadius="full"
                borderTopLeftRadius="0"
                borderBottomLeftRadius="0"
              />
            </>
          )}
          {!isLoading && (
            <SidebarBtn
              color="purple.800"
              icon={CiGrid32}
              isSelected={false}
              onClick={onOpen}
            >
              + Create New Board
            </SidebarBtn>
          )}
          <AddBoardModal
            isOpen={isOpen}
            onClose={onClose}
            createBoard={createBoard}
          />
        </VStack>
      </Box>
      <Box width="100%" marginBottom="1.5rem">
        <SidebarLightModeSwitch />
        <Box width="100%" paddingRight="1.5rem" overflow="visible">
          <SidebarBtn
            color="gray.400"
            icon={showSidebar ? BiSolidHide : BiSolidShow}
            isSelected={false}
            onClick={toggleSidebar}
          >
            Hide Sidebar
          </SidebarBtn>
        </Box>
      </Box>
    </VStack>
  );
};

export default Sidebar;
