package com.taskboardapi.controllers;

import com.taskboardapi.dto.GrupoDto;
import com.taskboardapi.services.GrupoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<List<GrupoDto>> findAll() {
        List<GrupoDto> grupoDtos = grupoServices.findAll();
        return ResponseEntity.ok(grupoDtos);
    }
}
