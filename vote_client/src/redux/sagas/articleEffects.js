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
import {TOKEN_LOCAL_STORAGE_KEY} from "../../constants/constants";


function parseJwt (token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


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
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || '';
    const bodyPayload = parseJwt(token);
    const username = bodyPayload.sub;
    const submitVote = yield call(ArticleService.submitVote, {articleId: payload.articleId, username});
    yield put({
      type: SUBMIT_VOTE_DONE,
      payload: {
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
