package com.bitspilani.wilp.splitter.dto;

import com.bitspilani.wilp.splitter.enums.TransactionStatus;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TransactionDetailsDTO {
    private Float amount;
    private TransactionStatus status;
}
