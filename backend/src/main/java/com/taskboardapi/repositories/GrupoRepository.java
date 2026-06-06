package com.taskboardapi.repositories;

import com.taskboardapi.models.Grupo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GrupoRepository extends JpaRepository<Grupo, UUID> {
}
