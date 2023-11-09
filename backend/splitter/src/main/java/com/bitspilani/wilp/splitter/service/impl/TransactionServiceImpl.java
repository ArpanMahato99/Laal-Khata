package com.bitspilani.wilp.splitter.service.impl;

import com.bitspilani.wilp.splitter.dto.TransactionDTO;
import com.bitspilani.wilp.splitter.enums.TransactionStatus;
import com.bitspilani.wilp.splitter.exception.InvalidDataException;
import com.bitspilani.wilp.splitter.model.Connection;
import com.bitspilani.wilp.splitter.model.Transaction;
import com.bitspilani.wilp.splitter.repository.TransactionRepository;
import com.bitspilani.wilp.splitter.service.TransactionService;
import com.bitspilani.wilp.splitter.utils.Constants;
import com.bitspilani.wilp.splitter.utils.GeneralUtils;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public TransactionDTO createTransaction(TransactionDTO transactionDTO) {

        if (transactionDTO.getTotalAmount() <= 0) {
            throw new InvalidDataException(Constants.INVALID_AMOUNT_MSG);
        }
        transactionDTO.getUserTransactionDetails()
                .forEach((userId, transactionDetailsDTO) -> transactionDetailsDTO
                        .setStatus(userId.equals(transactionDTO.getPaidBy()) ?
                                TransactionStatus.SETTLED : TransactionStatus.UNSETTLED) );
        Transaction transaction = GeneralUtils.buildTransaction(transactionDTO);
        transaction = transactionRepository.save(transaction);
        return GeneralUtils.buildTransactionDTO(transaction);
    }


    @Override
    public TransactionDTO getTransactionDetails(String transactionId) {
        Optional<Transaction> transactionOptional = transactionRepository
                .findById(new ObjectId(transactionId));

        if (transactionOptional.isEmpty()) {
            throw new RuntimeException("No transaction available");
        }
        return GeneralUtils.buildTransactionDTO(transactionOptional.get());
    }

    @Override
    public List<TransactionDTO> getTransactionsByUserId(String userId) {
        List<Transaction> transactions = transactionRepository.findAllByUsersUserId(new ObjectId(userId));
        List<TransactionDTO> transactionDTOs = new ArrayList<>();
        transactions.forEach(transaction ->
                transactionDTOs.add(GeneralUtils.buildTransactionDTO(transaction)));
        return transactionDTOs;
    }

    @Override
    public List<TransactionDTO> getTransactionsBetweenUsers(String userId1, String userId2) {
        List<Transaction> transactionList1 = transactionRepository
                .findAllByPaidByAndUsersUserId(new ObjectId(userId1), new ObjectId(userId2));
        List<Transaction> transactionList2 = transactionRepository
                .findAllByPaidByAndUsersUserId(new ObjectId(userId2), new ObjectId(userId1));
        List<TransactionDTO> transactionDTOList = new ArrayList<>();
        for (Transaction transaction : transactionList1) {
            transactionDTOList.add(GeneralUtils.buildTransactionDTO(transaction));
        }
        for (Transaction transaction : transactionList2) {
            transactionDTOList.add(GeneralUtils.buildTransactionDTO(transaction));
        }
        // To sort in descending order (newest to oldest)
         transactionDTOList.sort(Comparator.comparing(TransactionDTO::getTimestamp).reversed());

        return transactionDTOList;
    }

    @Override
    public TransactionDTO updateTransaction(String transactionId, TransactionDTO transactionDTO) {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(new ObjectId(transactionId));
        if (optionalTransaction.isEmpty()) {
            // throw exception
            log.error("IS EMPTY");
        }
        Transaction updatedTransaction = GeneralUtils.buildTransaction(transactionDTO);
        updatedTransaction.setTransactionId(new ObjectId(transactionId));
        updatedTransaction = transactionRepository.save(updatedTransaction);

        return GeneralUtils.buildTransactionDTO(updatedTransaction);
    }
}
