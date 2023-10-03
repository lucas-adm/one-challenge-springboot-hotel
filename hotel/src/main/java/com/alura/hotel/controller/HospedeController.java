package com.alura.hotel.controller;

import com.alura.hotel.domain.hospede.*;
import com.alura.hotel.domain.reserva.IReserva;
import com.alura.hotel.domain.reserva.Reserva;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/hospedes")
public class HospedeController {

    @Autowired
    private IHospede repository;

    //Necessário para acessar o método de buscar por Id e setar no DTO do Hospede
    @Autowired
    private IReserva repositoryReserva;

    @PostMapping
    @Transactional
    public ResponseEntity cadastrarHospede(@RequestBody DadosCadastroHospede dados) {

        var reservaId = repositoryReserva.encontrarPorId(dados.reservaId());
        //Tipo Hospede porque é um hóspede que registrou a reserva.
        Hospede reservaRegistrada = repository.findByReserva(reservaId);

        if (reservaRegistrada != null) {
            return ResponseEntity.badRequest().body("Reserva já registrada");
        }

        var hospede = new Hospede(dados);
        hospede.setReserva(reservaId);
        repository.save(hospede);

        return ResponseEntity.ok().body(dados);

    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizarDadosHospede(@RequestBody @Valid DadosAtualizacaoHospede dados) {
        var hospede = repository.getReferenceById(dados.id());
        hospede.atualizarHospede(dados);
        return ResponseEntity.ok().build();
    }

    @GetMapping("lista")
    public ResponseEntity<List<DadosListagemHospede>> listarHospedes() {

        List<Hospede> hospedes = repository.findAll();

        // Mapeia os Hospedes para DadosListagemHospede
        //.stream()- > cria um fluxo de elementos a partir da lista hospedes
        //.map(hospedes -> new DadosListagemHospede transforma cada objeto Hospede em um objeto DadosListagemHospede
        //se reserva for != null ele recupera o id dela, senão fica como null
        List<DadosListagemHospede> hospedeDTO = hospedes.stream().map(hospede -> new DadosListagemHospede(
                hospede.getReserva() != null ? hospede.getReserva().getId() : null,
                hospede.getId(),
                hospede.getNome(),
                hospede.getSobrenome(),
                hospede.getDataNascimento(),
                hospede.getNacionalidade(),
                hospede.getTelefone()
        )).toList();

        return ResponseEntity.ok(hospedeDTO);
    }

    @PostMapping("sobrenome")
    public ResponseEntity encontrarPeloSobrenome(@RequestBody Map<String, String> data) {

        String sobrenome = data.get("sobrenome");
        List<Hospede> hospedes = repository.findBySobrenome(sobrenome);

        List<DadosListagemHospede> hospedeDTO = hospedes.stream().map(hospede -> new DadosListagemHospede(
                hospede.getReserva() != null ? hospede.getReserva().getId() : null,
                hospede.getId(),
                hospede.getNome(),
                hospede.getSobrenome(),
                hospede.getDataNascimento(),
                hospede.getNacionalidade(),
                hospede.getTelefone()
        )).toList();

        return ResponseEntity.ok(hospedeDTO);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletarHospede(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
