package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@ToString(exclude = "article")
@Setter
@Getter
@Entity
@Table(name = "article_votes")
public class ArticleVote {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    private String username;

    private Integer count;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "acticle_id", nullable = false)
    @JsonIgnore
    private Article article;
}
