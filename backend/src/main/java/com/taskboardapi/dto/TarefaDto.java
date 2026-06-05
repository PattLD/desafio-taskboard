package com.taskboardapi.dto;

public record TarefaDto(
    String titulo,
    String dataPrazo,
    boolean completado,
    Long grupoId
){}
