import {
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
import AddTaskModal from "./modals/AddTaskModal";
import AddColumnModal from "./modals/AddColumnModal";
import DeleteBoardModal from "./modals/DeleteBoardModal";

interface Props {
  board: Board | null;
  isLoading: boolean;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
  handleDeleteBoard: (_id: string) => Promise<void>;
}

const Navbar = ({
  board,
  isLoading,
  updateBoard,
  handleDeleteBoard,
}: Props) => {
  const {
    isOpen: isAddTaskOpen,
    onOpen: onAddTaskOpen,
    onClose: onAddTaskClose,
  } = useDisclosure();

  const {
    isOpen: isEditBoardOpen,
    onOpen: onEditBoardOpen,
    onClose: onEditBoardClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteBoardOpen,
    onOpen: onDeleteBoardOpen,
    onClose: onDeleteBoardClose,
  } = useDisclosure();

  if (isLoading) return null;

  return (
    <HStack minW="100%" minH="100%" bg="gray.700" padding="1rem">
      <Image />
      <Text fontSize="2rem" fontWeight="bold">
        kanban
      </Text>
      {board && (
        <HStack flex="1" justify="space-between" ml="9rem">
          <Text fontSize="1.5rem" fontWeight="bold">
            {board?.name}
          </Text>
          <HStack>
            <Button
              borderRadius="full"
              padding="1.5rem"
              bg="purple.800"
              onClick={onAddTaskOpen}
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
                <MenuItem
                  color="gray.500"
                  fontWeight="bold"
                  onClick={onEditBoardOpen}
                >
                  Edit board
                </MenuItem>
                <MenuItem
                  color="red.500"
                  fontWeight="bold"
                  onClick={onDeleteBoardOpen}
                >
                  Delete board
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      )}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={onAddTaskClose}
        board={board}
        updateBoard={updateBoard}
      />
      <AddColumnModal
        isOpen={isEditBoardOpen}
        onClose={onEditBoardClose}
        board={board}
        updateBoard={updateBoard}
      />
      <DeleteBoardModal
        isOpen={isDeleteBoardOpen}
        onClose={onDeleteBoardClose}
        board={board}
        handleDeleteBoard={handleDeleteBoard}
      />
    </HStack>
  );
};

export default Navbar;
