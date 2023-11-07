package com.bitspilani.wilp.splitter.dto;

import lombok.*;

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
    private List<TransactionDetailsDTO> users;
}
