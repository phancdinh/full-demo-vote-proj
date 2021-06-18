package com.example.demo.exception;
public class ReachVoteCountException extends RuntimeException {
    public ReachVoteCountException(String message) {
        super(message);
    }
}
