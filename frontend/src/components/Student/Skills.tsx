import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  FormLabel,
  Textarea,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Text,
  Flex,
  IconButton,
  CardFooter,
  CardBody,
  Card,
  CardHeader,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { StudentResponse, StudentsService } from "../../client";
import React from "react";

const Skills = ({ studentData }: { studentData: StudentResponse }) => {
  const [skillInput, setSkillInput] = useState(""); // Dữ liệu gốc cho hiển thị danh sách kỹ năng bên ngoài
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tempSkillInputRef = useRef(""); // Dữ liệu tạm cho modal

  useEffect(() => {
    if (studentData?.json_data) {
      const studentJson = JSON.parse(studentData.json_data);
      const skills = studentJson.skills.join("\n"); // Kỹ năng cách nhau bằng dòng mới
      setSkillInput(skills); // Hiển thị danh sách kỹ năng bên ngoài
    }
  }, [studentData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    tempSkillInputRef.current = event.target.value; // Cập nhật dữ liệu tạm thời trong modal
  };

  const handleSaveSkills = () => {
    // Lấy dữ liệu từ tempSkillInputRef, chuyển thành array
    const updatedSkills = tempSkillInputRef.current
      .split("\n")
      .map((skill) => skill.trim())
      .filter((skill) => skill);

    // Cập nhật dữ liệu lên API
    const updatedData = {
      ...studentData,
      json_data: JSON.stringify({
        ...JSON.parse(studentData.json_data || "{}"),
        skills: updatedSkills,
      }),
    };

    mutation.mutate(updatedData);
    setIsModalOpen(false); // Đóng modal sau khi lưu
  };

  const mutation = useMutation({
    mutationFn: async (updatedData: StudentResponse) => {
      return await StudentsService.studentsUpdateStudent({
        requestBody: updatedData,
        studentId: updatedData.id,
      });
    },
    onSuccess: (variables) => {
        setSkillInput(JSON.parse(variables.json_data || "{}").skills.join("\n"));
        console.log("Skills updated successfully");
    },
    onError: (error) => {
      console.error("Error updating student data:", error);
    },
  });

  const handleDeleteSkill = (index: number) => {
    const currentSkills = skillInput.split("\n").filter(Boolean);
    const updatedSkills = currentSkills.filter((_, i) => i !== index);

    const updatedData = {
      ...studentData,
      json_data: JSON.stringify({
        ...JSON.parse(studentData.json_data || "{}"),
        skills: updatedSkills,
      }),
    };

    mutation.mutate(updatedData);
  };

  const handleEditSkills = () => {
    tempSkillInputRef.current = skillInput; // Gán dữ liệu gốc vào biến tạm
    setIsModalOpen(true); // Mở modal
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
            {skillInput.split("\n").map((skill, index) => (
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
                defaultValue={tempSkillInputRef.current} // Hiển thị dữ liệu tạm
                onChange={handleInputChange} // Cập nhật dữ liệu tạm
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