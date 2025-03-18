const { createApp, ref } = Vue;

const Question1 = {
  template: `
    <div class="content">
      <!-- Progress Bar -->
      <div class="d-flex justify-content-start align-items-center mb-3 w-100">
        <div class="progress d-flex justify-content-start" >
          <div class="progress-bar" role="progressbar" :style="{ width: (current + 1) / total * 100 + '%' }"></div>
        </div>
        <!-- Skip Button -->
        <button class="btn btn-skip" @click="goToNextQuestion">Skip</button>
      </div>


      <h4 class="fw-semibold fs-5 mb-4 text-start w-100">{{ currentQuestion.question }}</h4>

      <!-- Options -->
      <div class="d-flex justify-content-center w-100">
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
      <div class="fixed-bottom py-3" v-if="!answerChecked">
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
        <button class="w-100" @click="goToNextQuestion">
          Next
        </button>
      </div>
    </div>
  `,
  data() {
    return {
      current: 0,   
      total: 5,    
      selectedOption: null,
      answerChecked: false,
      feedbackMessage: "",
      feedbackClass: "",
      currentQuestion: {
        question: "Translate to English: 'La maison est grande.'",
        options: ["The house is big", "The house is small", "The house is large", "Big house"],
        correctAnswer: 2  
      }
    };
  },
  methods: {
    selectOption(index) {
      this.selectedOption = index;
    },
    checkAnswer() {
      const correctAnswer = this.currentQuestion.correctAnswer;
      this.answerChecked = true;
      if (this.selectedOption === correctAnswer) {
        this.feedbackMessage = "Correct!";
        this.feedbackClass = "text-success";
        setTimeout(() => this.goToNextQuestion(), 1000); 
      } else {
        this.feedbackMessage = `Wrong! Correct answer: "${this.currentQuestion.options[correctAnswer]}"`;
        this.feedbackClass = "text-danger";
      }
    },
    goToNextQuestion() {

      const nextQuestion = `question${this.current + 2}.html`; 
      window.location.href = nextQuestion;  
    },
    skip() {
      alert("You skipped this question!");
    }
  }
};

createApp(Question1).mount('#app');