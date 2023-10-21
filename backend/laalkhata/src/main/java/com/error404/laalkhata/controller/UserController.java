package com.error404.laalkhata.controller;

import com.error404.laalkhata.dto.ConnectionDTO;
import com.error404.laalkhata.dto.LoginDTO;
import com.error404.laalkhata.dto.TransactionDTO;
import com.error404.laalkhata.dto.UserDTO;
import com.error404.laalkhata.enums.ConnectionStatus;
import com.error404.laalkhata.service.ConnectionService;
import com.error404.laalkhata.service.TransactionService;
import com.error404.laalkhata.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/user/")
@RequiredArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final ConnectionService connectionService;
    private final TransactionService transactionService;

    @PostMapping("signup")
    public ResponseEntity<UserDTO> signup(@RequestBody final UserDTO userDTO) {
        UserDTO newUser = userService.createUser(userDTO);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
    @PostMapping("login")
    public ResponseEntity<UserDTO> login(@RequestBody final LoginDTO loginDTO) {
        UserDTO newUser = userService.loginUser(loginDTO);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @GetMapping("{userId}")
    public ResponseEntity<UserDTO> readUserData (@PathVariable final UUID userId) {
        UserDTO user = userService.readUserData(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<UserDTO> updateUserDetails (@RequestBody final UserDTO userDTO) {
        return null;
    }

    @GetMapping("{userId}/connections/{connectionStatus}")
    public ResponseEntity<List<ConnectionDTO>> getConnectionList (
            @PathVariable("userId") final UUID userId,
            @PathVariable("connectionStatus") final ConnectionStatus connectionStatus) {
        logger.error(connectionStatus.toString());
        List<ConnectionDTO> connectionList = connectionService.getConnectionList(userId, connectionStatus);
        return new ResponseEntity<>(connectionList, HttpStatus.OK);
    }

    @GetMapping("{userId}/transactions")
    public ResponseEntity<List<TransactionDTO>> getAllTransactions (@PathVariable final UUID userId) {
        List<TransactionDTO> txns = transactionService.getTransactionsByUserId(userId);
        return new ResponseEntity<>(txns, HttpStatus.OK);
    }
}
