package com.alura.hotel.domain.hospede;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DadosListagemHospede(
        @NotNull
        Long reservaId,

        @NotNull
        Long id,

        @NotBlank
        String nome,

        @NotBlank
        String sobrenome,

        @NotNull
        LocalDate dataNascimento,

        @NotNull
        Nacionalidade nacionalidade,

        @NotNull
        String telefone
) {
}
