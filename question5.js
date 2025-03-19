const { createApp, ref } = Vue;

const Question5 = {
  template: `
    <div class="content">
      <!-- Barra de Progresso -->
      <div class="d-flex justify-content-between align-items-center mb-3 w-100">
        <div class="progress w-100">
          <div class="progress-bar" role="progressbar" :style="{ width: (current + 1) / total * 100 + '%' }"></div>
        </div>
      </div>

      <h4 class="fw-semibold fs-5 mb-4 text-start w-100">Complete the pairs by matching the words correctly (always select from left to right)</h4>

      <!-- Colunas de palavras -->
      <div class="pairing-container">
        <div class="pairing-column">
          <div 
            v-for="(word, index) in portugueseWords" 
            :key="'l-' + index"
            class="pairing-item"
            :class="{ 'disabled': isWordMatched(index, 'left'), 'correct': isCorrect(index, 'left'), 'incorrect': isIncorrect(index, 'left') }"
            @click="selectWord('left', index)"
            :disabled="isWordMatched(index, 'left')"  
          >
            {{ word }}
          </div>
        </div>

        <div class="pairing-column">
          <div 
            v-for="(word, index) in englishWords" 
            :key="'r-' + index"
            class="pairing-item"
            :class="{ 'disabled': isWordMatched(index, 'right'), 'correct': isCorrect(index, 'right'), 'incorrect': isIncorrect(index, 'right') }"
            @click="selectWord('right', index)"
            :disabled="isWordMatched(index, 'right')"  
          >
            {{ word }}
          </div>
        </div>
      </div>

      <!-- Feedback -->
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
      current: 4,  // Define a questão como a 5
      total: 5,    // Total de perguntas
      selectedLeft: null,
      selectedRight: null,
      feedbackMessage: "",
      feedbackClass: "",
      portugueseWords: ["Casa", "Cachorro", "Rua", "Carro", "Livro"],
      englishWords: ["House", "Dog", "Street", "Car", "Book"],
      matchedPairs: [], 
      incorrectPairs: [], 
      correctPairs: [
        { left: 0, right: 0 },
        { left: 1, right: 1 },
        { left: 2, right: 2 },
        { left: 3, right: 3 },
        { left: 4, right: 4 }
      ],
    };
  },
  methods: {
    selectWord(side, index) {
      if (side === 'left') {
        this.selectedLeft = index;
      } 
      if (side === 'right') {
        this.selectedRight = index;
        this.checkPair();
      }
    },

    isWordMatched(index, side) {
      if (side === 'left') {
        return this.matchedPairs.some(pair => pair.left === index);
      } else {
        return this.matchedPairs.some(pair => pair.right === index);
      }
    },

    isCorrect(index, side) {
      if (side === 'left') {
        return this.matchedPairs.some(pair => pair.left === index && pair.right === this.selectedRight);
      } else {
        return this.matchedPairs.some(pair => pair.right === index && pair.left === this.selectedLeft);
      }
    },

    isIncorrect(index, side) {
      if (side === 'left') {
        return this.incorrectPairs.some(pair => pair.left === index && pair.right === this.selectedRight);
      } else {
        return this.incorrectPairs.some(pair => pair.right === index && pair.left === this.selectedLeft);
      }
    },

    checkPair() {

      if (this.selectedLeft !== null && this.selectedRight !== null) {
        const leftIndex = this.selectedLeft;
        const rightIndex = this.selectedRight;


        const correctPair = this.correctPairs.some(pair => 
          (pair.left === leftIndex && pair.right === rightIndex) || 
          (pair.left === rightIndex && pair.right === leftIndex)
        );

        if (correctPair) {
       
          this.matchedPairs.push({ left: leftIndex, right: rightIndex });
          this.selectedLeft = null;
          this.selectedRight = null;
          this.feedbackMessage = "Correct!";
          this.feedbackClass = "text-success";
        } else {
         
          this.incorrectPairs.push({ left: leftIndex, right: rightIndex });
          this.feedbackMessage = "Incorrect! Try again.";
          this.feedbackClass = "text-danger";

         
          setTimeout(() => {
            this.selectedLeft = null;
            this.selectedRight = null;
          }, 1000);
        }
      }
    },

    nextQuestion() {
      if (this.matchedPairs.length === this.correctPairs.length) {
        this.feedbackMessage = "All pairs matched! Well done!";
        this.feedbackClass = "text-success";
      }

      const nextQuestion = `question${this.current + 1}.html`; 
      window.location.href = nextQuestion;
    },
    
    skip() {
      alert("You skipped this question!");
    }
  },
};

createApp(Question5).mount('#app');