package com.alura.hotel.domain.hospede;

import com.alura.hotel.domain.reserva.Reserva;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IHospede extends JpaRepository<Hospede, Long> {

    Hospede findByReserva(Reserva reserva);

    List findBySobrenome(String sobrenome);

}
