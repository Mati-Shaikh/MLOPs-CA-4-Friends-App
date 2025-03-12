import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	Textarea,
	useDisclosure,
	useToast,
	IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { FaUserPlus, FaUserTie, FaIdCard, FaInfoCircle, FaVenusMars } from "react-icons/fa";
import { BASE_URL } from "../App";

const CreateUserModal = ({ setUsers }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		role: "",
		description: "",
		gender: "",
	});
	const toast = useToast();

	const handleCreateUser = async (e) => {
		e.preventDefault(); // prevent page refresh
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/friends", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}

			toast({
				status: "success",
				title: "Yayy! 🎉",
				description: "Friend created successfully.",
				duration: 2000,
				position: "top-center",
			});
			onClose();
			setUsers((prevUsers) => [...prevUsers, data]);

			setInputs({
				name: "",
				role: "",
				description: "",
				gender: "",
			}); // clear inputs
		} catch (error) {
			toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<IconButton
				onClick={onOpen}
				aria-label="Add Friend"
				icon={<BiAddToQueue size={20} />}
				colorScheme="teal"
				variant="solid"
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleCreateUser}>
					<ModalContent>
						<ModalHeader display="flex" alignItems="center" gap={2}>
							<FaUserPlus size={24} />
							Add New Friend
						</ModalHeader>
						<ModalCloseButton />

						<ModalBody pb={6}>
							{/* Name Field */}
							<FormControl>
								<FormLabel display="flex" alignItems="center" gap={2}>
									<FaIdCard />
									Full Name
								</FormLabel>
								<Input
									placeholder='John Doe'
									value={inputs.name}
									onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
								/>
							</FormControl>

							{/* Role Field */}
							<FormControl mt={4}>
								<FormLabel display="flex" alignItems="center" gap={2}>
									<FaUserTie />
									Role
								</FormLabel>
								<Input
									placeholder='Software Engineer'
									value={inputs.role}
									onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
								/>
							</FormControl>

							{/* Description Field */}
							<FormControl mt={4}>
								<FormLabel display="flex" alignItems="center" gap={2}>
									<FaInfoCircle />
									Description
								</FormLabel>
								<Textarea
									resize={"none"}
									overflowY={"hidden"}
									placeholder="He's a software engineer who loves to code and build things."
									value={inputs.description}
									onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
								/>
							</FormControl>

							{/* Gender Field */}
							<FormControl mt={4}>
								<FormLabel display="flex" alignItems="center" gap={2}>
									<FaVenusMars />
									Gender
								</FormLabel>
								<RadioGroup
									value={inputs.gender}
									onChange={(value) => setInputs({ ...inputs, gender: value })}
								>
									<Flex gap={5}>
										<Radio value='male'>Male</Radio>
										<Radio value='female'>Female</Radio>
									</Flex>
								</RadioGroup>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='teal' mr={3} type='submit' isLoading={isLoading}>
								Add
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
};

export default CreateUserModal;