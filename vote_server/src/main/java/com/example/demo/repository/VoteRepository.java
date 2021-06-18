package com.example.demo.repository;

import com.example.demo.entity.Vote;
import org.springframework.data.repository.CrudRepository;


public interface VoteRepository extends CrudRepository<Vote, Integer> {
}
