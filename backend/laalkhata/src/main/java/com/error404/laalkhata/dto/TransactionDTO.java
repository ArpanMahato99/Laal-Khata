package com.error404.laalkhata.dto;

import com.error404.laalkhata.enums.TransactionStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {
    private UUID transactionId;
    @JsonProperty("lenderId")
    private UUID lenderUUID;
    @JsonProperty("borrowerId")
    private UUID borrowerUUID;
    private String description;
    private Float amount;
    @JsonProperty("percentage")
    private Integer splitPercentage;
    private LocalDateTime timestamp;
    private TransactionStatus status;
}
