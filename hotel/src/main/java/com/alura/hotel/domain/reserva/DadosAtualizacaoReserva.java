package com.alura.hotel.domain.reserva;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DadosAtualizacaoReserva(
        @NotNull
        Long id,

        LocalDate dataCheckIn,

        LocalDate dataCheckOut,

        Integer valorReserva,

        Pagamento pagamento

) {
}
