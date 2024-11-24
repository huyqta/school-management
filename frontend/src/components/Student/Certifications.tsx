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
  CardFooter,
  CardBody,
  Card,
  CardHeader,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StudentResponse, StudentsService } from "../../client";
import React from "react";

type Certification = {
  name: string;
  institution: string;
  year_issued: string;
  grade: string;
};

const Certifications = ({ studentData }: { studentData: StudentResponse }) => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCertification, setCurrentCertification] = useState<Certification>({
    name: "",
    institution: "",
    year_issued: "",
    grade: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (studentData?.json_data) {
      const studentJson = JSON.parse(studentData.json_data);
      setCertifications(studentJson.certifications || []);
    }
  }, [studentData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentCertification((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCertification = () => {
    const updatedCertifications = [...certifications];
    if (editingIndex !== null) {
      // Update an existing certification
      updatedCertifications[editingIndex] = { ...currentCertification };
    } else {
      // Add a new certification
      updatedCertifications.push({ ...currentCertification });
    }

    const updatedData = {
      ...studentData,
      json_data: JSON.stringify({
        ...JSON.parse(studentData.json_data ?? '{}'),
        certifications: updatedCertifications,
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
      setCertifications(JSON.parse(variables.json_data ?? '{}').certifications);
      console.log("Certifications updated successfully");
    },
    onError: (error) => {
      console.error("Error updating student data:", error);
    },
  });

  const handleDeleteCertification = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);

    const updatedData = {
      ...studentData,
      json_data: JSON.stringify({
        ...JSON.parse(studentData.json_data ?? '{}'),
        certifications: updatedCertifications,
      }),
    };

    mutation.mutate(updatedData);
  };

  const handleEditCertification = (index: number) => {
    setEditingIndex(index);
    setCurrentCertification(certifications[index]); // Load dữ liệu chứng chỉ hiện tại vào modal
    setIsModalOpen(true);
  };

  const handleCreateCertification = () => {
    setEditingIndex(null); // Đặt trạng thái tạo mới
    setCurrentCertification({
      name: "",
      institution: "",
      year_issued: "",
      grade: "",
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <Card border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
        {/* Card Header */}
        <CardHeader bg="gray.100" fontWeight="bold" fontSize="lg" px={4} py={3}>
          Certifications
        </CardHeader>

        {/* Card Body */}
        <CardBody>
          <VStack align="start" spacing={3} width="full">
            {certifications.map((cert, index) => (
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
                <Text align={"left"}>
                  {cert.name} - {cert.institution} ({cert.year_issued}, {cert.grade})
                </Text>
                <HStack spacing={2}>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleEditCertification(index)}
                    aria-label="Edit certification"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDeleteCertification(index)}
                    aria-label="Delete certification"
                  />
                </HStack>
              </Flex>
            ))}
          </VStack>
        </CardBody>

        {/* Card Footer */}
        <CardFooter justify="end" px={4} py={3}>
          <Button
            leftIcon={<EditIcon />}
            colorScheme="green"
            size="sm"
            onClick={handleCreateCertification}
          >
            Create
          </Button>
        </CardFooter>
      </Card>

      {/* Modal để thêm/chỉnh sửa chứng chỉ */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingIndex !== null ? "Edit Certification" : "Create Certification"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Tên chứng chỉ</FormLabel>
                <Input
                  name="name"
                  value={currentCertification.name}
                  onChange={handleInputChange}
                  placeholder="Tên chứng chỉ"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Đơn vị cấp</FormLabel>
                <Input
                  name="institution"
                  value={currentCertification.institution}
                  onChange={handleInputChange}
                  placeholder="Đơn vị cấp"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Năm cấp</FormLabel>
                <Input
                  name="year_issued"
                  type="number"
                  value={currentCertification.year_issued}
                  onChange={handleInputChange}
                  placeholder="Năm cấp"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Loại</FormLabel>
                <Input
                  name="grade"
                  value={currentCertification.grade}
                  onChange={handleInputChange}
                  placeholder="Loại chứng chỉ"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveCertification}>
              Save
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Certifications;