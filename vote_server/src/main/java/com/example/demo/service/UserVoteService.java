package com.example.demo.service;

import com.example.demo.dto.UserVoteCreateRequest;
import com.example.demo.entity.UserVote;
import com.example.demo.entity.Vote;
import com.example.demo.exception.DataNotExistingException;
import com.example.demo.exception.ReachVoteCountException;
import com.example.demo.repository.UserVoteRepository;
import com.example.demo.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserVoteService {

    private int MAX_COUNT = 3;

    private UserVoteRepository userVoteRepository;
    private VoteRepository voteRepository;

    public List<UserVote> getVotes(String username) {
        return userVoteRepository.findAllByUsername(username);
    }

    public UserVote createUserVote(String username, UserVoteCreateRequest voteCreateRequest) {
        Optional<Vote> optionalVote = voteRepository.findById(voteCreateRequest.getVoteId());
        if (optionalVote.isEmpty()) {
            throw new DataNotExistingException("Vote is not existed with id " + voteCreateRequest.getVoteId());
        }
        Vote vote = optionalVote.get();
        Optional<UserVote> userVoteOptional = userVoteRepository.findByUsernameAndVote(username, vote);
        if (checkCanCreateNewPost(userVoteOptional)) {
            UserVote userVote;
            if (userVoteOptional.isPresent()) {
                userVote = userVoteOptional.get();
                userVote.setCount(userVote.getCount() + 1);
            } else {
                userVote = UserVote.builder()
                        .username(username)
                        .count(1)
                        .vote(vote)
                        .build();
            }
            return userVoteRepository.save(userVote);

        }
        throw new ReachVoteCountException("You can not vote more than 3 times");

    }

    public boolean checkCanCreateNewPost(Optional<UserVote> userVoteOptional) {
        if (userVoteOptional.isEmpty()) return true;
        UserVote userVote = userVoteOptional.get();
        return userVote.getCount() < MAX_COUNT;
    }
}
