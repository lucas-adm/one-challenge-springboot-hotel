package com.alura.hotel.controller;

import com.alura.hotel.domain.hospede.Hospede;
import com.alura.hotel.domain.reserva.DadosAtualizacaoReserva;
import com.alura.hotel.domain.reserva.DadosCadastroReserva;
import com.alura.hotel.domain.reserva.IReserva;
import com.alura.hotel.domain.reserva.Reserva;
import com.alura.hotel.domain.usuario.Usuario;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private IReserva repository;

    @PostMapping
    @Transactional
    public ResponseEntity cadastrarReserva(@RequestBody @Valid DadosCadastroReserva dados) {
        var reserva = new Reserva(dados);
        repository.save(reserva);
        return ResponseEntity.ok().body(reserva);
    }

    @GetMapping
    public ResponseEntity buscarProximoIdDisponivel() {
        Long proximoIdReserva = repository.findNextAvailableId();
        return ResponseEntity.ok().body(proximoIdReserva);
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizarReserva(@RequestBody @Valid DadosAtualizacaoReserva dados) {
        var reserva = repository.getReferenceById(dados.id());
        reserva.atualizarReserva(dados);
        return ResponseEntity.ok().build();
    }

    @GetMapping("lista")
    public ResponseEntity<List<Reserva>> listarReservas() {
        List lista = repository.findAll();
        return ResponseEntity.ok().body(lista);
    }

    @PostMapping("id")
    public ResponseEntity encontrarPeloId(@RequestBody Map<String, Long> data) {
        Long id = data.get("id");
        var busca = repository.findById(id);
        return ResponseEntity.ok().body(busca);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletarReserva(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
