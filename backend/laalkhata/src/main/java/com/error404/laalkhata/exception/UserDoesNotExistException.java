package com.error404.laalkhata.exception;

import org.springframework.http.HttpStatus;

public class UserDoesNotExistException extends BaseException {
    public UserDoesNotExistException( String msg) {
        super(HttpStatus.NOT_FOUND, msg);
    }
}
