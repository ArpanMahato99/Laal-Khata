package com.error404.laalkhata.repository;

import com.error404.laalkhata.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    @Query("SELECT t FROM Transaction t WHERE t.lenderUUID = ?1 OR t.borrowerUUID = ?1 ORDER BY t.timestamp DESC")
    List<Transaction> findAllTransactionByUserUUID (UUID userId);

    @Query("SELECT t FROM Transaction t WHERE (t.lenderUUID = ?1 AND t.borrowerUUID = ?2) OR (t.lenderUUID = ?2 AND t.borrowerUUID = ?1) ORDER BY t.timestamp DESC")
    List<Transaction> findAllTransactionBetweenUsers(UUID uuid1, UUID uuid2);
}
