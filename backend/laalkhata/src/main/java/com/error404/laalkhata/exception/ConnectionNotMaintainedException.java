package com.error404.laalkhata.exception;

import org.springframework.http.HttpStatus;

public class ConnectionNotMaintainedException extends BaseException{
    public ConnectionNotMaintainedException( String msg) {
        super(HttpStatus.BAD_REQUEST, msg);
    }
}
