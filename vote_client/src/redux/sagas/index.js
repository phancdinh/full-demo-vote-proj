import { all } from 'redux-saga/effects';
import userEffects from './userEffects';
import articleEffects from './articleEffects';

export default function* rootSaga() {
  yield all([
    ...userEffects,
    ...articleEffects
  ]);
}
