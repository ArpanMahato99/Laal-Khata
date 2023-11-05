package com.bitspilani.wilp.splitter.dto;

import com.bitspilani.wilp.splitter.enums.ConnectionStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.bson.types.ObjectId;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ConnectionDTO {
    private String connectionId;
    private String user1Id;
    private String user2Id;
    private ConnectionStatus status;
}
