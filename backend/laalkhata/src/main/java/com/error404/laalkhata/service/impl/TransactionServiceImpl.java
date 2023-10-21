package com.error404.laalkhata.service.impl;

import com.error404.laalkhata.dto.TransactionDTO;
import com.error404.laalkhata.entity.Connection;
import com.error404.laalkhata.entity.Transaction;
import com.error404.laalkhata.enums.ConnectionStatus;
import com.error404.laalkhata.enums.TransactionStatus;
import com.error404.laalkhata.exception.ConnectionNotMaintainedException;
import com.error404.laalkhata.exception.InvalidAmountException;
import com.error404.laalkhata.exception.InvalidPercentageException;
import com.error404.laalkhata.repository.ConnectionRepository;
import com.error404.laalkhata.repository.TransactionRepository;
import com.error404.laalkhata.service.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private static final Integer DEFAULT_SPLIT_PERCENTAGE = 50;
    private final TransactionRepository transactionRepository;
    private final ConnectionRepository connectionRepository;

    @Override
    public TransactionDTO createTransaction(TransactionDTO transactionDTO) throws ConnectionNotMaintainedException, InvalidAmountException {

        if (transactionDTO.getAmount() <= 0) {
            throw new InvalidAmountException("Amount cannot be negative or zero.");
        }

        if (transactionDTO.getSplitPercentage() < 0 || transactionDTO.getSplitPercentage() > 100) {
            throw new InvalidPercentageException("Percentage should be between 0 to 100.");
        }

        UUID sender = transactionDTO.getLenderUUID();
        UUID receiver = transactionDTO.getBorrowerUUID();

        Optional<Connection> conn = connectionRepository
                .findBySenderUUIDAndReceiverUUID(sender, receiver);

        if (conn.isPresent() && conn.get().getStatus().equals(ConnectionStatus.APPROVED)) {
            Transaction txn = Transaction.builder()
                    .amount(transactionDTO.getAmount())
                    .splitPercentage(transactionDTO.getSplitPercentage() == 0 ?
                            DEFAULT_SPLIT_PERCENTAGE : transactionDTO.getSplitPercentage())
                    .lenderUUID(transactionDTO.getLenderUUID())
                    .borrowerUUID(transactionDTO.getBorrowerUUID())
                    .description(transactionDTO.getDescription())
                    .status(TransactionStatus.UNSETTLED)
                    .timestamp(LocalDateTime.now())
                    .build();
            txn = transactionRepository.save(txn);

            return transactionEntityToDTOConverter(txn);
        } else {
            throw new ConnectionNotMaintainedException("No connection maintained between users");
        }
    }

    @Override
    public TransactionDTO getTransactionDetails(UUID transactionId) {
        Optional<Transaction> transactionOptional = transactionRepository.findById(transactionId);

        if (transactionOptional.isEmpty()) {
            throw new RuntimeException("No transaction available");
        }
        return transactionEntityToDTOConverter(transactionOptional.get());
    }

    @Override
    public List<TransactionDTO> getTransactionsByUserId(UUID userId) {
        List<Transaction> transactions = transactionRepository.findAllTransactionByUserUUID(userId);
        List<TransactionDTO> transactionList = new ArrayList<>();

        for (Transaction txn : transactions) {
            transactionList.add(transactionEntityToDTOConverter(txn));
        }

        return transactionList;
    }

    @Override
    public List<TransactionDTO> getTransactionsBetweenUsers(UUID user1UUID, UUID user2UUID) {
        List<Transaction> transactions = transactionRepository.findAllTransactionBetweenUsers(user1UUID, user2UUID);
        List<TransactionDTO> transactionDTOList = new ArrayList<>();

        for (Transaction txn : transactions) {
            transactionDTOList.add(transactionEntityToDTOConverter(txn));
        }

        return transactionDTOList;
    }

    @Override
    public TransactionDTO updateTransaction(TransactionDTO transactionDTO) {

        if (transactionDTO.getAmount() <= 0) {
            throw new InvalidAmountException("Amount cannot be negative or zero.");
        }

        if (transactionDTO.getSplitPercentage() < 0 || transactionDTO.getSplitPercentage() > 100) {
            throw new InvalidPercentageException("Percentage should be between 0 to 100.");
        }

        UUID transactionId = transactionDTO.getTransactionId();
        Optional<Transaction> transactionOptional = transactionRepository.findById(transactionId);

        if (transactionOptional.isEmpty()) {
            throw new RuntimeException("No transaction found");
        }

        Transaction txn = transactionDTOToEntityConverter(transactionDTO);
        txn = transactionRepository.save(txn);
        return transactionEntityToDTOConverter(txn);
    }

    @Override
    public void settleTransactions(List<TransactionDTO> transactionDTOList) {
        List<Transaction> txns = new ArrayList<>();
        for (TransactionDTO transactionDTO : transactionDTOList) {
            Transaction txn = transactionDTOToEntityConverter(transactionDTO);
            txn.setStatus(TransactionStatus.SETTLED);
            txns.add(txn);
        }
        txns = transactionRepository.saveAll(txns);
    }

    private static Transaction transactionDTOToEntityConverter(TransactionDTO transactionDTO) {
        return Transaction.builder()
                .transactionId(transactionDTO.getTransactionId())
                .amount(transactionDTO.getAmount())
                .splitPercentage(transactionDTO.getSplitPercentage())
                .lenderUUID(transactionDTO.getLenderUUID())
                .borrowerUUID(transactionDTO.getBorrowerUUID())
                .description(transactionDTO.getDescription())
                .status(transactionDTO.getStatus())
                .timestamp(transactionDTO.getTimestamp())
                .build();
    }

    private static TransactionDTO transactionEntityToDTOConverter(Transaction txn) {
        return TransactionDTO.builder()
                .transactionId(txn.getTransactionId())
                .amount(txn.getAmount())
                .splitPercentage(txn.getSplitPercentage())
                .lenderUUID(txn.getLenderUUID())
                .borrowerUUID(txn.getBorrowerUUID())
                .description(txn.getDescription())
                .status(txn.getStatus())
                .timestamp(txn.getTimestamp())
                .build();
    }
}
