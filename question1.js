const { createApp, ref } = Vue;

const Question1 = {
    template: `
        <div class="content">
            <!-- Progress Bar -->
            <div class="d-flex justify-content-between align-items-center mb-3 w-100">
                <div class="progress" style="width: 80%">
                    <div class="progress-bar" role="progressbar" :style="{ width: (current + 1) / total * 100 + '%' }"></div>
                </div>
            </div>

            <!-- Question -->
            <h4 class="fw-semibold fs-5 mb-4 text-start w-100">{{ currentQuestion.question }}</h4>

            <!-- Options -->
            <div class="list-group mb-4 w-100">
                <button 
                    v-for="(option, index) in currentQuestion.options" 
                    :key="index" 
                    class="list-group-item"
                    @click="checkAnswer(index)"
                >
                    {{ option }}
                </button>
            </div>

            <!-- Verify Button -->
            <div class="fixed-bottom py-3" style="background-color: #121212">
                <div class="container px-4">
                    <button 
                        class="btn btn-success w-100" 
                        :disabled="selectedWords.length === 0" 
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
            currentQuestion: {
                question: "Translate to English: 'La maison est grande.'",
                options: ["The house is big", "The house is small", "The house is large", "Big house"],
                correctAnswer: 0
            },
            selectedWords: ref([]),
            selectedIndexes: ref([]),
        };
    },
    methods: {
        checkAnswer(index) {
            const correctAnswer = this.currentQuestion.correctAnswer;
            if (index === correctAnswer) {
                alert("Correct!");
            } else {
                alert("Wrong!");
            }
        }
    },
};

createApp(Question1).mount('#app');