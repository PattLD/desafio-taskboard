package com.taskboardapi.services;

import com.taskboardapi.dto.GrupoDto;
import java.util.List;

public interface GrupoServices {
    List<GrupoDto> findAllGrupos();
}
