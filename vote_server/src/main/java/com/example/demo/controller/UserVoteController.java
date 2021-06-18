package com.example.demo.controller;

import com.example.demo.dto.UserVoteCreateRequest;
import com.example.demo.entity.UserVote;
import com.example.demo.facade.UserVoteFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/users")
@RequiredArgsConstructor
public class UserVoteController {

    private UserVoteFacade userVoteFacade;

    @GetMapping("/{username}/votes")
    public ResponseEntity< List<UserVote>> getVotes(@PathVariable String username) {
        List<UserVote> userVotes = userVoteFacade.getVotes(username);
        return ResponseEntity.ok(userVotes);
    }
    @PostMapping("/{username}/votes")
    public ResponseEntity<UserVote> createVote(@PathVariable String username, UserVoteCreateRequest createRequest) {
        UserVote userVote = userVoteFacade.createUserVote(username, createRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(userVote);
    }
}
