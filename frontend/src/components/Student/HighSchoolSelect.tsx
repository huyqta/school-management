import {
    Button,
    FormLabel,
    Input,
    Select,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  
  const HighSchoolSelect = () => {
    const [highSchools, setHighSchools] = useState([]);
  
    useEffect(() => {
      fetch('/assets/data/high_school.json')
        .then(response => response.json())
        .then(data => setHighSchools(data));
    }, []);
  
    const handleAddSchool = () => {
        // Logic to add skill
      };
    

    return (
      <>
        <FormLabel htmlFor="highSchool">High School</FormLabel>
      <Select
        id="highSchool"
        name="highSchool"
                placeholder="Select high school"
      >
        {highSchools.map((school, index) => (
          <option key={index} value={school.high_school}>
            {school.high_school}
          </option>
        ))}
      </Select>

      <FormLabel htmlFor="graduationYear">Graduation Year</FormLabel>
      <Input
        id="graduationYear"
        name="graduationYear"
        placeholder="Enter graduation year"
      />

      <FormLabel htmlFor="gpa">GPA</FormLabel>
      <Input
        id="gpa"
        name="gpa"
                placeholder="Enter GPA"
      />
            {/* <Button onClick={handleAddSchool}>Add high school</Button> */}
      </>
    );
  };
  
  export default HighSchoolSelect;