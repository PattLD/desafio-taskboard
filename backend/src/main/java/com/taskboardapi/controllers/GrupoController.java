package com.taskboardapi.controllers;

import com.taskboardapi.models.Grupo;
import com.taskboardapi.models.Tarefa;
import com.taskboardapi.services.GrupoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grupos")
public class GrupoController {
    private final GrupoServices grupoServices;

    @Autowired
    public GrupoController (GrupoServices grupoServices) {
        this.grupoServices = grupoServices;
    }

    @GetMapping
    public ResponseEntity<List<Grupo>> findAll() {
        List<Grupo> grupo = grupoServices.findAll();
        return ResponseEntity.ok(grupo);
    }

    @PostMapping
    public ResponseEntity<Grupo> save(@RequestBody Grupo grupo) {
        Grupo novoGrupo = grupoServices.save(grupo);
        return ResponseEntity.ok(novoGrupo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Grupo> update(@PathVariable Long id, @RequestBody Grupo grupo) {
        grupo.setId(id);
        return ResponseEntity.ok(grupoServices.update(id, grupo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        grupoServices.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
