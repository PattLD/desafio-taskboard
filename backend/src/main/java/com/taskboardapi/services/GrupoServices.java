package com.taskboardapi.services;
import com.taskboardapi.models.Grupo;
import com.taskboardapi.repositories.GrupoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GrupoServices {
    private GrupoRepository grupoRepository;

    public GrupoServices (GrupoRepository grupoRepository) {
        this.grupoRepository = grupoRepository;
    }

    public List<Grupo> findAll() {
        return grupoRepository.findAll();
    }

    public Grupo save(Grupo grupo) {
        return grupoRepository.save(grupo);
    }
}
