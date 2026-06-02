package com.taskboardapi.dto;

import com.taskboardapi.models.Tarefa;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder

public class GrupoDto {
    private Long id;
    private String titulo;
    private List<Tarefa> tarefas = new ArrayList<>();
}
