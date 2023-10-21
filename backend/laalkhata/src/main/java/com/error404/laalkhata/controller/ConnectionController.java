package com.error404.laalkhata.controller;

import com.error404.laalkhata.dto.ConnectionDTO;
import com.error404.laalkhata.service.ConnectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/v1/connection")
@RequiredArgsConstructor
public class ConnectionController {

    private final ConnectionService connectionService;

    @PostMapping
    public ResponseEntity<ConnectionDTO> sendConnectionRequest(@RequestBody final ConnectionDTO connectionDTO) {
        ConnectionDTO newConnection = connectionService.sendConnectionRequest(connectionDTO);
        return new ResponseEntity<ConnectionDTO>(newConnection, HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity<ConnectionDTO> updateConnection(@RequestBody final ConnectionDTO connectionDTO) {
        ConnectionDTO responseDTO = connectionService.updateConnection(connectionDTO);
        if (responseDTO == null) {
            // TODO: throw error
        }
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }


}
