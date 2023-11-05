package com.bitspilani.wilp.splitter.service;

import com.bitspilani.wilp.splitter.dto.LoginDTO;
import com.bitspilani.wilp.splitter.dto.UserDTO;

import java.util.UUID;

public interface UserService {

    UserDTO createUser (final UserDTO userDTO);
    UserDTO loginUser (final LoginDTO loginDTO);

    UserDTO readUserData (final UUID userId);
    UserDTO searchUser(final String queryParam);
}

