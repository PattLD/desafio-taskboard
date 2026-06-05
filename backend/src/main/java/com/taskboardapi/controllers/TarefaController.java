package com.taskboardapi.controllers;

import com.taskboardapi.dto.TarefaDto;
import com.taskboardapi.models.Tarefa;
import com.taskboardapi.services.TarefaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {
    private final TarefaServices tarefaServices;

    @Autowired
    public TarefaController (TarefaServices tarefaServices) {
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
    public ResponseEntity<Tarefa> update(@PathVariable Long id, @RequestBody Tarefa tarefa) {
        tarefa.setId(id);
        return ResponseEntity.ok(tarefaServices.update(id, tarefa));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        tarefaServices.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pesquisa")
    public ResponseEntity<List<Tarefa>> findByTitulo(@RequestParam String titulo) {
        List<Tarefa> tarefas = tarefaServices.findByTitulo(titulo);
        return ResponseEntity.ok(tarefas);
    }
}
