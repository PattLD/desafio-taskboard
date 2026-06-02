package com.taskboardapi.services;

import com.taskboardapi.dto.TarefaDto;
import java.util.List;

public interface TarefaServices {
    List<TarefaDto> findAllTarefas();
}
