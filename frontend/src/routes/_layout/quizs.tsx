import {
  Button,
  Container,
  FormLabel,
  Radio,
  RadioGroup,
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

interface Question {
  question: {
    EN: string;
    VN: string;
  };
  group: string;
}

interface Results {
  [key: string]: number; // Định nghĩa kiểu cho results
}

function Quizs() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(NUM_QUESTIONS_PER_PAGE).fill(0));
  const [results, setResults] = useState<Results>({});

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
    const scoreByGroup = questions.reduce((acc: Results, question, index) => {
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

// Tìm các nhóm có điểm cao nhất
const sortedGroups = Object.entries(results).sort((a, b) => b[1] - a[1]);
const highestScore = sortedGroups[0] ? sortedGroups[0][1] : 0;
const topGroups = sortedGroups.filter(([_, score]) => score === highestScore).map(([group]) => group);

  return (
    <Container maxW="5xl" mt={10}>
      <Text fontSize="2xl" mb={5}>Trắc nghiệm tính cách</Text>
      {currentQuestions.map((q, index) => (
        <HStack key={index} mb={4}>
          <RadioGroup onChange={(value) => handleAnswerChange(index, parseInt(value))} value={answers[startIndex + index].toString()}>
              <HStack direction="row" px={3}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Radio key={value} value={value.toString()}>
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
            <HStack key={group} color={topGroups.includes(group) ? "red.600" : "gray.800"}>
              <Text fontWeight="700">{group}:</Text><Text>{score} điểm</Text>
            </HStack>
          ))}
        </>
      )}
    </Container>
  );
}

export default Quizs;