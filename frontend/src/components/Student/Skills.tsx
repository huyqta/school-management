import {
    Button,
    FormLabel,
    Input,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  
  const Skills = () => {
    const [skills, setSkills] = useState([]);
    const handleAddSkill = () => {
        // Logic to add skill
      };
    

    return (
      <>
        <FormLabel htmlFor="skills">Skills</FormLabel>
        <Input
            id="skills"
            name="skills"
            placeholder="Enter skill"
        />
        <Button onClick={handleAddSkill}>Add Skill</Button>
      </>
    );
  };
  
  export default Skills;