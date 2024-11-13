import {
  Button,
  Container,
  FormLabel,
  Radio,
  RadioGroup,
  Text,
  HStack,
  Flex,
  Input,
  Select,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router"
import HighSchoolSelect from "../../components/Student/HighSchoolSelect";
import Skills from "../../components/Student/Skills";

export const Route = createFileRoute("/_layout/student")({
  component: Student,
})

function Student() {
  const [studentData, setStudentData] = useState({
    skills: [],
    language: []
  });

  const [highSchools, setHighSchools] = useState([]);

  useEffect(() => {
    // Fetch high schools from JSON file
    fetch('/assets/data/high_school.json')
      .then(response => response.json())
      .then(data => setHighSchools(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleAddSkill = () => {
    // Logic to add skill
  };

  const handleAddLanguage = () => {
    // Logic to add language
  };

  return (
    
    <Container maxW="5xl" mt={10}>
      <h1>Student</h1>
      <Flex gap="4">
        <Box>
          <HighSchoolSelect/>
        </Box>
        <Box>
          <Skills />
        </Box>
        <Box>
        <FormLabel htmlFor="languages">Languages</FormLabel>
      <Input
        id="languages"
        name="languages"
        placeholder="Enter language"
        onChange={handleInputChange}
      />
          <Button onClick={handleAddLanguage}>Add Language</Button>
        </Box>
      </Flex>
      
      

      

      

      {/* Add more fields as necessary */}
    </Container>
  );
}

export default Student;