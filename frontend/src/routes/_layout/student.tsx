import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Flex,
  Box,
  TabPanel,
  TabPanels,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import Certifications from "../../components/Student/Certifications";
import Skills from "../../components/Student/Skills";
import Languages from "../../components/Student/Languages";
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
  // const [updatedData, setUpdatedData] = useState<StudentUpdate>(null)
  const { data: studentData, isLoading, error } = useQuery(getStudentQueryOptions());
  // console.log("studentData")
  // console.log(studentData)
  // const mutation = useMutation({
  //   mutationFn: async (updatedData) => {
  //     // Thay thế StudentsService.updateStudentData với API chính xác của bạn
  //     return await StudentsService.studentsUpdateStudent({ requestBody: updatedData, studentId: updatedData.id });
  //   },
  //   onSuccess: () => {
  //     // Invalidate queries hoặc bất kỳ thao tác nào bạn cần khi mutation thành công
  //     // QueryClient.invalidateQueries(["studentData"]);
  //   },
  //   onError: (error) => {
  //     console.error("Error updating student data:", error);
  //     // Thêm xử lý lỗi nếu cần
  //   },
  // });

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

  // const handleUpdateSkills = (newSkills) => {
  //   if (studentData) {
  //     // Parse json_data để lấy đối tượng bên trong
  //     const parsedJsonData = JSON.parse(studentData.json_data || "{}");

  //     // Cập nhật skills trong json_data
  //     parsedJsonData.skills = newSkills;
  //     const newData = {
  //       ...studentData,
  //       json_data: JSON.stringify(parsedJsonData),
  //     };
  //     // setUpdatedData(newData);
  //   }
  // };

  // const handleUpdateStudentData = () => {
  //   mutation.mutate(studentData);
  // }

  return (

    <Container maxW="7xl" mt={10}>
      <Box maxW="7xl" mx="auto" mt={10} px={4}>
        {/* Tabs */}
        <Tabs variant="line" align="center">
          <TabList>
            <Tab>Info</Tab>
            <Tab>Data</Tab>
            <Tab>Personal</Tab>
            <Tab>Education</Tab>
          </TabList>
          <TabPanels>
            {/* Info Tab */}
            <TabPanel>
              <p>Info Content</p>
            </TabPanel>

            {/* Data Tab */}
            <TabPanel>
              <p>Data Content</p>
            </TabPanel>

            {/* Personal Tab */}
            <TabPanel>
              <p>Personal Content</p>
            </TabPanel>

            {/* Education Tab */}
            <TabPanel>
              <Flex wrap="wrap" gap="4">
                {studentData && (
                  <>
                    <Box flex="1" width={{ base: "100%", sm: "100%", md: "50%" }}>
                      <Certifications studentData={studentData} />
                    </Box>
                    <Box flex="1" width={{ base: "100%", sm: "100%", md: "50%" }}>
                      <Skills studentData={studentData} />
                    </Box>
                  </>
                )}
              </Flex>
              <Flex gap="4" mt={4}>
                {studentData && (
                  <>
                    <Box flex="1" width={{ base: "100%", sm: "100%", md: "50%" }}>
                      <Languages studentData={studentData} />
                    </Box>
                  </>
                )}
              </Flex>

            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Student;