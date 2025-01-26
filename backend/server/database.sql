CREATE TYPE item_status AS ENUM ('Listed', 'Awaiting Pickup', 'Renting', 'Returned');

CREATE TABLE Items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(256) NOT NULL,
    rental_fee INTEGER NOT NULL,
    collateral INTEGER NOT NULL,
    days_limit INTEGER NOT NULL,
    days_rented INTEGER NOT NULL,
    images TEXT[] NOT NULL,
    status item_status NOT NULL
);

CREATE TABLE Lender (
    item_id INTEGER NOT NULL,
    is_picked_up BOOLEAN NOT NULL,
    is_returned BOOLEAN NOT NULL,
    email VARCHAR(128) NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (item_id) REFERENCES Items(id)
);

CREATE TABLE Renter (
    item_id INTEGER NOT NULL,
    is_picked_up BOOLEAN NOT NULL,
    is_returned BOOLEAN NOT NULL,
    email VARCHAR(128) NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (item_id) REFERENCES Items(id)
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) NOT NULL,
    wallet_address VARCHAR(256) NOT NULL
);
