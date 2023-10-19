SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;

CREATE DATABASE IF NOT EXISTS wallet_manager;
USE wallet_manager;

CREATE TABLE IF NOT EXISTS `wallets` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `balance` decimal(8,2) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `wallet_name` varchar(255) NOT NULL,
  `reference` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `synced_at` datetime NOT NULL,
  CONSTRAINT `id` PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
