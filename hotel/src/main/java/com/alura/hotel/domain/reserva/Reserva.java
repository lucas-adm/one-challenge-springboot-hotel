package com.alura.hotel.domain.reserva;

import com.alura.hotel.domain.hospede.DadosCadastroHospede;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Reserva")
@Table(name = "reservas")
@EqualsAndHashCode(of = "id")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_check_in")
    private LocalDate dataCheckIn;

    @Column(name = "data_check_out")
    private LocalDate dataCheckOut;

    @Column(name = "preco")
    private Integer valorReserva;

    @Column(name = "preco_pagamento")
    @Enumerated(EnumType.STRING)
    private Pagamento pagamento;

    public Reserva(DadosCadastroReserva dados) {
        this.dataCheckIn = dados.dataCheckIn();
        this.dataCheckOut = dados.dataCheckOut();
        this.valorReserva = dados.valorReserva();
        this.pagamento = dados.pagamento();
    }

    public void atualizarReserva(DadosAtualizacaoReserva dados){
        this.dataCheckIn = dados.dataCheckIn();
        this.dataCheckOut = dados.dataCheckOut();
        this.valorReserva = dados.valorReserva();
        this.pagamento = dados.pagamento();
    }

}
