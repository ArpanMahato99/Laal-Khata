package com.bitspilani.wilp.splitter.repository;

import com.bitspilani.wilp.splitter.model.Transaction;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, ObjectId> {
    List<Transaction> findAllByUsersUserId(ObjectId userId);
    List<Transaction> findAllByPaidByAndUsersUserId(ObjectId userId1, ObjectId userId2);
}
