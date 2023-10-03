package com.alura.hotel.domain.usuario;

import jakarta.validation.constraints.NotBlank;

public record DadosAutenticacao(
        @NotBlank
        String nome,

        @NotBlank
        String senha
) {
}
