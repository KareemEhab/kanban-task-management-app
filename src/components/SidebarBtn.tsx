import { Button, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  color: string;
  icon: IconType;
  children: string;
  onClick: () => void;
}

const SidebarBtn = ({ color, icon: Icon, children, onClick }: Props) => {
  return (
    <Button
      width="100%"
      borderRadius="full"
      borderTopLeftRadius="0"
      borderBottomLeftRadius="0"
      bg="gray.700"
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
      <Text className="button-text" fontSize="1.3rem" color={color}>
        <Icon size="1.3rem" />
      </Text>
      <Text
        className="button-text"
        width="100%"
        fontSize="1rem"
        textAlign="left"
        marginLeft="0.5rem"
        color={color}
      >
        {children}
      </Text>
    </Button>
  );
};

export default SidebarBtn;
