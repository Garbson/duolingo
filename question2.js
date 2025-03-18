const { createApp, ref } = Vue;

const Question2 = {
  template: `
    <div class="content">
      <!-- Progress Bar -->
      <div class="d-flex justify-content-between align-items-center mb-3 w-100">
        <div class="progress" style="width: 80%">
          <div class="progress-bar" role="progressbar" :style="{ width: (current) / total * 100 + '%' }"></div>
        </div>
        <!-- Skip Button -->
        <button class="btn btn-skip" @click="skip">Skip</button>
      </div>

      <!-- Question -->
      <h4 class="fw-semibold fs-5 mb-4 text-start w-100">{{ currentQuestion.question }}</h4>

      <!-- Fill-in-the-blank -->
      <div class="d-flex    justify-content-center w-100 red">
        <div class="list-group mb-4 w-100">
          <button 
            v-for="(option, index) in currentQuestion.options" 
            :key="index" 
            class="list-group-item"
            :class="{ 'selected': selectedOption === index }"
            @click="selectOption(index)"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Verify Button -->
      <div class="fixed-bottom py-3"  v-if="!answerChecked">
        <div class="container px-4">
          <button 
            class="btn btn-verify w-100" 
            :disabled="selectedOption === null" 
            @click="checkAnswer"
          >
            Verify Answer
          </button>
        </div>
      </div>

      <!-- Feedback Dialog -->
      <div v-if="answerChecked" class="feedback-footer">
        <p :class="feedbackClass" class="feedback-message">
          {{ feedbackMessage }}
        </p>
        <button class="w-100" @click="nextQuestion">
          Next
        </button>
      </div>
    </div>
  `,
  data() {
    return {
      current: 2,  // Atualizado com o número da pergunta
      total: 5,    // Total de perguntas
      selectedOption: null,
      answerChecked: false,
      feedbackMessage: "",
      feedbackClass: "",
      currentQuestion: {
        question: "The house is __.",
        options: ["big", "small", "large", "nice"],
        correctAnswer: 0
      }
    };
  },
  methods: {
    selectOption(index) {
      this.selectedOption = index;
      // Preencher a lacuna com a opção selecionada
      this.currentQuestion.question = `The house is ${this.currentQuestion.options[index]}.`;
    },
    checkAnswer() {
      const correctAnswer = this.currentQuestion.correctAnswer;
      this.answerChecked = true;
      if (this.selectedOption === correctAnswer) {
        this.feedbackMessage = "Correct!";
        this.feedbackClass = "text-success";
      } else {
        this.feedbackMessage = `Wrong! Correct answer: "${this.currentQuestion.options[correctAnswer]}"`;
        this.feedbackClass = "text-danger";
      }
    },
    nextQuestion() {
      // Avançar para a próxima pergunta
      this.answerChecked = false;
      this.selectedOption = null;
      this.feedbackMessage = "";
      this.feedbackClass = "";
      this.current++;
      this.currentQuestion.question = "The house is __."; // Resetando a pergunta
    },
    skip() {
      alert("You skipped this question!");
    }
  },
};

createApp(Question2).mount('#app');