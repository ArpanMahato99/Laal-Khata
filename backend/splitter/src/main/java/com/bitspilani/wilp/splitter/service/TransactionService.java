package com.bitspilani.wilp.splitter.service;

import com.bitspilani.wilp.splitter.dto.TransactionDTO;

import java.util.List;
import java.util.UUID;

public interface TransactionService {
    TransactionDTO createTransaction(final TransactionDTO transactionDTO);

    TransactionDTO getTransactionDetails(final UUID transactionId);
    List<TransactionDTO> getTransactionsByUserId(final String userId);
    List<TransactionDTO> getTransactionsBetweenUsers(final UUID uuid1, final UUID uuid2);

    TransactionDTO updateTransaction(final TransactionDTO transactionDTO);

    void settleTransactions(final List<TransactionDTO> transactionDTOList);
}
