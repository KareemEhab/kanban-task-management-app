import {
  Box,
  HStack,
  Skeleton,
  Switch,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarBtn from "./SidebarBtn";
import { CiGrid32 } from "react-icons/ci";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import AddBoardModal from "./modals/AddBoardModal";
import { Board } from "../hooks/useBoards";

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
  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue("white.800", "gray.700");
  const switchColor = useColorModeValue("white.700", "gray.800");

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
        <HStack justify="center" width="100%" padding="1rem">
          <HStack
            width="100%"
            height="3rem"
            paddingY="0.6rem"
            justify="center"
            bg={switchColor}
            gap="1.5rem"
            borderRadius={5}
            overflow="hidden"
          >
            <Text fontSize="1.8rem">
              <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z"
                  fill="#828FA3"
                />
              </svg>
            </Text>
            <Switch
              colorScheme="purple"
              defaultChecked
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
            />
            <Text fontSize="1.5rem">
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z"
                  fill="#828FA3"
                />
              </svg>
            </Text>
          </HStack>
        </HStack>
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
