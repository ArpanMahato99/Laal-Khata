package com.error404.laalkhata.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BaseException extends RuntimeException {

    private HttpStatus status;

    public BaseException(HttpStatus status, String msg) {
        super(msg);
        this.status = status;
    }
}
