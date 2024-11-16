import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Button,
  Container,
  FormLabel,
  Flex,
  Input,
  Box,
} from "@chakra-ui/react";
import HighSchoolSelect from "../../components/Student/HighSchoolSelect";
import Skills from "../../components/Student/Skills";
import { StudentsService } from "../../client";
import { createFileRoute } from "@tanstack/react-router";


function getStudentQueryOptions() {
  return {
    queryKey: ["studentData"],
    queryFn: async () => {
      const data = await StudentsService.studentsReadMyStudent();
      return data; // Giả định dữ liệu JSON được lưu trong `json_data`
    },
  };
}

export const Route = createFileRoute("/_layout/student")({
  component: Student,
})

function Student() {
  const [updatedData, setUpdatedData] = useState<StudentUpdate>(null)
  const { data: studentData, isLoading, error } = useQuery(getStudentQueryOptions());

  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      console.log(updatedData)
      // Thay thế StudentsService.updateStudentData với API chính xác của bạn
      return await StudentsService.studentsUpdateStudent({ requestBody: updatedData, studentId: updatedData.id });
    },
    onSuccess: () => {
      // Invalidate queries hoặc bất kỳ thao tác nào bạn cần khi mutation thành công
      // QueryClient.invalidateQueries(["studentData"]);
    },
    onError: (error) => {
      console.error("Error updating student data:", error);
      // Thêm xử lý lỗi nếu cần
    },
  });
  
  // const mutation = useMutation(
  //   (updatedData) => StudentsService.updateStudentData({ requestBody: updatedData }),
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["studentData"]);
  //     },
  //   }
  // );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching student data: {error.message}</p>;

  const handleUpdateSkills = (newSkills) => {
    if (studentData){
      // Parse json_data để lấy đối tượng bên trong
      const parsedJsonData = JSON.parse(studentData.json_data || "{}");

      // Cập nhật skills trong json_data
      parsedJsonData.skills = newSkills;
      const newData = {
        ...studentData,
        json_data: JSON.stringify(parsedJsonData),
      };
      console.log("updatedData")
      console.log(newData)
      console.log("studentData")
      console.log(studentData.json_data)
      console.log("newSkills")
      console.log(newSkills)
      // setUpdatedData(newData);
    }
  };

  // const handleUpdateStudentData = () => {
  //   mutation.mutate(studentData);
  // }

  return (
    
    <Container maxW="5xl" mt={10}>
      <h1>Student</h1>
      <Flex wrap="wrap" gap="4">
        <Box flex="1" width={{base: "100%", sm: "100%", md: "50%"}}>
          <HighSchoolSelect/>
        </Box>
        <Box flex="1" width={{base: "100%", sm: "100%", md: "50%"}}>
          <Skills skills={JSON.parse(studentData?.json_data).skills} onUpdateSkills={handleUpdateSkills} />
        </Box>
      </Flex>
      <Flex gap="4">
        <Box>
        <FormLabel htmlFor="languages">Languages</FormLabel>
      <Input
        id="languages"
        name="languages"
        placeholder="Enter language"
        // onChange={handleInputChange}
      />
          
        </Box>
      </Flex>
      <Button onClick={() => mutation.mutate(updatedData)}>Update</Button>
      {/* Add more fields as necessary */}
    </Container>
  );
}

export default Student;