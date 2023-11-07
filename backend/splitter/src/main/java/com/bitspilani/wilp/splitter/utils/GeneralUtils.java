package com.bitspilani.wilp.splitter.utils;

import com.bitspilani.wilp.splitter.dto.*;
import com.bitspilani.wilp.splitter.enums.ConnectionStatus;
import com.bitspilani.wilp.splitter.model.Connection;
import com.bitspilani.wilp.splitter.model.Transaction;
import com.bitspilani.wilp.splitter.model.TransactionDetails;
import com.bitspilani.wilp.splitter.model.User;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class GeneralUtils {
    public static User buildUser(UserDTO userDTO) {
         return User.builder()
                 .fullName(userDTO.getFullName())
                 .hashedPass(userDTO.getPass())
                 .email(userDTO.getEmail())
                 .upiId(userDTO.getUpiId())
                 .phoneNumber(userDTO.getPhoneNumber())
                 .build();
    }

    public static UserDTO buildUserDTO(User user) {
        return UserDTO.builder()
                .userId(user.getUserId().toHexString())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .upiId(user.getUpiId())
                .build();
    }

    public static Connection buildConnection(ConnectionRequestDTO connectionDTO, ConnectionStatus connectionStatus) {
        return Connection.builder()
                .user1Id(new ObjectId(connectionDTO.getUser1Id()))
                .user2Id(new ObjectId(connectionDTO.getUser2Id()))
                .status(connectionStatus)
                .build();
    }

    public static ConnectionResponseDTO buildConnectionResponseDTO(Connection connection, List<User> userList){
        return ConnectionResponseDTO.builder()
                .connectionId(connection.getConnectionId().toHexString())
                .user1(GeneralUtils.buildConnectionUserDTO(userList.get(0)))
                .user2(GeneralUtils.buildConnectionUserDTO(userList.get(1)))
                .status(connection.getStatus())
                .build();
    }

    public static ConnectionResponseUserDTO buildConnectionUserDTO(User user) {
        return ConnectionResponseUserDTO.builder()
                .userId(user.getUserId().toHexString())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .upiId(user.getUpiId())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    public static Transaction buildTransaction(TransactionDTO transactionDTO) {
        List<TransactionDetails> transactionDetails = new ArrayList<>();
        transactionDTO.getUsers().forEach(transactionDetailsDTO ->
                transactionDetails.add(GeneralUtils.buildTransactionUser(transactionDetailsDTO)));
        return Transaction.builder()
                .description(transactionDTO.getDescription())
                .paidBy(new ObjectId(transactionDTO.getPaidBy()))
                .totalAmount(transactionDTO.getTotalAmount())
                .timestamp(transactionDTO.getTimestamp() != null ? transactionDTO.getTimestamp() : LocalDateTime.now())
                .users(transactionDetails)
                .build();
    }

    public static TransactionDTO buildTransactionDTO(Transaction transaction) {
        List<TransactionDetailsDTO> transactionDetailsDTOS = new ArrayList<>();
        transaction.getUsers().forEach(transactionDetails ->
                transactionDetailsDTOS.add(GeneralUtils.buildTransactionUserDTO(transactionDetails)));
        return TransactionDTO.builder()
                .transactionId(transaction.getTransactionId().toHexString())
                .description(transaction.getDescription())
                .paidBy(transaction.getPaidBy().toHexString())
                .totalAmount(transaction.getTotalAmount())
                .timestamp(transaction.getTimestamp())
                .users(transactionDetailsDTOS)
                .build();
    }

    public static TransactionDetails buildTransactionUser(TransactionDetailsDTO transactionDetailsDTO) {
        return TransactionDetails.builder()
                .userId(new ObjectId(transactionDetailsDTO.getUserId()))
                .amount(transactionDetailsDTO.getAmount())
                .status(transactionDetailsDTO.getStatus())
                .build();
    }

    public static TransactionDetailsDTO buildTransactionUserDTO(TransactionDetails transactionDetails) {
        return TransactionDetailsDTO.builder()
                .userId(transactionDetails.getUserId().toHexString())
                .amount(transactionDetails.getAmount())
                .status(transactionDetails.getStatus())
                .build();
    }
}
