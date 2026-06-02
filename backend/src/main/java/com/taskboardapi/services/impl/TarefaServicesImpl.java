package com.taskboardapi.services.impl;

import com.taskboardapi.dto.TarefaDto;
import com.taskboardapi.models.Tarefa;
import com.taskboardapi.repositories.TarefaRepository;
import com.taskboardapi.services.TarefaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TarefaServicesImpl implements TarefaServices {
    private TarefaRepository tarefaRepository;

    @Autowired
    public TarefaServicesImpl(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    @Override
    public List<TarefaDto> findAll() {
        List<Tarefa> tarefas = tarefaRepository.findAll();
        return tarefas.stream().map((tarefa) -> mapToTarefaDto(tarefa)).collect(Collectors.toList());
    }

    private TarefaDto mapToTarefaDto(Tarefa tarefa) {
        TarefaDto tarefaDto = TarefaDto.builder()
                .id(tarefa.getId())
                .titulo(tarefa.getTitulo())
                .completado(tarefa.isCompletado())
                .dataPrazo(tarefa.getDataPrazo())
                .grupo(tarefa.getGrupo())
                .build();
        return tarefaDto;
    }
}
