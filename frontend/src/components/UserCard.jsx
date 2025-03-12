import {
	Avatar,
	Box,
	Card,
	CardBody,
	CardHeader,
	Flex,
	Heading,
	IconButton,
	Text,
	useToast,
	useColorModeValue,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const UserCard = ({ user, setUsers }) => {
	const toast = useToast();
	const cardBg = useColorModeValue("white", "gray.700");
	const cardShadow = useColorModeValue("md", "dark-lg");

	const handleDeleteUser = async () => {
		try {
			const res = await fetch(BASE_URL + "/friends/" + user.id, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
			toast({
				status: "success",
				title: "Success",
				description: "Friend deleted successfully.",
				duration: 2000,
				position: "top-center",
			});
		} catch (error) {
			toast({
				title: "An error occurred",
				description: error.message,
				status: "error",
				duration: 4000,
				isClosable: true,
				position: "top-center",
			});
		}
	};

	return (
		<Card
			bg={cardBg}
			boxShadow={cardShadow}
			transition="transform 0.2s, box-shadow 0.2s"
			_hover={{
				transform: "translateY(-4px)",
				boxShadow: "xl",
			}}
		>
			<CardHeader>
				<Flex gap={4}>
					<Flex flex={"1"} gap={"4"} alignItems={"center"}>
						<Avatar src={user.imgUrl} name={user.name} size="md" />

						<Box>
							<Heading size='sm'>{user.name}</Heading>
							<Text fontSize="sm" color="gray.500">
								{user.role}
							</Text>
						</Box>
					</Flex>

					<Flex gap={2}>
						<EditModal user={user} setUsers={setUsers} />
						<IconButton
							variant='ghost'
							colorScheme='red'
							size={"sm"}
							aria-label='Delete Friend'
							icon={<BiTrash size={20} />}
							onClick={handleDeleteUser}
						/>
					</Flex>
				</Flex>
			</CardHeader>

			<CardBody pt={0}>
				<Text fontSize="sm" color="gray.600">
					{user.description}
				</Text>
			</CardBody>
		</Card>
	);
};

export default UserCard;