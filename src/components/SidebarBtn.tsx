import { Button, Text, useColorModeValue } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  color: string;
  icon: IconType;
  children: string;
  isSelected: boolean;
  onClick: () => void;
}

const SidebarBtn = ({
  color,
  icon: Icon,
  children,
  isSelected,
  onClick,
}: Props) => {
  const bgColor = useColorModeValue("white.800", "gray.700");

  return (
    <Button
      width="100%"
      borderRadius="full"
      borderTopLeftRadius="0"
      borderBottomLeftRadius="0"
      bg={isSelected ? "purple.800" : bgColor}
      paddingLeft="1.5rem"
      paddingY="1.5rem"
      onClick={onClick}
      _hover={{
        bg: "white",
        "& .button-text": {
          color: "purple.800",
        },
      }}
    >
      <Text
        className="button-text"
        fontSize="1.3rem"
        fontWeight="bold"
        color={color}
      >
        <Icon size="1.3rem" />
      </Text>
      <Text
        className="button-text"
        width="100%"
        fontSize="1rem"
        fontWeight="bold"
        textAlign="left"
        marginLeft="0.5rem"
        color={isSelected ? "white" : color}
        overflow={"hidden"}
      >
        {children}
      </Text>
    </Button>
  );
};

export default SidebarBtn;
