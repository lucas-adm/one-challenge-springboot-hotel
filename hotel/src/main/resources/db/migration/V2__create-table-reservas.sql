CREATE TABLE reservas(
    id BIGINT NOT NULL AUTO_INCREMENT,
    data_check_in DATE NOT NULL,
    data_check_out DATE NOT NULL,
    preco INT NOT NULL,
    preco_pagamento VARCHAR(25) NOT NULL,

    PRIMARY KEY(id)
);