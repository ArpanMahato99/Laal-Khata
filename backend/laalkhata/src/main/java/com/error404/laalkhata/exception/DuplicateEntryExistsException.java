package com.error404.laalkhata.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class DuplicateEntryExistsException extends BaseException {

    public DuplicateEntryExistsException(String msg) {
        super(HttpStatus.BAD_REQUEST,msg);
    }
}
