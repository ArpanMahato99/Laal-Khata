package com.error404.laalkhata.dto;

import com.error404.laalkhata.enums.ConnectionStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConnectionDTO {
    private UUID connectionId;
    @JsonProperty("senderId")
    private UUID senderUUID;
    private String senderName;
    @JsonProperty("receiverId")
    private UUID receiverUUID;
    private String receiverName;
    private ConnectionStatus status;

}
