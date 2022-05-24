/*
        ================================================> Bugs in it ================================>
        1. In every question, the first choice is the correct answer.
        => It should be given randomly.
        2. In btnchecked the property might get repeat between two question see it is correct.
*/




import React from "react";
import Question from "./Question";
import Alert from "./Alert";
import { ThreeDots } from 'react-loader-spinner'


export default function FormQuiz(props) {
    const { updateShowLogin } = props;
    const [questions, setQuestions] = React.useState([]);// It holds the quizes data comming from the api
    const [answers, setAnswers] = React.useState([]);// It holds my answers
    const [showResults, setShowResults] = React.useState(false);// It tells when to show correct answers and user's score
    const [score, setScore] = React.useState(0);// tells us the score
    const [utilities, setUtilities] = React.useState({
        showAlert: false,
        showLoader: false
    })

    // setting alert
    function setAlert() {
        setUtilities(prevState => ({ ...prevState, showAlert: true }))
        setTimeout(() => {
            setUtilities(prevState => ({ ...prevState, showAlert: false }))
        }, 3000)
    }

    // it converts base64 encoded data coming from api to text and return the object.
    function decodeObj(val) {
        let res = {};
        for (let props in val) {
            let item = val[props];
            if (typeof item == "object") {
                let arr = item.map(val => atob(val))
                res[props] = arr;
            } else {
                res[props] = atob(item);
            }

        }
        return res;
    }

    // check if given object's question property is present in the answers array
    function checkIfExists(obj) {
        if (answers.length === 0) return false;

        for (let val of answers) {
            if (val.question === obj.question) {
                return true;
            }
        }

        return false;
    }

    // it changes the answers State and stores the answers given by the user
    function changeAnswers(Q_A_obj) {
        setAnswers(prevAns => {
            if (checkIfExists(Q_A_obj)) {
                return prevAns.map(val => {
                    if (val.question === Q_A_obj.question) {
                        return { ...val, answer: Q_A_obj.answer }
                    } else {
                        return val;
                    }
                })
            } else {
                return [Q_A_obj, ...prevAns];
            }
        })
    }

    // receives a question and give the correct answer for that question
    function getCorrectAnswer(question) {
        // assuming question will always match
        let resObj = {};
        for (let val of questions) {
            if (val.question === question) {
                resObj.question = val.question;
                resObj.correct_answer = val.correct_answer;
            }
        }
        return resObj;
    }

    // updates the answers & showResults State and also updates the score  
    function handleAnswerChecking(e) {
        e.preventDefault();
        // check if all answers are selected
        if (answers.length !== questions.length) {
            setAlert();
            return;
        }

        // 1. take the question and bring the correct answer for it.
        // 2. Store question, myAnswer, correctAnswer in answers state.
        setAnswers(prevAnswers => {
            return prevAnswers.map(val => {
                let res = getCorrectAnswer(val.question);
                return {
                    question: val.question,
                    myAnswer: val.answer,
                    correct_answer: res.correct_answer
                }
            })
        })
        setShowResults(prevState => !prevState);
    }

    // set all States to thier initialState
    function handlePlayAgain(e) {
        e.preventDefault();
        updateShowLogin(true);
    }

    // return how many correct answers
    function getScore() {
        let count = 0;
        answers.forEach((val) => {
            if (val.myAnswer === val.correct_answer) count++;
            // try to update state here
        })

        setScore(count);
    }

    // update score
    React.useEffect(() => {
        getScore();
    }, [showResults])

    // api called and data in text form is stored in the questions State
    React.useEffect(() => {
        updateShowLogin(false); // set showlogin to false
        setUtilities(prevState => ({ ...prevState, showLoader: true })) // show spinner
        fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple&encode=base64')
            .then(res => res.json())
            .then(data => {
                if (data.response_code === 0) {
                    const results = data.results.map(val => decodeObj(val));
                    setQuestions(results);
                    setUtilities(prevState => ({ ...prevState, showLoader: false }));
                }
            })
            .catch(error => {
                console.log("Api threw this error => " + error);
            })
    }, [])
    return (
        <form className="bg-white h-full w-full flex flex-col items-center justify-around lg:w-4/5 lg:min-h-screen">
            {utilities.showAlert && <Alert msg="Please attempt all questions" />}
            {utilities.showLoader && <ThreeDots color="#00BFFF" />}
            {questions.length > 0 && questions.map((val) => {
                // in choices we are giving correct answer initial it should be given randomly.

                return <Question key={val.question} question={val.question} apiData={questions} correctAnswer={val.correct_answer} changeAnswers={changeAnswers} showResults={showResults} />
            })}

            {!showResults && !utilities.showLoader && <button className="bg-purple-500 text-white w-44 p-2 rounded-lg my-5" onClick={handleAnswerChecking}>check answers</button>}

            {
                showResults &&
                <div className="flex justify-around items-center w-1/2">
                    <p className="text-xl">Your score : <span className="text-green-500 font-bold">{score}</span><span className="font-bold">/5</span></p>
                    <button className="bg-purple-500 text-white w-44 p-2 rounded-lg my-5" onClick={handlePlayAgain}>Play again</button>
                </div>
            }
            
        </form>
    );
}