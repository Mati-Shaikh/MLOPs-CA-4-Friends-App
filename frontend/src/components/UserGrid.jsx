import { Flex, Grid, Spinner, Text, useColorModeValue, Fade, ScaleFade } from "@chakra-ui/react";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";
import { motion } from "framer-motion";

const UserGrid = ({ users, setUsers }) => {
	const [isLoading, setIsLoading] = useState(true);
	const emptyStateColor = useColorModeValue("gray.600", "gray.300");

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await fetch(BASE_URL + "/friends");
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error);
				}
				setUsers(data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		getUsers();
	}, [setUsers]);

	return (
		<>
			{isLoading ? (
				<Flex justifyContent={"center"} alignItems={"center"} minH={"200px"}>
					<Spinner size={"xl"} thickness="4px" speed="0.65s" />
				</Flex>
			) : users.length === 0 ? (
				<ScaleFade in={true} initialScale={0.9}>
					<Flex
						justifyContent={"center"}
						alignItems={"center"}
						minH={"200px"}
						direction={"column"}
						gap={3}
					>
						<Text fontSize={"2xl"} fontWeight={"bold"} color={emptyStateColor}>
							😢 Poor you!
						</Text>
						<Text fontSize={"xl"} color={emptyStateColor}>
							No friends found.
						</Text>
					</Flex>
				</ScaleFade>
			) : (
				<Grid
					templateColumns={{
						base: "1fr",
						md: "repeat(2, 1fr)",
						lg: "repeat(3, 1fr)",
					}}
					gap={6}
					as={motion.div}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					{users.map((user) => (
						<UserCard key={user.id} user={user} setUsers={setUsers} />
					))}
				</Grid>
			)}
		</>
	);
};

export default UserGrid;