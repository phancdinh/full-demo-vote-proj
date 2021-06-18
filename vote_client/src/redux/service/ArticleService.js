import apiService from './ApiService';

export default {
  getArticles() {
    return apiService
      .get('/api/articles', {
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
