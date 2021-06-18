package com.example.demo.facade;

import com.example.demo.entity.Article;
import com.example.demo.payload.UserVoteCreateRequest;
import com.example.demo.entity.ArticleVote;
import com.example.demo.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleFacade {

    private final ArticleService articleService;

    public List<Article> getArticles() {
        return articleService.getArticle();
    }

    public ArticleVote createUserVote(Integer articleId, UserVoteCreateRequest voteCreateRequest) {
        return articleService.createArticleVote(articleId, voteCreateRequest);
    }
}
