package com.taskboardapi.repositories;

import com.taskboardapi.models.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TarefaRepository extends JpaRepository <Tarefa, UUID> {
    List<Tarefa> findByTituloContainingIgnoreCase(String titulo);
}