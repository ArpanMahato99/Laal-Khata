package com.bitspilani.wilp.splitter.service;

import com.bitspilani.wilp.splitter.dto.ConnectionDTO;
import com.bitspilani.wilp.splitter.enums.ConnectionStatus;

import java.util.List;
import java.util.UUID;

public interface ConnectionService {
    ConnectionDTO sendConnectionRequest(final ConnectionDTO connectionDTO);

    List<ConnectionDTO> getConnectionList(final String userId);

    ConnectionDTO updateConnection(final String connectionId, final ConnectionDTO connectionDTO);
}
