import React, { Component } from 'react'
import { ProgressBar } from '../ProgressBar'
import { Levels } from '../Levels'
import { QuizMarvel } from '../QuizMarvel'


export class Quiz extends Component {

    state = {
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,

    }

    loadQuestions = quizz => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest);
            this.setState({
                storedQuestions: newArray
            })
        } else {
            console.log("pas assez de questions")
        }
        console.log(quizz)
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            console.log(this.state.storedQuestions)
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }
    }

    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
        console.log(selectedAnswer)

    }

    render() {

        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p key={index} className={`answerOptions ${this.state.userAnswer === option ? "selected" : ""}`} onClick={() => this.submitAnswer(option)}>{option}</p>
            )
        })


        return (
            <>
                <div>
                    <Levels />
                    <ProgressBar />
                </div>

                <h2>{this.state.question}</h2>

                {displayOptions}

                <button className='btnSubmit' disabled={this.state.btnDisabled}>Suivant</button>

            </>
        )
    }
}

export default Quiz