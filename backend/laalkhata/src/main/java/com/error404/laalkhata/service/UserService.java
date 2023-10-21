package com.error404.laalkhata.service;

import com.error404.laalkhata.dto.ConnectionDTO;
import com.error404.laalkhata.dto.LoginDTO;
import com.error404.laalkhata.dto.UserDTO;
import com.error404.laalkhata.enums.ConnectionStatus;

import java.util.List;
import java.util.UUID;

public interface UserService {

    UserDTO createUser (final UserDTO userDTO);
    UserDTO loginUser (final LoginDTO loginDTO);

    UserDTO readUserData (final UUID userId);
}
