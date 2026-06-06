package com.taskboardapi.dto;

import java.util.UUID;

public record TarefaDto(
        String titulo,
        String dataPrazo,
        boolean completado,
        UUID grupoId) {
}
