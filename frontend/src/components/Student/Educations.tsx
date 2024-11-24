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
    Checkbox,
} from "@chakra-ui/react";
import React from 'react';
import { StudentResponse, StudentsService } from "../../client";

const Educations = ({ studentData }: { studentData: StudentResponse }) => {
    const levels = ["Trung học cơ sở", "Trung học phổ thông", "Trung cấp nghề", "Cao đẳng Thực hành", "Đại học Nghiên cứu", "Đại học Thực hành", "Thạc sĩ Nghiên cứu", "Thạc sĩ Thực hành", "Tiến sĩ"]
    return (
        <Card border="1px" borderColor="gray.200" borderRadius="md">
            <CardHeader bg="gray.100" fontWeight="bold" fontSize="lg" px={4} py={3}>
                Educations
            </CardHeader>
            <CardBody>
                <VStack align="start" spacing={3} width=":>">
                    {levels.map((level, index) => (
                        <Flex key={index}
                        width="full">
                            <HStack>
                                <Checkbox>{level}</Checkbox>
                            </HStack>
                        </Flex>
                    ))}
                </VStack>
            </CardBody>
        </Card>
    )
}

export default Educations;