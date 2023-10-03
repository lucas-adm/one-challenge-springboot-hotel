package com.alura.hotel.domain.hospede;

import com.alura.hotel.domain.reserva.Reserva;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Hospede")
@Table(name = "hospedes")
@EqualsAndHashCode(of = "id")
public class Hospede {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String sobrenome;

    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;

    @Column(name = "nacionalidade")
    @Enumerated(EnumType.STRING)
    private Nacionalidade nacionalidade;

    private String telefone;

    @OneToOne(fetch = FetchType.EAGER) //dependência
    @JoinColumn(name = "reserva_id", unique = true) //chave-estrangeira
    private Reserva reserva;

    public Hospede(DadosCadastroHospede dados) {
        this.nome = dados.nome();
        this.sobrenome = dados.sobrenome();
        this.dataNascimento = dados.dataNascimento();
        this.nacionalidade = dados.nacionalidade();
        this.telefone = dados.telefone();
    }

    public void atualizarHospede(DadosAtualizacaoHospede dados) {
        this.nome = dados.nome();
        this.sobrenome = dados.sobrenome();
        this.dataNascimento = dados.dataNascimento();
        this.nacionalidade = dados.nacionalidade();
        this.telefone = dados.telefone();
    }
}
