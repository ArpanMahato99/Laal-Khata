package com.error404.laalkhata.service;

import com.error404.laalkhata.dto.TransactionDTO;
import com.error404.laalkhata.exception.ConnectionNotMaintainedException;
import com.error404.laalkhata.exception.InvalidAmountException;

import java.util.List;
import java.util.UUID;

public interface TransactionService {

    TransactionDTO createTransaction(final TransactionDTO transactionDTO) throws ConnectionNotMaintainedException, InvalidAmountException;

    TransactionDTO getTransactionDetails(final UUID transactionId);
    List<TransactionDTO> getTransactionsByUserId(final UUID userId);
    List<TransactionDTO> getTransactionsBetweenUsers(final UUID uuid1, final UUID uuid2);

    TransactionDTO updateTransaction(final TransactionDTO transactionDTO);

    void settleTransactions(final List<TransactionDTO> transactionDTOList);
}
