import React, {Component} from 'react';
import {LOAD_ARTICLE_START, SUBMIT_VOTE_START} from "../redux/actions/Actions";
import {connect} from "react-redux";
import {getArticleById, getOwnVote, getTotalVote} from "../redux/reducers/articleReducer";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getUsername} from "../redux/reducers/userReducer";

class Article extends Component {
    componentDidMount() {
        const {loadArticles} = this.props;
        loadArticles();
    }

    handleClickVote = () => {
        const {articleId, submitVote, ownedVote} = this.props;
        if (ownedVote && ownedVote.count >= 3) {
            return false;
        }
        submitVote(articleId);
    };

    render() {
        const {article, ownedVote, totalVote} = this.props;
        const icon = ownedVote ? <i className="bi bi-heart-fill" /> : <i className="bi bi-heart" />;
        return (
                <Card border="primary" className="mt-2">
                    <Card.Header>
                        <Row>
                            <Col md={8}>
                                {article.name}
                            </Col>
                            <Col md={4} className="text-right">
                                <span className="mr-2">{totalVote}</span>
                                <span onClick={this.handleClickVote}>{icon}</span>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>
                        <Card.Text>
                            {article.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
        );
    }
}

function mapStateToProps(state, props) {
    const username = getUsername(state);
    const article = getArticleById(state, props.articleId);
    const totalVote = getTotalVote(state, props.articleId);
    const vote = getOwnVote(state, props.articleId, username);
    return {
        article,
        totalVote,
        ownedVote: vote
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadArticles: () => dispatch({type: LOAD_ARTICLE_START}),
    submitVote: (articleId) => dispatch({
        type: SUBMIT_VOTE_START,
        payload: {
            articleId
        }
    })
});

export default connect(
        mapStateToProps,
        mapDispatchToProps,
)(Article);
