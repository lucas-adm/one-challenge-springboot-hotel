package com.alura.hotel.controller;

import com.alura.hotel.domain.usuario.DadosAutenticacao;
import com.alura.hotel.domain.usuario.IUsuario;
import com.alura.hotel.domain.usuario.Usuario;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/login")
public class UsuarioController {

    @Autowired
    private IUsuario repository;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody @Valid DadosAutenticacao dados) {

        Usuario usuario = repository.findByNomeAndSenha(dados.nome(), dados.senha());

        if(usuario != null) {
            return  ResponseEntity.ok("Autenticado com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

//    @GetMapping
//    public ResponseEntity<List<Usuario>> login(Usuario usuario){
//        List<Usuario> lista= repository.findAll();
//        return ResponseEntity.ok().body(lista);
//    }
}
