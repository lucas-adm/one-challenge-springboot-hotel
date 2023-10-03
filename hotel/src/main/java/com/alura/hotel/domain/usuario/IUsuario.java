package com.alura.hotel.domain.usuario;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IUsuario extends JpaRepository<Usuario, Long> {

    Usuario findByNomeAndSenha(String nome, String senha);

}
