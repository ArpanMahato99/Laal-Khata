package com.bitspilani.wilp.splitter.service.impl;

import com.bitspilani.wilp.splitter.dto.TransactionDTO;
import com.bitspilani.wilp.splitter.enums.TransactionStatus;
import com.bitspilani.wilp.splitter.exception.InvalidDataException;
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
        transactionDTO.getUsers()
                .forEach(transactionUserDTO -> transactionUserDTO.setStatus(TransactionStatus.UNSETTLED));
        Transaction transaction = GeneralUtils.buildTransaction(transactionDTO);
        transaction = transactionRepository.save(transaction);
        return GeneralUtils.buildTransactionDTO(transaction);
    }


    @Override
    public TransactionDTO getTransactionDetails(UUID transactionId) {
        return null;
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
    public List<TransactionDTO> getTransactionsBetweenUsers(UUID uuid1, UUID uuid2) {
        return null;
    }

    @Override
    public TransactionDTO updateTransaction(TransactionDTO transactionDTO) {
        return null;
    }

    @Override
    public void settleTransactions(List<TransactionDTO> transactionDTOList) {

    }
}
