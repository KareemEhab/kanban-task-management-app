import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";
import { Board } from "../hooks/useBoards";
import { useNavigate } from "react-router-dom";

interface Props {
  boards: Board[] | null;
  onEditBoardOpen: () => void;
  onDeleteBoardOpen: () => void;
}

const NavbarMenu = ({ boards, onEditBoardOpen, onDeleteBoardOpen }: Props) => {
  const bgColor = useColorModeValue("white.800", "gray.700");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
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
        <MenuItem color="red.500" fontWeight="bold" onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavbarMenu;
