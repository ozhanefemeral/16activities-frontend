import axios from "axios";

class QuizService {
    static async CreateQuiz(quizBody) {
        const response = await axios.post('/quizzes/', quizBody);
        return response.data;
    }
}

export default QuizService;