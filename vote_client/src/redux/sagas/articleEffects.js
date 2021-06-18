import {
  call,
  put,
  takeLeading,
} from 'redux-saga/effects';
import {
  LOAD_ARTICLE_DONE,
  LOAD_ARTICLE_START, SUBMIT_VOTE_DONE, SUBMIT_VOTE_START,
} from '../actions/Actions';
import ArticleService from '../service/ArticleService';
import {getUsername} from "../reducers/userReducer";
import {select} from "@redux-saga/core/effects";

export function* loadArticles() {
  try {
    const articles = yield call(ArticleService.getArticles);
    yield put({
      type: LOAD_ARTICLE_DONE,
      payload: {
        articles
      }
    });
  } catch (error) {
    alert(error);
  };
}

export function* submitVote({payload}) {
  try {
    const username = yield select(getUsername);
    const submitVote = yield call(ArticleService.submitVote, {articleId: payload.articleId, username});
    yield put({
      type: SUBMIT_VOTE_DONE,
      payload: {
        vote: submitVote,
        articleId: payload.articleId
      }
    });
  } catch (error) {
    alert(error);
  };
}


export default [
  takeLeading(LOAD_ARTICLE_START, loadArticles),
  takeLeading(SUBMIT_VOTE_START, submitVote),
];
