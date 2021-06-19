import React, {Component} from 'react';
import {LOAD_ARTICLE_START} from "../redux/actions/Actions";
import {connect} from "react-redux";
import Article from "./Article";


class Home extends Component {
    componentDidMount() {
        const {loadArticles} = this.props;
        loadArticles();
    }

    render() {
        const {allIds} = this.props;
        const rows = allIds.map((id) => (
                <Article
                        key={id}
                        articleId={id}
                />
        ));

        const content = allIds.length > 0 ?
                rows : <div>No article</div>

        return (
                <div className="col-12">
                    <div className="header bg-success">
                        header
                    </div>
                    {content}
                </div>
        );
    }
}

function mapStateToProps(state) {
    const {articleReducer} = state;
    const {allIds} = articleReducer;
    return {
        allIds,
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadArticles: () => dispatch({type: LOAD_ARTICLE_START}),
});

export default connect(
        mapStateToProps,
        mapDispatchToProps,
)(Home);
