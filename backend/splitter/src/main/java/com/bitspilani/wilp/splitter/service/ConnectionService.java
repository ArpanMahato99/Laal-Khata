package com.bitspilani.wilp.splitter.service;

import com.bitspilani.wilp.splitter.dto.ConnectionRequestDTO;
import com.bitspilani.wilp.splitter.dto.ConnectionResponseDTO;

import java.util.List;

public interface ConnectionService {
    ConnectionResponseDTO sendConnectionRequest(final ConnectionRequestDTO connectionDTO);

    List<ConnectionResponseDTO> getConnectionList(final String userId);

    ConnectionResponseDTO updateConnection(final String connectionId, final ConnectionRequestDTO connectionDTO);
}
