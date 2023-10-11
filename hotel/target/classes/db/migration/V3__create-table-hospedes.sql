CREATE TABLE hospedes(
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(25) NOT NULL,
    sobrenome VARCHAR(25) NOT NULL,
    data_nascimento DATE NOT NULL,
    nacionalidade VARCHAR(25) NOT NULL,
    telefone VARCHAR(25) NOT NULL,
    reserva_id BIGINT NOT NULL,

    PRIMARY KEY(id),

    CONSTRAINT fk_hospedes_reservas_id FOREIGN KEY(reserva_id) REFERENCES reservas(id)
);