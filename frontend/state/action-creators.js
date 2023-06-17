import axios from "axios"

import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_INFO_MESSAGE,
  SET_SELECTED_ANSWER,
  INPUT_CHANGE,
  RESET_FORM
} from "./action-types"

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise(index) {
  return { type: MOVE_CLOCKWISE, payload: index }
}

export function moveCounterClockwise(index) {
  return { type: MOVE_COUNTERCLOCKWISE, payload: index }
}

export function selectAnswer(answer) {
  console.log(answer);
  return {type: SET_SELECTED_ANSWER, payload: answer}
 }

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message}
 }

export function setQuiz(quiz) {
  return { type: SET_QUIZ_INTO_STATE, payload: quiz}
}

export function inputChange(key, value) { 
  const payload = {key: key, value: value}
  return {type: INPUT_CHANGE, payload: payload}
}

export function resetForm() {
  return {type: RESET_FORM}
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get('http://localhost:9000/api/quiz/next').then(res => {
      dispatch(setQuiz(res.data))
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', answer).then(res => {
      console.log(res.data.message)
      dispatch(setMessage(res.data.message));
      dispatch(fetchQuiz());
      dispatch(selectAnswer(null));
    }).catch(err => {
      console.error(err);
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(quiz) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    console.log(quiz);
    const data = {
      question_text: quiz.newQuestion,
      true_answer_text: quiz.newTrueAnswer,
      false_answer_text: quiz.newFalseAnswer
    };
    axios.post('http://localhost:9000/api/quiz/new', data).then(res => {
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`));
      dispatch(resetForm());
    }).catch(err => {
      console.error(err);
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
