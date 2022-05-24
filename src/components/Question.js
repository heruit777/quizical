import React from "react";
import useGetAnswers from "../hooks/useGetAnswers";

// a question should maintain
// 1. correct_answer
// 2. my_answer

export default function Question(props) {
    const { question, apiData, changeAnswers, showResults, correctAnswer } = props;

    // current choice
    const [myAns, setMyAns] = React.useState(""); 

    // gives a random arrangement of choices
    const choices = React.useRef(useGetAnswers(question, apiData));

    // update answers and set myAns to currently selected value
    function handleChange(e) {
        changeAnswers({
            question,
            answer: e.target.value
        })
        setMyAns(e.target.value)
    }

    return (
        <div className="w-4/5 space-y-2 shadow-xl py-4 px-2 text-sm">
            <h2 className="text-xl font-semibold">{question}</h2>
            <div className="flex justify-between space-y-2 items-center flex-wrap">
                {!showResults ? choices.current.map(choice => {
                    return (
                        <button key={choice} type="button" className={`w-full mt-2 border border-[#4D5B9E] rounded-lg flex justify-center items-center px-5 py-1 hover:bg-[#9ca3c7] focus:bg-[#4D5B9E] ${myAns === choice && 'bg-[#4D5B9E]'}`} value={choice} onClick={handleChange}>
                            {choice}
                        </button>
                    )
                })
                    : choices.current.map(choice => {
                        return (
                            <button type="button" className={`w-full mt-2 border border-[#4D5B9E] rounded-lg flex justify-center items-center px-5 py-1 ${correctAnswer === choice && 'bg-green-300'} ${myAns !== correctAnswer && myAns === choice && 'bg-red-300'}`} key={choice}>{choice}</button>
                        )
                    })}
            </div>
        </div>
    );
}