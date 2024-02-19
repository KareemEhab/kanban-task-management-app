import {
  Box,
  HStack,
  Switch,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { WiDaySunny } from "react-icons/wi";
import { MdDarkMode } from "react-icons/md";
import SidebarBtn from "./SidebarBtn";
import { CiGrid32 } from "react-icons/ci";
import { BiSolidHide } from "react-icons/bi";
import AddBoardModal from "./AddBoardModal";
import { Board } from "../hooks/useBoards";

interface Props {
  boards: Board[] | null;
  isLoading: boolean;
  selectedBoard: number;
  setSelectedBoard: (index: number) => void;
  createBoard: (board: Partial<Board>) => Promise<void>;
}

const Sidebar = ({
  boards,
  isLoading,
  selectedBoard,
  setSelectedBoard,
  createBoard,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode, colorMode } = useColorMode();

  if (isLoading) return;
  return (
    <VStack minHeight="100%" justify="space-between" width="100%" bg="gray.700">
      <Box width="100%">
        <Text color="gray.400" marginTop="1.5rem" paddingLeft="1.5rem">
          ALL BOARDS (2)
        </Text>
        <VStack minW="100%" paddingRight="1.5rem" marginTop="1.5rem" gap={0}>
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
          <SidebarBtn
            color="purple.800"
            icon={CiGrid32}
            isSelected={false}
            onClick={onOpen}
          >
            + Create New Board
          </SidebarBtn>
          <AddBoardModal
            isOpen={isOpen}
            onClose={onClose}
            createBoard={createBoard}
          />
        </VStack>
      </Box>
      <Box width="100%" marginBottom="1.5rem">
        <HStack justify="center" width="100%" padding="1rem">
          <HStack
            width="100%"
            paddingY="0.6rem"
            justify="center"
            bg="gray.800"
            gap="1.5rem"
            borderRadius={5}
          >
            <Text fontSize="1.8rem">
              <WiDaySunny />
            </Text>
            <Switch
              colorScheme="purple"
              defaultChecked
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
            />
            <Text fontSize="1.5rem">
              <MdDarkMode />
            </Text>
          </HStack>
        </HStack>
        <Box width="100%" paddingRight="1.5rem">
          <SidebarBtn
            color="gray.400"
            icon={BiSolidHide}
            isSelected={false}
            onClick={() => {}}
          >
            Hide Sidebar
          </SidebarBtn>
        </Box>
      </Box>
    </VStack>
  );
};

export default Sidebar;
