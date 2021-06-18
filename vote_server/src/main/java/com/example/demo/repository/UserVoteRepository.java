package com.example.demo.repository;

import com.example.demo.entity.UserVote;
import com.example.demo.entity.Vote;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;


public interface UserVoteRepository extends CrudRepository<UserVote, Integer> {
    List<UserVote> findAllByUsername(String username);

    Optional<UserVote> findByUsernameAndVote(String username, Vote vote);
}
