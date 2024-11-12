import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Text,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router"

const NUM_QUESTIONS_PER_PAGE = 12;

export const Route = createFileRoute("/_layout/quizs")({
  component: Quizs,
})

function Quizs() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(NUM_QUESTIONS_PER_PAGE).fill(0));
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/assets/data/riasec_questions.json');
      const data = await response.json();
      console.log(data)
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleAnswerChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentPage * NUM_QUESTIONS_PER_PAGE + index] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    const nextPage = currentPage + 1;
    console.log(questions)
    if (nextPage * NUM_QUESTIONS_PER_PAGE < questions.length) {
      setCurrentPage(nextPage);
      // setAnswers(Array(NUM_QUESTIONS_PER_PAGE).fill(0)); // Reset answers for the next set of questions
    } else {
      calculateResults();
    }
  };

  const saveRecord = () => {
    return
  }

  const calculateResults = () => {
    const scoreByGroup = questions.reduce((acc, question, index) => {
      const group = question.group;
      const score = answers[index];
      if (!acc[group]) {
        acc[group] = 0;
      }
      acc[group] += score;
      
      return acc;
    }, {});
    setResults(scoreByGroup);
  };

  const startIndex = currentPage * NUM_QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, startIndex + NUM_QUESTIONS_PER_PAGE);

  return (
    <Container maxW="5xl" mt={10}>
      <Text fontSize="2xl" mb={5}>Trắc nghiệm tính cách</Text>
      {currentQuestions.map((q, index) => (
        <HStack key={index} mb={4}>
          <RadioGroup onChange={(value) => handleAnswerChange(index, parseInt(value))} value={answers[startIndex + index]}>
              <HStack direction="row" px={3}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Radio key={value} value={value}>
                  {value}
                </Radio>
              ))}
            </HStack>
            
          </RadioGroup>
          <FormLabel m={0}>{q.question.VN}</FormLabel>
        </HStack>
      ))}
      <Flex justify="center" align="center" gap={1}>
        <Button colorScheme="teal" onClick={handleNext}>
          {startIndex + NUM_QUESTIONS_PER_PAGE < questions.length ? "Next" : "Finish"}
        </Button> 
        <Button colorScheme="teal" onClick={saveRecord}>
          Save
        </Button> 
      </Flex>
      <br />
      <hr />
      <br />
      {Object.keys(results).length > 0 && (
        <>
          {/* <Text fontSize="x-large" mt={5}>Kết quả:</Text> */}
          {Object.entries(results).map(([group, score]) => (
            <HStack>
              <Text key={group} fontWeight="700">{group}:</Text><Text>{score} điểm</Text>
            </HStack>
          ))}
        </>
      )}
    </Container>
  );
}

export default Quizs;