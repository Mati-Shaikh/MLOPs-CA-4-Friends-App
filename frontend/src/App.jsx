import { Container, Stack, Text, Box, Image, keyframes } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import UserGrid from "./components/UserGrid";
import { useState } from "react";

// Updated this after recording. Make sure you do the same so that it can work in production
export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

// Keyframes for animation
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

function App() {
	const [users, setUsers] = useState([]);

	return (
		<Stack minH={"100vh"} bgGradient="linear(to-b, gray.50, gray.100)">
			<Navbar setUsers={setUsers} />

			<Container maxW={"1200px"} my={8}>
				{/* Interactive Heading */}
				<Box textAlign={"center"} mb={8}>
					<Text
						fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
						fontWeight={"bold"}
						letterSpacing={"2px"}
						textTransform={"uppercase"}
						bgGradient="linear(to-r, cyan.400, blue.500)"
						bgClip="text"
						display="inline-block"
						position="relative"
					>
						My Buddies
						<Image
							src="https://img.icons8.com/color/96/000000/friends.png" // Replace with your logo URL
							alt="Friends Logo"
							boxSize="60px"
							position="absolute"
							top="-20px"
							right="-40px"
							animation={`${float} 3s ease-in-out infinite`}
						/>
					</Text>
					<Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" mt={2}>
						Your trusted circle of friends.
					</Text>
				</Box>

				<UserGrid users={users} setUsers={setUsers} />
			</Container>
		</Stack>
	);
}

export default App;