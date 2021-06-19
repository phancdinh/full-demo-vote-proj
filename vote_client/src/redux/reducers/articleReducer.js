import {LOAD_ARTICLE_DONE, SUBMIT_VOTE_DONE} from "../actions/Actions";
import {keyBy, map, uniq, get, sumBy, find} from "lodash";

const defaultArticleState = {
    allIds: [],
    articles: {},
    listing: {
        isFetching: false,
        filter: {
            date: null,
        },
        currentLimit: 5,
        currentOffset: 0,
        ids: [],
        error: null,
    },
};

export const listingSelector = (state) => state.articleReducer.listing;

export default (state = defaultArticleState, {type, payload}) => {
    switch (type) {
        case LOAD_ARTICLE_DONE: {
            const newMap = keyBy(payload.articles, 'id');
            const newAllIds = map(payload.articles, 'id');
            const joinIds = uniq([...state.allIds, ...newAllIds]);

            return {
                ...state,
                articles: {...state.articles, ...newMap},
                allIds: [...joinIds],
            };
        }
        case SUBMIT_VOTE_DONE: {
            const {vote, articleId} = payload;
            const article = get(state.articles, `${articleId}`);
            const oldVote = find(article.articleVotes, {id: vote.id})
            if (oldVote) {
                oldVote.count = vote.count;
            } else {
                article.articleVotes.push(payload.vote);
            }
            return {
                ...state,
                articles: {
                    ...state.articles,
                    [payload.articleId]: article
                },
            };
        }
        default:
            return state;
    }
};

export const getArticleById = (state, id) => {
    const {articleReducer} = state;
    return get(articleReducer.articles, `${id}`, null);
}
export const getTotalVote = (state, id) => {
    const article = getArticleById(state, id);
    return sumBy(article.articleVotes, 'count');
}
export const getOwnVote = (state, id, username) => {
    const article = getArticleById(state, id);
    return find(article.articleVotes, {'username': username});
}