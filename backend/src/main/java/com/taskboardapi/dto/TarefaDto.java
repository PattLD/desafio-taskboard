package com.taskboardapi.dto;

import com.taskboardapi.models.Grupo;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class TarefaDto {
    private Long id;
    private String titulo;
    private boolean completado = false;
    private LocalDate dataPrazo;
    private Grupo grupo;
}

