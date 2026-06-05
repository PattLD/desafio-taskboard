package com.taskboardapi.services;

import com.taskboardapi.dto.TarefaDto;
import com.taskboardapi.models.Grupo;
import com.taskboardapi.models.Tarefa;
import com.taskboardapi.repositories.GrupoRepository;
import com.taskboardapi.repositories.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TarefaServices {
    private final GrupoRepository grupoRepository;
    private TarefaRepository tarefaRepository;

    @Autowired
    public TarefaServices(TarefaRepository tarefaRepository, GrupoRepository grupoRepository) {
        this.tarefaRepository = tarefaRepository;
        this.grupoRepository = grupoRepository;
    }

    public List<Tarefa> findAll() {
        return tarefaRepository.findAll();
    }

    public Tarefa save(TarefaDto dto) {
        Grupo grupo = grupoRepository.findById(dto.grupoId()).orElseThrow(() -> new RuntimeException("Grupo não encontrado"));
        Tarefa tarefa = Tarefa.builder().titulo(dto.titulo()).completado(dto.completado()).dataPrazo(LocalDate.parse(dto.dataPrazo())).grupo(grupo).build();
        return tarefaRepository.save(tarefa);
    }

    public Tarefa update(Long id, TarefaDto dto) {
        Grupo grupo = grupoRepository.findById(dto.grupoId()).orElseThrow(() -> new RuntimeException("Grupo não encontrado"));
        Tarefa tarefa = Tarefa.builder()
                .id(id)
                .titulo(dto.titulo())
                .completado(dto.completado())
                .dataPrazo(LocalDate.parse(dto.dataPrazo()))
                .grupo(grupo)
                .build();
        return tarefaRepository.save(tarefa);
    }

    public void deleteById(Long id) {
        tarefaRepository.deleteById(id);
    }

    public List<Tarefa> findByTitulo(String titulo) {
        return tarefaRepository.findByTituloContainingIgnoreCase(titulo);
    }
}
