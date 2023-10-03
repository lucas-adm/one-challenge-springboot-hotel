package com.alura.hotel.domain.hospede;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DadosAtualizacaoHospede(

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

        @NotBlank
        String telefone
) {
}
