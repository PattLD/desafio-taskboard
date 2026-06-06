package com.taskboardapi.services;
import com.taskboardapi.models.Grupo;
import com.taskboardapi.repositories.GrupoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

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

    public Grupo update(UUID id, Grupo grupo) {
        return grupoRepository.save(grupo);
    }

    public void deleteById(UUID id) {
        grupoRepository.deleteById(id);
    }

}
