package com.example.demo.controller;

import com.example.demo.entity.Article;
import com.example.demo.entity.ArticleVote;
import com.example.demo.facade.ArticleFacade;
import com.example.demo.payload.UserVoteCreateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleFacade articleFacade;

    @GetMapping("")
    public ResponseEntity< List<Article>> getVotes(@RequestParam(required = false, defaultValue = "0") int offset,
                                                   @RequestParam(required = false, defaultValue = "10") int limit,
                                                   @RequestParam(required = false) @DateTimeFormat(pattern = "ddMMyyyy") Date filterDate) {
        List<Article> articleVotes = articleFacade.getArticles(offset, limit, filterDate);
        return ResponseEntity.ok(articleVotes);
    }
    @PostMapping("/{articleId}/votes")
    public ResponseEntity<ArticleVote> createVote(@PathVariable Integer articleId, @RequestBody UserVoteCreateRequest createRequest) {
        ArticleVote userVote = articleFacade.createUserVote(articleId, createRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(userVote);
    }
}
