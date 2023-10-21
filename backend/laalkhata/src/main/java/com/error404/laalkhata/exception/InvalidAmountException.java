package com.error404.laalkhata.exception;

import org.springframework.http.HttpStatus;

public class InvalidAmountException extends BaseException{
    public InvalidAmountException(String msg) {
        super(HttpStatus.BAD_REQUEST, msg);
    }
}
