DROP TABLE IF EXISTS allMovie;

CREATE TABLE IF NOT EXISTS allMovie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    release_date VARCHAR(500),
    poster_path VARCHAR(255),
    overview VARCHAR(255)
);