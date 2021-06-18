import {LOAD_ARTICLE_DONE} from "../actions/Actions";
import {keyBy, map, uniq, get} from "lodash";

const defaultArticleState = {
    allIds: [],
    articles: {}
};


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
        default:
            return state;
    }
};

export const getArticleById = (state, id) => {
    const {articleReducer} = state;
    return get(articleReducer.articles, `${id}`, null);
}