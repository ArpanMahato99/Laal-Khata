package com.bitspilani.wilp.splitter.model;

import com.bitspilani.wilp.splitter.enums.TransactionStatus;
import lombok.*;
import org.bson.types.ObjectId;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TransactionUser {
    private ObjectId userId;
    private Float amount;
    private TransactionStatus status;
}
