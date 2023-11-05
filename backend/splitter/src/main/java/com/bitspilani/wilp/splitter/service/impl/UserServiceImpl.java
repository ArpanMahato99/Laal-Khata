package com.bitspilani.wilp.splitter.service.impl;

import com.bitspilani.wilp.splitter.dto.LoginDTO;
import com.bitspilani.wilp.splitter.dto.UserDTO;
import com.bitspilani.wilp.splitter.exception.DuplicateEntryExistsException;
import com.bitspilani.wilp.splitter.exception.UserNotExistException;
import com.bitspilani.wilp.splitter.exception.WrongCredentialsException;
import com.bitspilani.wilp.splitter.model.User;
import com.bitspilani.wilp.splitter.repository.UserRepository;
import com.bitspilani.wilp.splitter.service.UserService;
import com.bitspilani.wilp.splitter.utils.Constants;
import com.bitspilani.wilp.splitter.utils.GeneralUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {

        Optional<User> optionalUser = userRepository.findFirstByPhoneNumberOrEmailOrUpiId(userDTO.getPhoneNumber(), userDTO.getEmail(), userDTO.getUpiId());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPhoneNumber().equals(userDTO.getPhoneNumber())) {
                throw new DuplicateEntryExistsException(Constants.PHONE_NUMBER_ALREADY_EXIST_MSG);
            } else if (user.getUpiId().equals(userDTO.getUpiId())) {
                throw new DuplicateEntryExistsException(Constants.UPI_ID_ALREADY_EXIST_MSG);
            } else if (user.getEmail().equals(userDTO.getEmail())) {
                throw new DuplicateEntryExistsException(Constants.EMAIL_ALREADY_EXIST_MSG);
            } else {
                throw new DuplicateEntryExistsException("User already present");
            }
        }
        User newUser = GeneralUtils.buildUser(userDTO);
        newUser = userRepository.save(newUser);
        return GeneralUtils.buildUserDTO(newUser);
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) {
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
        return GeneralUtils.buildUserDTO(user);
    }

    @Override
    public UserDTO readUserData(UUID userId) {
        return null;
    }

    @Override
    public UserDTO searchUser(String queryParam) {
        Optional<User> optionalUser = userRepository.findFirstByPhoneNumberOrEmail(queryParam, queryParam);
        if (optionalUser.isEmpty()) {
            throw new UserNotExistException(queryParam + Constants.USER_DOES_NOT_EXIST_MSG);
        }
        return GeneralUtils.buildUserDTO(optionalUser.get());
    }
}
