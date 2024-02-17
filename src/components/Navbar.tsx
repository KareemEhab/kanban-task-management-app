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
} from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";

const Navbar = () => {
  return (
    <HStack minW="100%" minH="100%" bg="gray.700" padding="1rem">
      <Image />
      <Text fontSize="2rem" fontWeight="bold">
        kanban
      </Text>
      <HStack flex="1" justify="space-between" ml="9rem">
        <Text fontSize="1.5rem" fontWeight="bold">
          Marketing plan
        </Text>
        <Box>
          <Button borderRadius="full" padding="1.5rem" bg="purple.800">
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
    </HStack>
  );
};

export default Navbar;
