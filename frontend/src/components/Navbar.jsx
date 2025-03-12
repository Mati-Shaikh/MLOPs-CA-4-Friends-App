import { Box, Button, Container, Flex, Text, useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import CreateUserModal from "./CreateUserModal";

const Navbar = ({ setUsers }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Container maxW={"900px"}>
      <Box px={4} my={4} borderRadius={5} bg={bgColor}>
        <Flex h='16' alignItems={"center"} justifyContent={"space-between"}>
          {/* Left side - Logo and App Name */}
          <Flex alignItems={"center"} gap={3}>
            <IconButton
              aria-label="Friends App Logo"
              icon={<FaUserFriends size={24} />}
              variant="ghost"
              colorScheme="teal"
              size="lg"
            />
            <Text fontSize={"xl"} fontWeight={700} color={textColor}>
              Friends App
            </Text>
          </Flex>

          {/* Right side - Theme Toggle and Create User Button */}
          <Flex gap={3} alignItems={"center"}>
            {/* Theme Toggle Button */}
            <IconButton
              aria-label="Toggle Theme"
              icon={colorMode === "light" ? <IoMoon size={20} /> : <IoSunny size={20} />}
              onClick={toggleColorMode}
              variant="ghost"
              colorScheme="teal"
            />

            {/* Create User Button */}
            <CreateUserModal setUsers={setUsers} />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;