package com.taskboardapi.repositories;

import com.taskboardapi.models.Grupo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrupoRepository extends JpaRepository<Grupo, Long> {
}
