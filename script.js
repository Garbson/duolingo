const { createApp, ref } = Vue;

const Question1 = {
  template: `
    <div class="content">
      <!-- Progress Bar -->
      <div class="d-flex justify-content-between align-items-center mb-3 w-100">
        <div class="progress" style="width: 80%">
          <div class="progress-bar" role="progressbar" :style="{ width: (current + 1) / total * 100 + '%' }"></div>
        </div>
        <!-- Skip Button -->
        <button class="btn btn-skip" @click="skip">Skip</button>
      </div>

      <!-- Question -->
      <h4 class="fw-semibold fs-5 mb-4 text-start w-100">{{ currentQuestion.question }}</h4>

      <!-- Options -->
      <div class="list-group mb-4 w-100">
        <button 
          v-for="(option, index) in currentQuestion.options" 
          :key="index" 
          class="list-group-item"
          :class="{ 'btn-selected': selectedOption === index }"
          @click="selectOption(index)"
        >
          {{ option }}
        </button>
      </div>

      <!-- Verify Button -->
      <div class="fixed-bottom py-3" style="background-color: #121212">
        <div class="container px-4">
          <button 
            class="btn btn-success w-100" 
            :disabled="selectedOption === null" 
            @click="checkAnswer"
          >
            Verify Answer
          </button>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      current: 0,
      total: 1,
      selectedOption: null,
      currentQuestion: {
        question: "Translate to English: 'La maison est grande.'",
        options: ["The house is big", "The house is small", "The house is large", "Big house"],
        correctAnswer: 0
      }
    };
  },
  methods: {
    selectOption(index) {
      this.selectedOption = index;
    },
    checkAnswer() {
      const correctAnswer = this.currentQuestion.correctAnswer;
      if (this.selectedOption === correctAnswer) {
        alert("Correct!");
      } else {
        alert("Wrong!");
      }
    },
    skip() {
      alert("You skipped this question!");
    }
  },
};

createApp(Question1).mount('#app');