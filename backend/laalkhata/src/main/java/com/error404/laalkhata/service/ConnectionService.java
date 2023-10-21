package com.error404.laalkhata.service;

import com.error404.laalkhata.dto.ConnectionDTO;
import com.error404.laalkhata.enums.ConnectionStatus;

import java.util.List;
import java.util.UUID;

public interface ConnectionService {

    ConnectionDTO sendConnectionRequest(final ConnectionDTO connectionDTO);

    List<ConnectionDTO> getConnectionList(final UUID userId, final ConnectionStatus connectionStatus);

    ConnectionDTO updateConnection(final ConnectionDTO connectionDTO);
}
