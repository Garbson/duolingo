const { createApp, ref } = Vue;

const Question5 = {
  template: `
    <div class="content">
      <!-- Barra de progresso e botão de skip -->
      <div class="d-flex justify-content-between align-items-center mb-3 w-100">
        <div class="progress" style="width: 100%">
          <div class="progress-bar" role="progressbar" :style="{ width: (current) / total * 100 + '%' }"></div>
        </div>
        <button class="btn btn-skip" @click="skip">Skip</button>
      </div>

      <!-- Enunciado da questão -->
      <h4 class="fw-semibold fs-5 mb-4 text-start w-100">Complete the pairs by matching the words correctly</h4>

      <!-- Colunas de palavras -->
      <div class="pairing-container">
        <div class="pairing-column">
          <div 
            v-for="(word, index) in portugueseWords" 
            :key="'l-' + index"
            class="pairing-item"
            :class="{
              'selected': selectedLeft === index, 
              'correct': isCorrect(index, 'left'),
              'incorrect': isIncorrect(index, 'left'),
              'disabled': isWordMatched(index, 'left')
            }"
            @click="selectWord('left', index)"
            v-if="!isWordMatched(index, 'left')"
          >
            {{ word }}
          </div>
        </div>

        <div class="pairing-column">
          <div 
            v-for="(word, index) in englishWords" 
            :key="'r-' + index"
            class="pairing-item"
            :class="{
              'selected': selectedRight === index, 
              'correct': isCorrect(index, 'right'),
              'incorrect': isIncorrect(index, 'right'),
              'disabled': isWordMatched(index, 'right')
            }"
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

      // Seleção da palavra esquerda
      if (side === 'left' && this.selectedLeft === null) {
        this.selectedLeft = index;
      } 

      // Seleção da palavra direita e verificar a combinação
      if (side === 'right' && this.selectedRight === null) {
        this.selectedRight = index;
        this.checkPair(); 
      }
    },

    // Verificar se a palavra já foi combinada
    isWordMatched(index, side) {
      if (side === 'left') {
        return this.matchedPairs.some(pair => pair.left === index);
      } else {
        return this.matchedPairs.some(pair => pair.right === index);
      }
    },

    // Verificar se a palavra é correta
    isCorrect(index, side) {
      if (side === 'left') {
        return this.matchedPairs.some(pair => pair.left === index && pair.right === this.selectedRight);
      } else {
        return this.matchedPairs.some(pair => pair.right === index && pair.left === this.selectedLeft);
      }
    },

    // Verificar se a palavra é incorreta
    isIncorrect(index, side) {
      if (side === 'left') {
        return this.incorrectPairs.some(pair => pair.left === index && pair.right === this.selectedRight);
      } else {
        return this.incorrectPairs.some(pair => pair.right === index && pair.left === this.selectedLeft);
      }
    },

    // Verificação da combinação
    checkPair() {
      if (this.selectedLeft !== null && this.selectedRight !== null) {
        const leftIdx = this.selectedLeft;
        const rightIdx = this.selectedRight;
        const leftWord = this.portugueseWords[leftIdx];
        const rightWord = this.englishWords[rightIdx];
        const isMatch = this.correctPairs.some(
          (pair) => pair.left === leftWord && pair.right === rightWord
        );

        if (isMatch) {
          this.matchedPairs.push({ left: leftIdx, right: rightIdx });
          this.selectedLeft = null;
          this.selectedRight = null;
          this.feedbackMessage = "Correct!";
          this.feedbackClass = "text-success";
        } else {
          this.incorrectPairs.push({ left: leftIdx, right: rightIdx });
          this.feedbackMessage = "Incorrect! Try again.";
          this.feedbackClass = "text-danger";
          setTimeout(() => {
            this.selectedLeft = null;
            this.selectedRight = null;
          }, 1000);
        }
      }
    },

    // Função para avançar para a próxima questão
    nextQuestion() {
      if (this.matchedPairs.length === this.correctPairs.length) {
        this.feedbackMessage = "All pairs matched! Well done!";
        this.feedbackClass = "text-success";
      }
      this.answerChecked = false;
      this.selectedLeft = null;
      this.selectedRight = null;
      this.feedbackMessage = "";
      this.feedbackClass = "";

      if (this.matchedPairs.length === this.correctPairs.length) {
        setTimeout(() => {
          const nextQuestion = `question${this.current + 1}.html`;
          window.location.href = nextQuestion;
        }, 1000);
      }
    },

    // Função de skip
    skip() {
      alert("You skipped this question!");
    }
  },
};

createApp(Question5).mount('#app');