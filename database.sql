CREATE TABLE IF NOT EXISTS users
(
    id       INTEGER(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    login    VARCHAR(50) UNIQUE                              NOT NULL,
    name     VARCHAR(191)                                    NOT NULL,
    password VARCHAR(191)                                    NOT NULL,
    created  DATE                                            NOT NULL
);

CREATE TABLE IF NOT EXISTS posts
(
    id       INTEGER(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title    VARCHAR(191)                                    NOT NULL,
    content  TEXT                                            NOT NULL,
    status   VARCHAR(15)                                     NOT NULL,
    created  DATE                                            NOT NULL,
    modified DATE                                            NOT NULL,
    user_id  INTEGER(11) UNSIGNED,

    FOREIGN KEY (user_id) references users (id)
)