package com.error404.laalkhata.exception;

import org.springframework.http.HttpStatus;

public class InvalidPercentageException extends BaseException{
    public InvalidPercentageException(String msg) {
        super(HttpStatus.BAD_REQUEST, msg);
    }
}
