const { createApp, ref } = Vue;

const Question3 = {
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

      <!-- Sentence Construction -->
      <div class="d-flex justify-content-center w-100 mb-4">
        <div class="bg-dark text-white rounded p-3 w-100 text-center">
          <span v-for="(word, index) in selectedWords" :key="index">
            {{ word }} 
          </span>
          <span v-if="selectedWords.length === 0" class="text-secondary">Click words to build your sentence</span>
        </div>
      </div>

      <!-- Words Bank -->
      <div class="d-flex justify-content-center w-100">
        <div class="list-group mb-4 w-100">
          <button 
            v-for="(word, index) in wordsBank" 
            :key="index" 
            class="list-group-item"
            :class="{ 'selected': selectedWords.includes(word) }"
            @click="selectWord(word)"
          >
            {{ word }}
          </button>
        </div>
      </div>

      <!-- Verify Button -->
      <div class="fixed-bottom py-3" v-if="!answerChecked">
        <div class="container px-4">
          <button 
            class="btn btn-verify w-100" 
            :disabled="selectedWords.length === 0" 
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
      current: 3,  // Atualizado com o número da pergunta
      total: 5,    // Total de perguntas
      selectedWords: [],
      answerChecked: false,
      feedbackMessage: "",
      feedbackClass: "",
      currentQuestion: {
        question: "I ____ a book.",
        correctAnswer: ["have", "a", "book"],
      },
      wordsBank: ["I", "have", "a", "book", "read", "seen"],
    };
  },
  methods: {
    selectWord(word) {
      if (!this.selectedWords.includes(word)) {
        this.selectedWords.push(word);
      }
    },
    checkAnswer() {
      const correct = this.currentQuestion.correctAnswer.join(" ");
      const answer = this.selectedWords.join(" ");
      this.answerChecked = true;

      if (answer === correct) {
        this.feedbackMessage = "Correct!";
        this.feedbackClass = "text-success";
      } else {
        this.feedbackMessage = `Wrong! Correct answer: "${correct}"`;
        this.feedbackClass = "text-danger";
      }
    },
    nextQuestion() {
      // Reset for next question
      this.answerChecked = false;
      this.selectedWords = [];
      this.feedbackMessage = "";
      this.feedbackClass = "";
      this.current++;
    },
    skip() {
      alert("You skipped this question!");
    },
  },
};

createApp(Question3).mount('#app');