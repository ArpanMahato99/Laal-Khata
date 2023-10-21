package com.error404.laalkhata.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    private UUID userId;

    private String fullName;
    private String email;
    private Long phoneNumber;
    private String upiId;
    private String pass;
}
