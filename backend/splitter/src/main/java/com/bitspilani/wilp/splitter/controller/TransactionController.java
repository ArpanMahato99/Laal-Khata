package com.bitspilani.wilp.splitter.controller;

import com.bitspilani.wilp.splitter.dto.TransactionDTO;
import com.bitspilani.wilp.splitter.service.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/v1/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction (@RequestBody final TransactionDTO transactionDTO){
        TransactionDTO txnDTO = transactionService.createTransaction(transactionDTO);
        return new ResponseEntity<>(txnDTO, HttpStatus.CREATED);
    }
}
