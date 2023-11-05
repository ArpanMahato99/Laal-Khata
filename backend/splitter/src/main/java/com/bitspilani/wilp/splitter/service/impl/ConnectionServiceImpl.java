package com.bitspilani.wilp.splitter.service.impl;

import com.bitspilani.wilp.splitter.dto.ConnectionDTO;
import com.bitspilani.wilp.splitter.enums.ConnectionStatus;
import com.bitspilani.wilp.splitter.exception.DuplicateEntryExistsException;
import com.bitspilani.wilp.splitter.exception.InvalidConnectionRequestException;
import com.bitspilani.wilp.splitter.exception.UnmaintainedConnectionException;
import com.bitspilani.wilp.splitter.model.Connection;
import com.bitspilani.wilp.splitter.repository.ConnectionRepository;
import com.bitspilani.wilp.splitter.repository.UserRepository;
import com.bitspilani.wilp.splitter.service.ConnectionService;
import com.bitspilani.wilp.splitter.utils.Constants;
import com.bitspilani.wilp.splitter.utils.GeneralUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConnectionServiceImpl implements ConnectionService {
    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;
    @Override
    public ConnectionDTO sendConnectionRequest(ConnectionDTO connectionDTO) {

        if (connectionDTO.getUser1Id().equals(connectionDTO.getUser2Id())) {
            throw new InvalidConnectionRequestException("");
        }

        Optional<Connection> oldConnection =  connectionRepository
                .findConnectionsBetweenUsers(connectionDTO.getUser1Id(), connectionDTO.getUser2Id());

        if (oldConnection.isPresent() && !oldConnection.get().getStatus().equals(ConnectionStatus.REMOVED)) {
            throw new DuplicateEntryExistsException
                    (Constants.CONNECTION_ALREADY_EXIST_MSG + oldConnection.get().getStatus());
        }

        Connection newConnection = GeneralUtils.buildConnection(connectionDTO, ConnectionStatus.AWAITING);
        newConnection = connectionRepository.save(newConnection);

        return GeneralUtils.buildConnectionDTO(newConnection);
    }

    @Override
    public List<ConnectionDTO> getConnectionList(String userId) {
        List<Connection> connectionList = connectionRepository.findAllByUserId(userId);
        List<ConnectionDTO> connectionDTOList = new ArrayList<>();
        for (Connection connection : connectionList) {
            ConnectionDTO connectionDTO = GeneralUtils.buildConnectionDTO(connection);
            connectionDTOList.add(connectionDTO);
        }
        return connectionDTOList;
    }

    @Override
    public ConnectionDTO updateConnection(String connectionId, ConnectionDTO connectionDTO) {
        Optional<Connection> optionalConnection = connectionRepository.findById(new ObjectId(connectionId));
        if (optionalConnection.isEmpty()) {
            throw new UnmaintainedConnectionException(Constants.NO_SUCH_CONNECTION_EXIST_MSG);
        }
        Connection connection = optionalConnection.get();
        connection.setStatus(connectionDTO.getStatus());
        connection = connectionRepository.save(connection);
        return GeneralUtils.buildConnectionDTO(connection);
    }
}
