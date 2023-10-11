CREATE TABLE reservas(
    id SERIAL PRIMARY KEY,
    data_check_in DATE NOT NULL,
    data_check_out DATE NOT NULL,
    preco INT NOT NULL,
    preco_pagamento VARCHAR(25) NOT NULL
);