package com.bitspilani.wilp.splitter.service;

import com.bitspilani.wilp.splitter.dto.TransactionDTO;

import java.util.List;
import java.util.UUID;

public interface TransactionService {
    TransactionDTO createTransaction(final TransactionDTO transactionDTO);

    TransactionDTO getTransactionDetails(final String transactionId);
    List<TransactionDTO> getTransactionsByUserId(final String userId);
    List<TransactionDTO> getTransactionsBetweenUsers(final String userId1, final String userId2);

    TransactionDTO updateTransaction(final String transactionId, final TransactionDTO transactionDTO);
}
