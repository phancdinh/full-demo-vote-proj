package com.example.demo.service;

import com.example.demo.payload.UserVoteCreateRequest;
import com.example.demo.entity.ArticleVote;
import com.example.demo.entity.Article;
import com.example.demo.exception.DataNotExistingException;
import com.example.demo.exception.ReachVoteCountException;
import com.example.demo.repository.ArticleVoteRepository;
import com.example.demo.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private int MAX_COUNT = 3;

    private final ArticleVoteRepository articleVoteRepository;
    private final ArticleRepository articleRepository;

    public static Date atStartOfDay(Date date) {
        LocalDateTime localDateTime = dateToLocalDateTime(date);
        LocalDateTime startOfDay = localDateTime.with(LocalTime.MIN);
        return localDateTimeToDate(startOfDay);
    }

    public static Date atEndOfDay(Date date) {
        LocalDateTime localDateTime = dateToLocalDateTime(date);
        LocalDateTime endOfDay = localDateTime.with(LocalTime.MAX);
        return localDateTimeToDate(endOfDay);
    }


    private static LocalDateTime dateToLocalDateTime(Date date) {
        return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
    }

    private static Date localDateTimeToDate(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }
    public Page<Article> getArticle(int offset, int limit, Date date) {
        if (date == null) {
            date = new Date();
        }
        Date begin = atStartOfDay(date);
        Date end = atEndOfDay(date);
        Pageable pageable = PageRequest.of(offset, limit);

        return articleRepository.findWithCreationDateTimeBefore(begin, end, pageable);
    }

    public ArticleVote createArticleVote(Integer articleId, UserVoteCreateRequest voteCreateRequest) {
        Optional<Article> optionalVote = articleRepository.findById(articleId);
        if (optionalVote.isEmpty()) {
            throw new DataNotExistingException("Vote is not existed with id " + articleId);
        }
        Article article = optionalVote.get();
        Optional<ArticleVote> userVoteOptional = articleVoteRepository.findByUsernameAndAndArticle(voteCreateRequest.getUsername(), article);
        if (checkCanCreateNewPost(userVoteOptional)) {
            ArticleVote articleVote;
            if (userVoteOptional.isPresent()) {
                articleVote = userVoteOptional.get();
                articleVote.setCount(articleVote.getCount() + 1);
            } else {
                articleVote = new ArticleVote();
                articleVote.setUsername(voteCreateRequest.getUsername());
                articleVote.setCount(1);
                articleVote.setArticle(article);
            }
            return articleVoteRepository.save(articleVote);
        }
        throw new ReachVoteCountException("You can not vote more than 3 times");

    }

    public boolean checkCanCreateNewPost(Optional<ArticleVote> userVoteOptional) {
        if (userVoteOptional.isEmpty()) return true;
        ArticleVote articleVote = userVoteOptional.get();
        return articleVote.getCount() < MAX_COUNT;
    }
}
