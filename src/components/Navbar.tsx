import {
  Button,
  HStack,
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
import { FaPlus } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import ResponsiveSidebarModal from "./modals/ResponsiveSidebarModal";
import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";

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

  return (
    <HStack minW="100%" minH="100%" bg={bgColor} padding="1rem">
      <NavbarLogo />
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
            <NavbarMenu
              boards={boards}
              onEditBoardOpen={onEditBoardOpen}
              onDeleteBoardOpen={onDeleteBoardOpen}
            />
          </HStack>
        </HStack>
      )}

      {/* Modals */}
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
