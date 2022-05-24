// takes array of choices arrange them in random order
function randomArrangement(arr) {
        
    // 1. run a loop till half
    // 2. take one random number between 0 to arr.length - 1
    // 3. swap the array elements of i to random number
    for (let i = 0; i <= arr.length / 2; i++) {
        let randomNum = Math.floor(Math.random() * (((arr.length - 1) - 0) + 1) + 0);
        let temp = arr[i];
        arr[i] = arr[randomNum];
        arr[randomNum] = temp;
    }
    return arr;
}

export default function useGetAnswers(question, apiData) {
    // will return an array of answers
    for (let val of apiData) {
        if (val.question === question) {
            return randomArrangement([...val.incorrect_answers, val.correct_answer]);
        }
    }
}