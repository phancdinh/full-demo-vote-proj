package com.example.demo.exception;
public class DataNotExistingException extends RuntimeException {
    public DataNotExistingException(String message) {
        super(message);
    }
}
