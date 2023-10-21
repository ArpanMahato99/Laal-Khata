package com.error404.laalkhata.service.impl;

import com.error404.laalkhata.dto.LoginDTO;
import com.error404.laalkhata.dto.UserDTO;
import com.error404.laalkhata.entity.User;
import com.error404.laalkhata.exception.DuplicateEntryExistsException;
import com.error404.laalkhata.exception.UserDoesNotExistException;
import com.error404.laalkhata.exception.WrongCredentialsException;
import com.error404.laalkhata.repository.UserRepository;
import com.error404.laalkhata.service.UserService;
import com.error404.laalkhata.util.Constants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    @Override
    public UserDTO createUser(final UserDTO userDTO) throws DuplicateEntryExistsException {
        User newUser = User.builder()
                .fullName(userDTO.getFullName())
                .hashedPass(userDTO.getPass())
                .email(userDTO.getEmail())
                .upiId(userDTO.getUpiId())
                .phoneNumber(userDTO.getPhoneNumber())
                .build();

        try {
            newUser = userRepository.save(newUser);
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().contains("Unique index or primary key violation")) {
                if (e.getMessage().contains("PHONE_NUMBER")) {
                    throw new DuplicateEntryExistsException(Constants.PHONE_NUMBER_ALREADY_EXIST_MSG);
                }
                if (e.getMessage().contains("UPI_ID")) {
                    throw new DuplicateEntryExistsException(Constants.UPI_ID_ALREADY_EXIST_MSG);
                }
                if (e.getMessage().contains("EMAIL")) {
                    throw new DuplicateEntryExistsException(Constants.EMAIL_ALREADY_EXIST_MSG);
                }
            }

        }

        return UserDTO.builder()
                .userId(newUser.getUserId())
                .fullName(newUser.getFullName())
                .email(newUser.getEmail())
                .phoneNumber(newUser.getPhoneNumber())
                .upiId(newUser.getUpiId())
                .build();
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) throws WrongCredentialsException {
        Optional<User> optionalUser = userRepository.findByPhoneNumber(loginDTO.getPhoneNumber());
        if (optionalUser.isEmpty()) {
            throw new WrongCredentialsException(Constants.WRONG_CREDENTIALS_MSG);
        }
        // when the is already a user registered
        User user = optionalUser.get();

        // TODO: Implement Spring Security
        String loginPassword = loginDTO.getPassword();
        String userPassword = user.getHashedPass();
        if (!loginPassword.equals(userPassword)) {
            throw new WrongCredentialsException(Constants.WRONG_CREDENTIALS_MSG);
        }
        return UserDTO.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .upiId(user.getUpiId())
                .build();
    }

    @Override
    public UserDTO readUserData(UUID userId) throws UserDoesNotExistException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {return new UserDoesNotExistException(Constants.USER_NOT_FOUND_MSG);});
        return UserDTO.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .fullName(user.getFullName())
                .upiId(user.getUpiId())
                .build();
    }

}
