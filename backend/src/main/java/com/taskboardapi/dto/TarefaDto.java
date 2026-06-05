package com.taskboardapi.dto;

public record TarefaDto(
        String titulo,
        String dataPrazo,
        Boolean completado,
        Long grupoId) {
}
