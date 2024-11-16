import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
    Button,
    FormLabel,
    Textarea,
    FormControl,
    FormHelperText,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    VStack,
    HStack,
    Text,
    Flex,
    IconButton,
    CardFooter,
    CardBody,
    Card,
    CardHeader,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  
  const Skills = ({ skills = [], onUpdateSkills }) => {
    const [skillInput, setSkillInput] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    useEffect(() => {
      setSkillInput(skills.join("\n")); // Mỗi kỹ năng trên 1 dòng
    }, [skills]);
  
    const handleInputChange = (event) => {
      setSkillInput(event.target.value);
    };
  
    const handleSaveSkills = () => {
      const newSkills = skillInput.split("\n").map((skill) => skill.trim()).filter(skill => skill);
      onUpdateSkills(newSkills);
      setIsModalOpen(false);
    };
  
    const handleDeleteSkill = (index) => {
      const newSkills = skills.filter((_, i) => i !== index);
      onUpdateSkills(newSkills);
    };
  
    const handleEditSkills = () => {
      setIsModalOpen(true);
    };
  
    return (
      <>
        <Card border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
      {/* Card Header */}
      <CardHeader bg="gray.100" fontWeight="bold" fontSize="lg" px={4} py={3}>
        Skills
      </CardHeader>

      {/* Card Body */}
      <CardBody>
        <VStack align="start" spacing={3} width="full">
          {skills.map((skill, index) => (
            <Flex
              key={index}
              width="full"
              justifyContent="space-between"
              alignItems="center"
              px={2}
              py={1}
              borderBottom="1px solid"
              borderColor="gray.100"
            >
              <Text>{skill}</Text>
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                size="sm"
                onClick={() => handleDeleteSkill(index)}
                aria-label="Delete skill"
              />
            </Flex>
          ))}
        </VStack>
      </CardBody>

      {/* Card Footer */}
      <CardFooter justify="end" px={4} py={3}>
        <Button
          leftIcon={<EditIcon />}
          colorScheme="blue"
          size="sm"
          onClick={handleEditSkills}
        >
          Edit
        </Button>
      </CardFooter>
            </Card>
  
        {/* Modal để chỉnh sửa danh sách kỹ năng */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Chỉnh sửa kỹ năng</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Danh sách kỹ năng (mỗi dòng 1 kỹ năng)</FormLabel>
                <Textarea
                  rows={5}
                  value={skillInput}
                  onChange={handleInputChange}
                  placeholder="Nhập kỹ năng, mỗi kỹ năng trên 1 dòng"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSaveSkills}>
                Lưu
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Đóng</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default Skills;