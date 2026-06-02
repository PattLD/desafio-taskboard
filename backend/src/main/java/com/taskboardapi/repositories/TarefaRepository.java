package com.taskboardapi.repositories;

import com.taskboardapi.models.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TarefaRepository extends JpaRepository <Tarefa, Long> {
    Optional<Tarefa> findByTituloContainingIgnoreCase(String titulo);
}