import {
  Button,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Board } from "../hooks/useBoards";
import AddTaskModal from "./modals/AddTaskModal";
import AddColumnModal from "./modals/AddColumnModal";
import DeleteBoardModal from "./modals/DeleteBoardModal";
import { CiMenuKebab } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import ResponsiveSidebarModal from "./modals/ResponsiveSidebarModal";
import { useNavigate } from "react-router-dom";

interface Props {
  board: Board | null;
  isLoading: boolean;
  updateBoard: (board: Partial<Board>, _id: string) => Promise<void>;
  handleDeleteBoard: (_id: string) => Promise<void>;
  boards: Board[] | null;
  selectedBoard: number;
  setSelectedBoard: (index: number) => void;
  createBoard: (board: Partial<Board>) => Promise<void>;
}

const Navbar = ({
  board,
  isLoading,
  updateBoard,
  handleDeleteBoard,
  boards,
  selectedBoard,
  setSelectedBoard,
  createBoard,
}: Props) => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white.800", "gray.700");

  const addButtonContent = useBreakpointValue({
    base: <FaPlus />,
    md: "+ Add New Task",
  });

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

  const {
    isOpen: isResponsiveMenuOpen,
    onOpen: onResponsiveMenuOpen,
    onClose: onResponsiveMenuClose,
  } = useDisclosure();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <HStack minW="100%" minH="100%" bg={bgColor} padding="1rem">
      <Show above="md">
        <Image />
        <Text fontSize="2rem" fontWeight="bold">
          kanban
        </Text>
      </Show>
      {!isLoading && (
        <HStack flex="1" justify="space-between" ml={{ base: "0", md: "9rem" }}>
          <HStack overflowX="hidden">
            <Text
              fontSize={{ base: "1rem", md: "1.5rem" }}
              maxW={{ base: "12rem", md: "25rem" }}
              fontWeight="bold"
            >
              {board?.name}
            </Text>
            <Show below="sm">
              <Text onClick={onResponsiveMenuOpen}>
                {isResponsiveMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </Text>
            </Show>
          </HStack>
          <HStack>
            {boards && boards?.length > 0 && (
              <Button
                borderRadius="full"
                padding="1.5rem"
                bg="purple.800"
                fontWeight="bold"
                textColor="white.800"
                onClick={onAddTaskOpen}
              >
                {addButtonContent}
              </Button>
            )}
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<CiMenuKebab />}
                bg={bgColor}
                fontSize="1.5rem"
              />
              <MenuList>
                {boards && boards?.length > 0 && (
                  <>
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
                  </>
                )}
                <MenuItem
                  color="red.500"
                  fontWeight="bold"
                  onClick={handleLogout}
                >
                  Logout
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
      <ResponsiveSidebarModal
        isOpen={isResponsiveMenuOpen}
        onClose={onResponsiveMenuClose}
        isLoading={isLoading}
        boards={boards}
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
        createBoard={createBoard}
      />
    </HStack>
  );
};

export default Navbar;
