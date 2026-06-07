package com.taskboardapi.services;
import com.taskboardapi.models.Grupo;
import com.taskboardapi.repositories.GrupoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GrupoServices {
    private final GrupoRepository grupoRepository;

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
        Grupo grupoExistente = grupoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grupo não encontrado"));
        grupoExistente.setTitulo(grupo.getTitulo());
        return grupoRepository.save(grupoExistente);
    }

    public void deleteById(UUID id) {
        grupoRepository.deleteById(id);
    }

}
