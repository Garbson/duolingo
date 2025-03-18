const { createApp, ref } = Vue;

const Question5 = {
  template: `
    <div class="content">
      <!-- Barra de progresso e botão de skip -->
      <div class="d-flex justify-content-between align-items-center mb-3 w-100">
        <div class="progress" style="width: 100%">
          <div class="progress-bar" role="progressbar" :style="{ width: (current) / total * 100 + '%' }"></div>
        </div>
        <button class="btn btn-skip" @click="nextQuestion">Skip</button>
      </div>

      <!-- Colunas de palavras -->
      <div class="pairing-container">
        <div class="pairing-column">
          <div 
            v-for="(word, index) in portugueseWords" 
            :key="index" 
            class="pairing-item"
            :class="{'selected': selectedLeft === index, 'correct': isCorrect(index, 'left'), 'incorrect': isIncorrect(index, 'left') }"
            @click="selectWord('left', index)"
            v-if="!isWordMatched(index, 'left')"
          >
            {{ word }}
          </div>
        </div>

        <div class="pairing-column">
          <div 
            v-for="(word, index) in englishWords" 
            :key="index" 
            class="pairing-item"
            :class="{'selected': selectedRight === index, 'correct': isCorrect(index, 'right'), 'incorrect': isIncorrect(index, 'right') }"
            @click="selectWord('right', index)"
            v-if="!isWordMatched(index, 'right')"
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
      current: 5, 
      total: 5,    
      selectedLeft: null,
      selectedRight: null,
      answerChecked: false,
      feedbackMessage: "",
      feedbackClass: "",
      portugueseWords: ["Casa", "Cachorro", "Rua", "Carro", "Livro"],
      englishWords: ["House", "Dog", "Street", "Car", "Book"],
      correctPairs: [
        { left: 0, right: 0 },
        { left: 1, right: 1 },
        { left: 2, right: 2 },
        { left: 3, right: 3 },
        { left: 4, right: 4 }
      ],
      matchedPairs: [], 
      incorrectPairs: [], 
    };
  },
  methods: {
    selectWord(side, index) {
  
      if (this.selectedLeft !== null && this.selectedRight !== null) return;
      
     
      if (side === 'left' && this.selectedLeft === null) {
        this.selectedLeft = index;
      } 

      if (side === 'right' && this.selectedRight === null) {
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
        const pair = { left: this.selectedLeft, right: this.selectedRight };

        // Se o par for correto
        if (this.correctPairs.some(p => p.left === pair.left && p.right === pair.right)) {
          this.matchedPairs.push(pair); 
          this.selectedLeft = null;      
          this.selectedRight = null;     
          this.feedbackMessage = "Correct!";
          this.feedbackClass = "text-success";  
        } else {
      
          this.incorrectPairs.push(pair); 
          this.feedbackMessage = `Incorrect! Try again.`;
          this.feedbackClass = "text-danger"; 


          setTimeout(() => {
            this.selectedLeft = null;
            this.selectedRight = null;
          }, 1000);
        }
      }
    },

    nextQuestion() {
      this.answerChecked = false;
      this.selectedLeft = null;
      this.selectedRight = null;
      this.feedbackMessage = "";
      this.feedbackClass = "";

      if (this.matchedPairs.length === this.correctPairs.length) {
        this.feedbackMessage = "All pairs matched! Well done!";
        this.feedbackClass = "text-success";
      }
    },

    skip() {
      alert("You skipped this question!");
    }
  },
};

createApp(Question5).mount('#app');