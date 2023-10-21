package com.error404.laalkhata.repository;

import com.error404.laalkhata.entity.Connection;
import com.error404.laalkhata.enums.ConnectionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ConnectionRepository extends JpaRepository<Connection, UUID> {

    @Query("SELECT c FROM Connection c WHERE c.status = ?2 AND (c.senderUUID = ?1 OR c.receiverUUID = ?1)")
    List<Connection> findByUUIDAndStatus(UUID uuid, ConnectionStatus status);

    @Query("SELECT c FROM Connection c WHERE (c.senderUUID = ?1 AND c.receiverUUID = ?2) OR (c.senderUUID = ?2 AND c.receiverUUID = ?1)")
    Optional<Connection> findBySenderUUIDAndReceiverUUID(UUID uuid1, UUID uuid2);
}
