package com.example.demo.repository;

import com.example.demo.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;


public interface ArticleRepository extends JpaRepository<Article, Integer> {
    @Query("select a from Article a where a.createdDate >= :beginTime and a.createdDate <= :endTime")
    Page<Article> findWithCreationDateTimeBefore(
            @Param("beginTime") Date beginTime,
            @Param("endTime") Date endTime,
            Pageable pageable
    );

}
