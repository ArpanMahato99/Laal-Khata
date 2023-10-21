package com.error404.laalkhata.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {
    private Long phoneNumber;
    private String password;
}
