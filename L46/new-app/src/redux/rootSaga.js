import { all, delay, put, takeEvery, takeLatest, call } from 'redux-saga/effects'
import { incrementCounterSaga, decrementCounterSaga, incrementCounterSagaAsync, decrementCounterSagaAsync, swapiPeopleData } from './counterSagaSlice'

function* incrementSaga() {
  yield delay(1000)
  yield put(incrementCounterSaga(1))
}

function* decrementSaga() {
  yield delay(1000)
  yield put(decrementCounterSaga(1))
}

function* swapiPeopleWorker() {
  const responce = yield call(fetch,'https://swapi.info/api/people');
  const dataSaga = yield call(()=>responce.json());
  yield put(swapiPeopleData(dataSaga))
}

function* watchCounterSagas() {
  yield takeEvery(incrementCounterSagaAsync.type, incrementSaga)
  yield takeEvery(decrementCounterSagaAsync.type, decrementSaga)
  yield takeLatest('swapiPeople', swapiPeopleWorker)
}

export default function* rootSaga() {
  yield all([watchCounterSagas()])
}