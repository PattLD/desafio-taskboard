package com.taskboardapi.controllers;

import com.taskboardapi.dto.TarefaDto;
import com.taskboardapi.models.Tarefa;
import com.taskboardapi.services.TarefaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {
    private final TarefaServices tarefaServices;

    @Autowired
    public TarefaController(TarefaServices tarefaServices) {
        this.tarefaServices = tarefaServices;
    }

    @GetMapping
    public ResponseEntity<List<Tarefa>> findAll() {
        List<Tarefa> tarefaDtos = tarefaServices.findAll();
        return ResponseEntity.ok(tarefaDtos);
    }

    @PostMapping
    public ResponseEntity<Tarefa> save(@RequestBody TarefaDto dto) {
        Tarefa novaTarefa = tarefaServices.save(dto);
        return ResponseEntity.ok(novaTarefa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> update(@PathVariable UUID id, @RequestBody TarefaDto dto) {
        return ResponseEntity.ok(tarefaServices.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        tarefaServices.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pesquisa")
    public ResponseEntity<List<Tarefa>> findByTitulo(@RequestParam String titulo) {
        List<Tarefa> tarefas = tarefaServices.findByTitulo(titulo);
        return ResponseEntity.ok(tarefas);
    }

    @PutMapping("/{tarefaId}/move/{novoGrupoId}")
    public ResponseEntity<Tarefa> moveTarefa(@PathVariable UUID tarefaId, @PathVariable UUID novoGrupoId) {
        Tarefa tarefaAtualizada = tarefaServices.moveTarefaEmGrupo(tarefaId, novoGrupoId);
        return ResponseEntity.ok(tarefaAtualizada);
    }
}
