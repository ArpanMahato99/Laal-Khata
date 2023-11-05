package com.bitspilani.wilp.splitter.dto;

import com.bitspilani.wilp.splitter.model.TransactionUser;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TransactionDTO {
    private String transactionId;
    private String paidBy;
    private String description;
    private Float totalAmount;
    private LocalDateTime timestamp;
    private List<TransactionUserDTO> users;
}
