package com.example.demo.repository;

import com.example.demo.entity.Article;
import com.example.demo.entity.ArticleVote;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;


public interface ArticleVoteRepository extends CrudRepository<ArticleVote, Integer> {
    List<ArticleVote> findAllByUsername(String username);

    Optional<ArticleVote> findByUsernameAndAndArticle(String username, Article article);
}
