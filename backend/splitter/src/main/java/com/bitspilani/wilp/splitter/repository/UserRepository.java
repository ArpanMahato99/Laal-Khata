package com.bitspilani.wilp.splitter.repository;

import com.bitspilani.wilp.splitter.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findByPhoneNumber(String phoneNumber);
    Optional<User> findFirstByPhoneNumberOrEmail(String phoneNumber, String email);
    Optional<User> findFirstByPhoneNumberOrEmailOrUpiId(String phoneNumber, String email, String upiId);
}
