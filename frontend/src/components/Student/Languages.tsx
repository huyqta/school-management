import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  FormLabel,
  Input,
  FormControl,
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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  CardFooter,
  CardBody,
  Card,
  CardHeader,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StudentResponse, StudentsService } from "../../client";
import React from "react";

const Languages = ({ studentData }: { studentData: StudentResponse }) => {
  const [languages, setLanguages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    language: "",
    level: "beginner",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const levels = ["beginner", "elementary", "intermediate", "advanced", "proficient"];

  useEffect(() => {
    if (studentData?.json_data) {
      const studentJson = JSON.parse(studentData.json_data);
      setLanguages(studentJson.languages || []);
    }
  }, [studentData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentLanguage((prev) => ({ ...prev, [name]: value }));
  };

  const handleLevelChange = (value: number) => {
    setCurrentLanguage((prev) => ({ ...prev, level: levels[value] }));
  };

  const handleSaveLanguage = () => {
    const updatedLanguages = [...languages];
    if (editingIndex !== null) {
      updatedLanguages[editingIndex] = { ...currentLanguage };
    } else {
      updatedLanguages.push({ ...currentLanguage });
    }

    const updatedData = {
      ...studentData,
      json_data: JSON.stringify({
        ...JSON.parse(studentData.json_data),
        languages: updatedLanguages,
      }),
    };

    mutation.mutate(updatedData);
    setIsModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async (updatedData: StudentResponse) => {
      return await StudentsService.studentsUpdateStudent({
        requestBody: updatedData,
        studentId: updatedData.id,
      });
    },
    onSuccess: (variables) => {
      setLanguages(JSON.parse(variables.json_data).languages);
      console.log("Languages updated successfully");
    },
    onError: (error) => {
      console.error("Error updating student data:", error);
    },
  });

  const handleDeleteLanguage = (index: number) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);

    const updatedData = {
      ...studentData,
      json_data: JSON.stringify({
        ...JSON.parse(studentData.json_data),
        languages: updatedLanguages,
      }),
    };

    mutation.mutate(updatedData);
  };

  const handleEditLanguage = (index: number) => {
    setEditingIndex(index);
    setCurrentLanguage(languages[index]);
    setIsModalOpen(true);
  };

  const handleCreateLanguage = () => {
    setEditingIndex(null);
    setCurrentLanguage({
      language: "",
      level: "beginner",
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <Card border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
        <CardHeader bg="gray.100" fontWeight="bold" fontSize="lg" px={4} py={3}>
          Languages
        </CardHeader>

        <CardBody>
          <VStack align="start" spacing={3} width="full">
            {languages.map((lang, index) => (
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
                <Text>
                  {lang.language} - {lang.level}
                </Text>
                <HStack spacing={2}>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleEditLanguage(index)}
                    aria-label="Edit language"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDeleteLanguage(index)}
                    aria-label="Delete language"
                  />
                </HStack>
              </Flex>
            ))}
          </VStack>
        </CardBody>

        <CardFooter justify="end" px={4} py={3}>
          <Button
            leftIcon={<EditIcon />}
            colorScheme="green"
            size="sm"
            onClick={handleCreateLanguage}
          >
            Create
          </Button>
        </CardFooter>
      </Card>

      {/* Modal để thêm/chỉnh sửa ngôn ngữ */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingIndex !== null ? "Edit Language" : "Create Language"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Language</FormLabel>
                <Input
                  name="language"
                  value={currentLanguage.language}
                  onChange={handleInputChange}
                  placeholder="Enter language"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Level</FormLabel>
                <Slider
                  defaultValue={levels.indexOf(currentLanguage.level)}
                  min={0}
                  max={4}
                  step={1}
                  onChange={handleLevelChange}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text mt={2}>{currentLanguage.level}</Text>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveLanguage}>
              Save
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Languages;