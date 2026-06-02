package com.taskboardapi.services.impl;
import com.taskboardapi.dto.GrupoDto;
import com.taskboardapi.models.Grupo;
import com.taskboardapi.repositories.GrupoRepository;
import com.taskboardapi.services.GrupoServices;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GrupoServicesImpl implements GrupoServices {
    private GrupoRepository grupoRepository;

    public GrupoServicesImpl (GrupoRepository grupoRepository) {
        this.grupoRepository = grupoRepository;
    }

    @Override
    public List<GrupoDto> findAll() {
        List<Grupo> grupos = grupoRepository.findAll();
        return grupos.stream().map((grupo) -> mapToGrupoDto(grupo)).collect(Collectors.toList());
    }

    private GrupoDto mapToGrupoDto(Grupo grupo) {
        GrupoDto grupoDto = GrupoDto.builder()
                .id(grupo.getId())
                .titulo(grupo.getTitulo())
                .tarefas(grupo.getTarefas())
                .build();

        return grupoDto;
    }
}
