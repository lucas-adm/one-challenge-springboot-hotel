package com.alura.hotel.domain.hospede;

import com.alura.hotel.domain.reserva.Reserva;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DadosCadastroHospede(
        @NotNull
        Long reservaId,

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
