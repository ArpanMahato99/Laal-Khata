package com.bitspilani.wilp.splitter.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    private String userId;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String upiId;
    private String pass;
}

