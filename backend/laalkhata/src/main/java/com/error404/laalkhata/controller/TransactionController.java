package com.error404.laalkhata.controller;

import com.error404.laalkhata.dto.TransactionDTO;
import com.error404.laalkhata.exception.ConnectionNotMaintainedException;
import com.error404.laalkhata.service.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("api/v1/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction (@RequestBody final TransactionDTO transactionDTO) throws ConnectionNotMaintainedException {
        TransactionDTO txnDTO = transactionService.createTransaction(transactionDTO);
        return new ResponseEntity<>(txnDTO, HttpStatus.CREATED);
    }

    @PatchMapping()
    public ResponseEntity<TransactionDTO> updateTransaction (@RequestBody final TransactionDTO transactionDTO) {
        TransactionDTO updatedTransactionDTO = transactionService.updateTransaction(transactionDTO);
        return  new ResponseEntity<>(updatedTransactionDTO, HttpStatus.ACCEPTED);
    }

    @PutMapping
    public ResponseEntity<?> settleTransactions (@RequestBody final List<TransactionDTO> transactionDTOList) {
        log.error(transactionDTOList.toString());
        transactionService.settleTransactions(transactionDTOList);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getAllTransactionBetweenTwoUsers(
            @RequestParam(name = "user1Id") UUID user1Id,
            @RequestParam(name = "user2Id") UUID user2Id ) {
        List<TransactionDTO> txns = transactionService.getTransactionsBetweenUsers(user1Id, user2Id);
        return new ResponseEntity<>(txns, HttpStatus.OK);
    }

    @GetMapping("{transactionId}")
    public ResponseEntity<TransactionDTO> getTransactionDetails (@PathVariable final UUID transactionId) {
        TransactionDTO transactionDTO = transactionService.getTransactionDetails(transactionId);
        return new ResponseEntity<>(transactionDTO, HttpStatus.OK);
    }


}
