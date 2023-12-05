-- This file is used to create the database and the tables
-- It is executed when the container is created
DROP DATABASE `count-of-money`;
-- Create the database
-- Name: count-of-money
CREATE DATABASE IF NOT EXISTS `count-of-money` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
FLUSH PRIVILEGES;
USE `count-of-money`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Create the tables

-- Name: article
-- Columns: id, link, rss_id
-- Primary key: id
-- Foreign key: rss_id
CREATE TABLE `article` (
    `id` int(11) NOT NULL,
    `link` varchar(500) NOT NULL,
    `rss_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Name: chosen_cryptos
-- Columns: id, user_id
-- Primary key: id
-- Foreign key: user_id
CREATE TABLE `chosen_cryptos` (
    `id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `crypto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Name: crypto
-- Columns: id, name
-- Primary key: id
CREATE TABLE `crypto` (
    `id` varchar(50) NOT NULL,
    `name` varchar(50) NOT NULL,
    `image` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Name: favorite_keywords
-- Columns: id, user_id
-- Primary key: id
CREATE TABLE `favorite_keywords` (
    `id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `keyword_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Name: keyword
-- Columns: id, keyword
-- Primary key: id
CREATE TABLE `keyword` (
    `id` int(11) NOT NULL,
    `keyword` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Name: keyword_article
-- Columns: id, article_id
-- Primary key: id
-- Foreign key: article_id
CREATE TABLE `keyword_article` (
    `id` int(11) NOT NULL,
    `article_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Name: rss_flux
-- Columns: id, link, name
-- Primary key: id
CREATE TABLE `rss_flux` (
    `id` int(11) NOT NULL,
    `link` varchar(250) NOT NULL,
    `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Name: user
-- Columns: id, name, mail, password, birth_date, provider_id, provider_name
-- Primary key: id
CREATE TABLE `user` (
    `id` int(11) NOT NULL,
    `name` varchar(50) NOT NULL,
    `mail` varchar(50) DEFAULT NULL,
    `password` varchar(120) DEFAULT NULL,
    `birth_date` date NOT NULL,
    `provider_id` int(11) DEFAULT NULL,
    `provider_name` VARCHAR(50) DEFAULT NULL,
    `roles` varchar(10) DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

-- Index pour la table `article`
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rss_id` (`rss_id`);

-- Index pour la table `chosen_cryptos`
ALTER TABLE `chosen_cryptos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `crypto_id` (`crypto_id`);

-- Index pour la table `crypto`
ALTER TABLE `crypto`
  ADD PRIMARY KEY (`id`);

-- Index pour la table `favorite_keywords`
ALTER TABLE `favorite_keywords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `keyword_id` (`keyword_id`);

-- Index pour la table `keyword`
ALTER TABLE `keyword`
  ADD PRIMARY KEY (`id`);

-- Index pour la table `keyword_article`
ALTER TABLE `keyword_article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`article_id`);

-- Index pour la table `rss_flux`
ALTER TABLE `rss_flux`
  ADD PRIMARY KEY (`id`);

-- Index pour la table `user`
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

-- AUTO_INCREMENT pour la table `article`
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- AUTO_INCREMENT pour la table `chosen_cryptos`
ALTER TABLE `chosen_cryptos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- AUTO_INCREMENT pour la table `favorite_keywords`
ALTER TABLE `favorite_keywords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- AUTO_INCREMENT pour la table `keyword`
ALTER TABLE `keyword`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- AUTO_INCREMENT pour la table `keyword_article`
ALTER TABLE `keyword_article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- AUTO_INCREMENT pour la table `rss_flux`
ALTER TABLE `rss_flux`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- AUTO_INCREMENT pour la table `user`
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Contraintes pour les tables déchargées
--

-- Contraintes pour la table `article`
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`rss_id`) REFERENCES `rss_flux` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Contraintes pour la table `chosen_cryptos`
ALTER TABLE `chosen_cryptos`
  ADD CONSTRAINT `chosen_cryptos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chosen_cryptos_ibfk_2` FOREIGN KEY (`crypto_id`) REFERENCES `crypto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Contraintes pour la table `favorite_keywords`
ALTER TABLE `favorite_keywords`
  ADD CONSTRAINT `favorite_keywords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorite_keywords_ibfk_2` FOREIGN KEY (`keyword_id`) REFERENCES `keyword` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Contraintes pour la table `keyword_article`
ALTER TABLE `keyword_article`
  ADD CONSTRAINT `keyword_article_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


COMMIT;