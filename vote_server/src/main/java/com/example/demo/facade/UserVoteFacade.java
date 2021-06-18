package com.example.demo.facade;

import com.example.demo.dto.UserVoteCreateRequest;
import com.example.demo.entity.UserVote;
import com.example.demo.service.UserVoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserVoteFacade {

    private UserVoteService userVoteService;

    public List<UserVote> getVotes(String username) {
        return userVoteService.getVotes(username);
    }

    public UserVote createUserVote(String username, UserVoteCreateRequest voteCreateRequest) {
        return userVoteService.createUserVote(username, voteCreateRequest);
    }
}
