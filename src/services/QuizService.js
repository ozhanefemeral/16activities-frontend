import axios from "axios";

const url = `/api/quizzes`

class QuizService {
    static async CreateQuiz(quizBody) {
        const response = await axios.post(`${url}`, quizBody);
        return response.data;
    }
}

export default QuizService;