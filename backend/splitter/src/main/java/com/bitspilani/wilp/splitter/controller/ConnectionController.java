package com.bitspilani.wilp.splitter.controller;

import com.bitspilani.wilp.splitter.dto.ConnectionDTO;
import com.bitspilani.wilp.splitter.model.Connection;
import com.bitspilani.wilp.splitter.repository.ConnectionRepository;
import com.bitspilani.wilp.splitter.service.ConnectionService;
import com.bitspilani.wilp.splitter.utils.GeneralUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("api/v1/connection/")
@RequiredArgsConstructor
public class ConnectionController {

    private final ConnectionService connectionService;
    private final ConnectionRepository connectionRepository;

    @PostMapping
    public ResponseEntity<ConnectionDTO> sendConnectionRequest(@RequestBody final ConnectionDTO connectionDTO) {
        ConnectionDTO newConnection = connectionService.sendConnectionRequest(connectionDTO);
        return new ResponseEntity<ConnectionDTO>(newConnection, HttpStatus.CREATED);
    }

    @PatchMapping("{connectionId}")
    public ResponseEntity<ConnectionDTO> updateConnection(
            @PathVariable("connectionId") final String connectionId,
            @RequestBody final ConnectionDTO connectionDTO) {
        ConnectionDTO responseDTO = connectionService.updateConnection(connectionId, connectionDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

}
