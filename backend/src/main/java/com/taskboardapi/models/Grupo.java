package com.taskboardapi.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "grupos")
@Entity(name = "grupos")
public class Grupo {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String titulo;

    @JsonManagedReference
    @OneToMany(mappedBy = "grupo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tarefa> tarefas = new ArrayList<>();
}
