package com.alura.hotel.domain.reserva;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DadosCadastroReserva(
        @NotNull
        LocalDate dataCheckIn,

        @NotNull
        LocalDate dataCheckOut,

        @NotNull
        Integer valorReserva,

        @NotNull
        Pagamento pagamento
) {
}
