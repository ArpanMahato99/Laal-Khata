package com.error404.laalkhata.service.impl;

import com.error404.laalkhata.dto.ConnectionDTO;
import com.error404.laalkhata.dto.UserDTO;
import com.error404.laalkhata.entity.Connection;
import com.error404.laalkhata.enums.ConnectionStatus;
import com.error404.laalkhata.exception.DuplicateEntryExistsException;
import com.error404.laalkhata.exception.UserDoesNotExistException;
import com.error404.laalkhata.repository.ConnectionRepository;
import com.error404.laalkhata.repository.UserRepository;
import com.error404.laalkhata.service.ConnectionService;
import com.error404.laalkhata.service.UserService;
import com.error404.laalkhata.util.Constants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConnectionServiceImpl implements ConnectionService {

    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;
    private final UserService userService;


    @Override
    public ConnectionDTO sendConnectionRequest(ConnectionDTO connectionDTO) throws UserDoesNotExistException {

        UserDTO sender = userService.readUserData(connectionDTO.getSenderUUID());
        UserDTO receiver = userService.readUserData(connectionDTO.getReceiverUUID());

        Optional<Connection> oldConnection =  connectionRepository
                .findBySenderUUIDAndReceiverUUID(connectionDTO.getSenderUUID(), connectionDTO.getReceiverUUID());

        if (oldConnection.isPresent()) {
            throw new DuplicateEntryExistsException
                    (Constants.CONNECTION_ALREADY_EXIST_MSG + oldConnection.get().getStatus());
        }

        Connection newSentConnection = Connection.builder()
                .senderUUID(connectionDTO.getSenderUUID())
                .senderName(sender.getFullName())
                .receiverUUID(connectionDTO.getReceiverUUID())
                .receiverName(receiver.getFullName())
                .status(ConnectionStatus.AWAITING)
                .build();
        newSentConnection = connectionRepository.save(newSentConnection);

        return ConnectionDTO.builder()
                .connectionId(newSentConnection.getConnectionId())
                .senderUUID(newSentConnection.getSenderUUID())
                .receiverUUID(newSentConnection.getReceiverUUID())
                .status(newSentConnection.getStatus())
                .senderName(sender.getFullName())
                .receiverName(receiver.getFullName())
                .build();

    }

    @Override
    public List<ConnectionDTO> getConnectionList(UUID userId, ConnectionStatus connectionStatus) {
        List<Connection> connections = connectionRepository.findByUUIDAndStatus(userId, connectionStatus);
        List<ConnectionDTO> connectionDTOList = new ArrayList<>();
        for (Connection connection : connections) {
            ConnectionDTO connectionDTO = connectionEntityToDTOConverter(connection);
            connectionDTOList.add(connectionDTO);
        }
        return connectionDTOList;
    }

    @Override
    public ConnectionDTO updateConnection(ConnectionDTO connectionDTO) {
        ConnectionDTO responseDTO = null;
        Optional<Connection> oldConnection = connectionRepository.findById(connectionDTO.getConnectionId());
        if (oldConnection.isEmpty()) {
            //TODO: Throw error - connection not present
        }

        if (oldConnection.get().getStatus().equals(ConnectionStatus.AWAITING)) {
            // when the user have received a connection request, user can either accept or reject
            if (connectionDTO.getStatus().equals(ConnectionStatus.APPROVED)
                || connectionDTO.getStatus().equals(ConnectionStatus.REMOVED)) {
                Connection connection = connectionDTOToEntityConverter(connectionDTO);
                connection = connectionRepository.save(connection);
                responseDTO = connectionEntityToDTOConverter(connection);
            } else {
                // TODO: Throw error - cannot change to the wanted status
            }
        }

        if (oldConnection.get().getStatus().equals(ConnectionStatus.APPROVED)) {
            if (connectionDTO.getStatus().equals(ConnectionStatus.REMOVED)) {
                // remove the connection
                Connection connection = connectionDTOToEntityConverter(connectionDTO);
                connection = connectionRepository.save(connection);
                responseDTO = connectionEntityToDTOConverter(connection);
            } else {
                // TODO: Throw error - cannot change to the wanted status
            }
        }
        return responseDTO;
    }

    private static Connection connectionDTOToEntityConverter(ConnectionDTO connectionDTO) {

        return Connection.builder()
                .connectionId(connectionDTO.getConnectionId())
                .senderName(connectionDTO.getSenderName())
                .receiverName(connectionDTO.getReceiverName())
                .status(connectionDTO.getStatus())
                .senderUUID(connectionDTO.getSenderUUID())
                .receiverUUID(connectionDTO.getReceiverUUID())
                .build();
    }

    private static ConnectionDTO connectionEntityToDTOConverter(Connection connection) {
        return ConnectionDTO.builder()
                .connectionId(connection.getConnectionId())
                .senderUUID(connection.getSenderUUID())
                .receiverUUID(connection.getReceiverUUID())
                .status(connection.getStatus())
                .senderName(connection.getSenderName())
                .receiverName(connection.getReceiverName())
                .build();
    }

}
