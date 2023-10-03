package com.alura.hotel.domain.reserva;

import java.time.LocalDate;

public record DadosDetalhamentoReserva(Long id, LocalDate dataCheckIn, LocalDate dataCheckOut, Integer valorReserva,
                                       Pagamento pagamento) {

    public DadosDetalhamentoReserva(Reserva reserva) {
        this(reserva.getId(), reserva.getDataCheckIn(), reserva.getDataCheckOut(), reserva.getValorReserva(), reserva.getPagamento());
    }
}
