import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";
import { Board } from "../hooks/useBoards";
import AddTaskModal from "./AddTaskModal";

interface Props {
  board: Board;
  isLoading: boolean;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
}

const Navbar = ({ board, isLoading, updateBoard }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) return null;
  if (!board) return null;

  return (
    <HStack minW="100%" minH="100%" bg="gray.700" padding="1rem">
      <Image />
      <Text fontSize="2rem" fontWeight="bold">
        kanban
      </Text>
      <HStack flex="1" justify="space-between" ml="9rem">
        <Text fontSize="1.5rem" fontWeight="bold">
          {board.name}
        </Text>
        <Box>
          <Button
            borderRadius="full"
            padding="1.5rem"
            bg="purple.800"
            onClick={onOpen}
          >
            + Add New Task
          </Button>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<CiMenuKebab />}
              bg="gray.700"
              fontSize="1.5rem"
            />
            <MenuList>
              <MenuItem>Menu 1</MenuItem>
              <MenuItem>New Window</MenuItem>
              <MenuItem>Open Closed Tab</MenuItem>
              <MenuItem>Open File</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
      <AddTaskModal
        isOpen={isOpen}
        onClose={onClose}
        board={board}
        updateBoard={updateBoard}
      />
    </HStack>
  );
};

export default Navbar;
