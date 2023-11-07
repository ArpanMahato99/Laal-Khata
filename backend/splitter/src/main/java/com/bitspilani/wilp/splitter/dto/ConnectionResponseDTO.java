package com.bitspilani.wilp.splitter.dto;

import com.bitspilani.wilp.splitter.enums.ConnectionStatus;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ConnectionResponseDTO {
    private String connectionId;
    private ConnectionResponseUserDTO user1;
    private ConnectionResponseUserDTO user2;
    private ConnectionStatus status;
}
