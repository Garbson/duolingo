const { createApp, ref } = Vue;

const Question4 = {
  template: `
    <div class="content">
      <!-- Progress Bar -->
      <div class="d-flex justify-content-between align-items-center mb-3 w-100">
        <div class="progress">
          <div 
            class="progress-bar" 
            role="progressbar" 
            :style="{ width: (current / total) * 100 + '%' }" 
          ></div>
        </div>
        <!-- Skip Button -->
        <button class="btn btn-skip" @click="nextQuestion">Skip</button>
      </div>

      <!-- Question -->
      <h4 class="fw-semibold fs-5 mb-4 text-start w-100">{{ currentQuestion.question }}</h4>

      <!-- Image Selection -->
      <div class="image-container">
        <div 
          v-for="(image, index) in currentQuestion.options" 
          :key="index" 
          class="image-option"
          :class="{ 'selected': selectedImage === index }"
          @click="selectImage(index)"
        >
          <img :src="image.src" :alt="image.alt" class="img-fluid" />
        </div>
      </div>

      <!-- Verify Button -->
      <div class="fixed-bottom py-3 d-flex justify-content-center " v-if="!answerChecked"> 
          <button 
            class="btn btn-verify w-100" 
            :disabled="selectedImage === null" 
            @click="checkAnswer"
          >
            Verify Answer
          </button>    
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
      current: 4,  // Atualizado com o número da pergunta
      total: 5,    // Total de perguntas
      selectedImage: null,
      answerChecked: false,
      feedbackMessage: "",
      feedbackClass: "",
      currentQuestion: {
        question: "Select: ônibus",
        options: [
          { src: "/img/bus.png", alt: "Bus" },
          { src: "/img/car.png", alt: "Car" },
          { src: "/img/bike.png", alt: "Bike" },
          { src: "/img/train.png", alt: "train" }
        ],
        correctAnswer: 0 
      },
    };
  },
  methods: {
    selectImage(index) {
      this.selectedImage = index;
    },
    checkAnswer() {
      const correct = this.currentQuestion.correctAnswer;
      this.answerChecked = true;

      if (this.selectedImage === correct) {
        this.feedbackMessage = "Correct!";
        this.feedbackClass = "text-success";
      } else {
        this.feedbackMessage = `Wrong! Correct answer: "${this.currentQuestion.options[correct].alt}"`;
        this.feedbackClass = "text-danger";
      }
    },
    nextQuestion() {
      // Reset para a próxima pergunta
      this.answerChecked = false;
      this.selectedImage = null;
      this.feedbackMessage = "";
      this.feedbackClass = "";
      this.current++;

      const nextQuestion = `question${this.current}.html`; // Atualizando para a próxima pergunta
      window.location.href = nextQuestion;  // Redirecionando para a próxima página
    },
    skip() {
      alert("You skipped this question!");
    }
  },
};

createApp(Question4).mount('#app');