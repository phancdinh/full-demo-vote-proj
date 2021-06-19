import apiService from './ApiService';
import moment from 'moment';

export default {
  getArticles(offset, limit, date) {
    let momentDate = moment();
    if (date) {
      momentDate = moment(date);
    }
    const formatDate = momentDate.format("DDMMYYYY");
    return apiService
      .get(`/api/articles?offset=${offset}&limit=${limit}&filterDate=${formatDate}`, {
      })
      .then((response) => response.data);
  },

  submitVote({articleId, username}) {
    return apiService
      .post(`/api/articles/${articleId}/votes`, {
        username
      })
      .then((response) => response.data);
  },
};
