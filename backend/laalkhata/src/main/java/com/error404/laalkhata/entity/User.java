package com.error404.laalkhata.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "UserTable")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID userId;
    private String fullName;
    @Column(unique = true)
    @NotEmpty(message = "Please provide an email.")
    private String email;
    @Column(unique = true)
    @NotNull(message = "Please provide a phone number.")
    private Long phoneNumber;
    private String hashedPass;
    private String hashKey;
    @Column(unique = true)
    @NotEmpty(message = "Please provide an UPI Id.")
    private String upiId;
}
