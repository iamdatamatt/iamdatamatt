CREATE TABLE staff (
    email text PRIMARY KEY,
    name varchar(256) NOT NULL,
    profile_picture text NOT NULL,
    role varchar(256) NOT NULL,
    internal_api_key varchar(512) NOT NULL
);
