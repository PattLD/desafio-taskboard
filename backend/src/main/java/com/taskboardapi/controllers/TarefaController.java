package com.taskboardapi.controllers;

import com.taskboardapi.dto.TarefaDto;
import com.taskboardapi.services.TarefaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<List<TarefaDto>> findAll() {
        List<TarefaDto> tarefaDtos = tarefaServices.findAll();
        return ResponseEntity.ok(tarefaDtos);
    }
}
