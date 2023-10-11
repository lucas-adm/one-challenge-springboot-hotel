CREATE TABLE hospedes(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(25) NOT NULL,
    sobrenome VARCHAR(25) NOT NULL,
    data_nascimento DATE NOT NULL,
    nacionalidade VARCHAR(25) NOT NULL,
    telefone VARCHAR(25) NOT NULL,
    reserva_id BIGINT NOT NULL,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id)
);
