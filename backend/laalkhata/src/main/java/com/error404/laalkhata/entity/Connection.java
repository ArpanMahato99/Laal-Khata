package com.error404.laalkhata.entity;

import com.error404.laalkhata.enums.ConnectionStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "ConnectionTable")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Connection {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID connectionId;
    @NotNull(message = "User UUID cannot be null")
    private UUID senderUUID;
    private String senderName;
    @NotNull(message = "User friend UUID cannot be null")
    private UUID receiverUUID;
    private String receiverName;
    private ConnectionStatus status;

}
