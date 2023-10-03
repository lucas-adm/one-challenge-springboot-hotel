package com.alura.hotel.domain.reserva;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IReserva extends JpaRepository<Reserva, Long> {

    //O JpaRepo entende o conceito por traz do nome do método;
    //SELECT * FROM reservas ORDER BY id DESC LIMIT 1
    Reserva findFirstByOrderByIdDesc();

    @Query(value = "SELECT COALESCE(MAX(id), 0) + 1 FROM reservas", nativeQuery = true)
    Long findNextAvailableId();

    //Método para cadastrar um hóspede no último id gerado
    @Query("SELECT i FROM Reserva i WHERE i.id = :id")
    Reserva encontrarPorId(@Param("id") Long idReserva);

}
