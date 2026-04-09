-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 28 mars 2025 à 18:14
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `abonnement`
--

-- --------------------------------------------------------

--
-- Structure de la table `abonnements`
--

CREATE TABLE `abonnements` (
  `id` int(10) UNSIGNED NOT NULL,
  `inactif` tinyint(1) DEFAULT NULL,
  `fin` tinyint(1) DEFAULT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `utilisateur_id` int(10) UNSIGNED NOT NULL,
  `compte_id` int(10) UNSIGNED NOT NULL,
  `type_compte_id` int(10) UNSIGNED NOT NULL,
  `profil_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `abonnements`
--

INSERT INTO `abonnements` (`id`, `inactif`, `fin`, `date_debut`, `date_fin`, `created_at`, `updated_at`, `utilisateur_id`, `compte_id`, `type_compte_id`, `profil_id`) VALUES
(1, 0, 0, '2025-03-25', '2025-04-24', '2025-03-25 16:36:24', '2025-03-25 16:36:24', 12, 1, 1, 1),
(2, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 07:47:57', '2025-03-26 07:47:57', 12, 1, 1, 2),
(3, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 07:48:17', '2025-03-26 07:48:17', 12, 1, 1, 3),
(4, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:16:31', '2025-03-26 09:16:31', 15, 4, 8, 6),
(5, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:16:54', '2025-03-26 09:16:54', 15, 5, 8, 11),
(6, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:16:56', '2025-03-26 09:16:56', 15, 4, 8, 7),
(7, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:16:59', '2025-03-26 09:16:59', 15, 5, 8, 12),
(8, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:17:01', '2025-03-26 09:17:01', 15, 4, 8, 8),
(9, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:17:04', '2025-03-26 09:17:04', 15, 5, 8, 13),
(10, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:17:06', '2025-03-26 09:17:06', 15, 4, 8, 9),
(11, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:17:08', '2025-03-26 09:17:08', 15, 5, 8, 14),
(12, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:17:11', '2025-03-26 09:17:11', 15, 4, 8, 10),
(13, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:17:13', '2025-03-26 09:17:13', 15, 5, 8, 15),
(14, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:17:16', '2025-03-26 09:17:16', 15, 4, 8, 6),
(15, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:17:20', '2025-03-26 09:17:20', 15, 5, 8, 11),
(16, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:18:09', '2025-03-26 09:18:09', 15, 4, 8, 7),
(17, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:19:07', '2025-03-26 09:19:07', 15, 5, 8, 12),
(18, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:19:38', '2025-03-26 09:19:38', 15, 4, 8, 8),
(19, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 09:24:32', '2025-03-26 09:24:32', 15, 5, 8, 13),
(20, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 12:55:12', '2025-03-26 12:55:12', 15, 1, 13, 4),
(21, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 12:55:12', '2025-03-26 12:55:12', 15, 4, 13, 8),
(22, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 14:32:56', '2025-03-26 14:32:56', 15, 1, 13, 5),
(23, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 14:32:56', '2025-03-26 14:32:56', 15, 5, 13, 13),
(26, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 14:36:25', '2025-03-26 14:36:25', 15, 1, 13, 1),
(27, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 14:36:25', '2025-03-26 14:36:25', 15, 4, 13, 8),
(28, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 14:42:18', '2025-03-26 14:42:18', 15, 1, 2, 2),
(29, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 14:44:44', '2025-03-26 14:44:44', 15, 1, 2, 3),
(30, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 14:53:43', '2025-03-26 14:53:43', 15, 1, 13, 1),
(31, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 14:53:43', '2025-03-26 14:53:43', 15, 4, 13, 6),
(32, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 15:03:25', '2025-03-26 15:03:25', 18, 1, 13, 2),
(33, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 15:03:25', '2025-03-26 15:03:25', 18, 5, 13, 11),
(34, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 15:03:41', '2025-03-26 15:03:41', 15, 1, 13, 3),
(35, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 15:03:41', '2025-03-26 15:03:41', 15, 4, 13, 7),
(36, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 15:04:31', '2025-03-26 15:04:31', 18, 1, 13, 4),
(37, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 15:04:31', '2025-03-26 15:04:31', 18, 5, 13, 12),
(38, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 15:23:13', '2025-03-26 15:23:13', 25, 1, 13, 5),
(39, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 15:23:13', '2025-03-26 15:23:13', 25, 4, 13, 8),
(40, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 15:33:12', '2025-03-26 15:33:12', 26, 1, 3, 1),
(41, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 15:35:18', '2025-03-26 15:35:18', 26, 1, 3, 2),
(42, 0, 0, '2025-03-26', '2025-04-25', '2025-03-26 16:04:07', '2025-03-26 16:04:07', 26, 1, 3, 3),
(43, 0, 0, '2025-03-28', '2025-04-27', '2025-03-28 14:56:37', '2025-03-28 14:56:37', 26, 1, 3, 1),
(44, 0, 0, '2025-03-28', '2025-04-27', '2025-03-28 14:58:50', '2025-03-28 14:58:50', 26, 1, 13, 2),
(45, 0, 0, '2025-03-28', '2025-04-27', '2025-03-28 14:58:50', '2025-03-28 14:58:50', 26, 5, 13, 13),
(46, 0, 0, '2025-03-28', '2025-04-27', '2025-03-28 15:37:55', '2025-03-28 15:37:55', 26, 1, 3, 5),
(47, 0, 0, '2025-03-28', '2025-05-27', '2025-03-28 15:43:17', '2025-03-28 15:43:17', 26, 1, 13, 1),
(48, 0, 0, '2025-03-28', '2025-05-27', '2025-03-28 15:43:17', '2025-03-28 15:43:17', 26, 4, 13, 9);

-- --------------------------------------------------------

--
-- Structure de la table `access_tokens`
--

CREATE TABLE `access_tokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `utilisateur_id` int(10) UNSIGNED DEFAULT NULL,
  `admin_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `access_tokens`
--

INSERT INTO `access_tokens` (`id`, `token`, `type`, `expires_at`, `created_at`, `updated_at`, `utilisateur_id`, `admin_id`) VALUES
(1, 'f04d749a-c7ec-47ea-a248-0cf3c6f03078', 'Bearer', '2025-03-25 22:43:41', '2025-03-25 10:43:41', '2025-03-25 10:43:41', NULL, 1),
(2, 'ef3fd930-ff3a-4d10-bcd4-2f7b9c93fba5', 'Bearer', '2025-03-26 20:22:45', '2025-03-26 08:22:45', '2025-03-26 08:22:45', NULL, 1),
(3, 'c65a7acc-f225-4da3-a20a-b9f3e94bdc1a', 'Bearer', '2025-03-27 19:31:56', '2025-03-27 07:31:56', '2025-03-27 07:31:56', NULL, 1),
(4, 'f372c9d3-77ee-430b-8ff1-d2c906b350ac', 'Bearer', '2025-03-29 02:49:05', '2025-03-28 14:49:05', '2025-03-28 14:49:05', NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `email`, `mot_de_passe`, `created_at`, `updated_at`) VALUES
(1, 'tj.stoorx@gmail.com', '$scrypt$n=16384,r=8,p=1$8+qe4G6YHOLX4Qj9fDdbuw$9rlV9LqBaGPx6+op+A+Lr7s1af6C1R+O6XI0/zmSb8s1k4SIVeidDKYpn3+k9f5vNPG4/0aA2vSV3P9Alck/XA', '2025-03-25 10:40:50', '2025-03-25 10:40:50');

-- --------------------------------------------------------

--
-- Structure de la table `adonis_schema`
--

CREATE TABLE `adonis_schema` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, 'database/migrations/1740750347288_create_create_typecomptes_table', 1, '2025-03-25 11:37:02'),
(2, 'database/migrations/1740750392493_create_create_comptes_table', 1, '2025-03-25 11:37:02'),
(3, 'database/migrations/1740750448840_create_create_notifications_table', 1, '2025-03-25 11:37:02'),
(4, 'database/migrations/1740750499069_create_create_abonnements_table', 1, '2025-03-25 11:37:02'),
(5, 'database/migrations/1740750558821_create_create_admins_table', 1, '2025-03-25 11:37:03'),
(6, 'database/migrations/1740750598414_create_create_profils_table', 1, '2025-03-25 11:37:03'),
(7, 'database/migrations/1740750634500_create_create_utilisateurs_table', 1, '2025-03-25 11:37:03'),
(8, 'database/migrations/1740750672627_create_create_verifications_table', 1, '2025-03-25 11:37:03'),
(9, 'database/migrations/1740760739273_create_create_foreign_in_abonnements_table', 1, '2025-03-25 11:37:03'),
(10, 'database/migrations/1740761410513_create_create_foreign_in_notifications_table', 1, '2025-03-25 11:37:03'),
(11, 'database/migrations/1740761553515_create_create_foreign_in_profils_table', 1, '2025-03-25 11:37:03'),
(12, 'database/migrations/1741096188338_create_access_tokens_table', 1, '2025-03-25 11:37:03'),
(13, 'database/migrations/1741106643856_create_create_foreign_in_access_tokens_table', 1, '2025-03-25 11:37:03'),
(14, 'database/migrations/1742653055162_create_create_foreign_key_in_table_access_tokens_table', 1, '2025-03-25 11:37:03'),
(15, 'database/migrations/1742993841074_create_add_column_composition_in_table_type_comptes_table', 2, '2025-03-26 13:00:27'),
(16, 'database/migrations/1742993841075_remove_unique_constraint_from_telephone', 3, '2025-03-26 16:22:03'),
(17, 'database/migrations/1743167311897_create_historique_abonnements_table', 4, '2025-03-28 16:27:05'),
(18, 'database/migrations/1743178991026_create_alter_message_column_in_notifications_table', 4, '2025-03-28 16:27:05');

-- --------------------------------------------------------

--
-- Structure de la table `adonis_schema_versions`
--

CREATE TABLE `adonis_schema_versions` (
  `version` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `adonis_schema_versions`
--

INSERT INTO `adonis_schema_versions` (`version`) VALUES
(2);

-- --------------------------------------------------------

--
-- Structure de la table `comptes`
--

CREATE TABLE `comptes` (
  `id` int(10) UNSIGNED NOT NULL,
  `email_compte` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `plateforme` varchar(255) NOT NULL,
  `nb_utilisateurs` int(11) DEFAULT 0,
  `date_expiration` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `comptes`
--

INSERT INTO `comptes` (`id`, `email_compte`, `mot_de_passe`, `plateforme`, `nb_utilisateurs`, `date_expiration`, `created_at`, `updated_at`) VALUES
(1, 'userj@exampole.com', 'password12bfbhcjbdc3', 'Netflix', 7, '2025-03-06', '2025-03-25 15:26:02', '2025-03-28 15:43:17'),
(2, 'userj2@exampole.com', 'password123', 'Netflix', 0, '2025-03-06', '2025-03-25 15:26:21', '2025-03-25 15:28:28'),
(3, 'userj3@exampole.com', 'password123', 'Netflix', 0, '2025-03-06', '2025-03-25 15:26:42', '2025-03-25 15:28:42'),
(4, 'primevideo@example.com', 'password123', 'Prime video', 4, '2025-03-06', '2025-03-26 08:37:03', '2025-03-28 15:43:17'),
(5, 'primevideo2@example.com', 'password123', 'Prime video', 3, '2025-03-06', '2025-03-26 08:37:12', '2025-03-28 14:58:50'),
(6, 'primevideo3@example.com', 'password123', 'Prime video', 0, '2025-03-06', '2025-03-26 08:37:18', '2025-03-26 08:37:18'),
(7, 'primevideo4@example.com', 'password123', 'Prime video', 0, '2025-03-06', '2025-03-26 08:37:23', '2025-03-26 08:37:23'),
(8, 'primevideo5@example.com', 'password123', 'Prime video', 0, '2025-03-06', '2025-03-26 08:37:31', '2025-03-26 08:37:31');

-- --------------------------------------------------------

--
-- Structure de la table `historique_abonnements`
--

CREATE TABLE `historique_abonnements` (
  `id` int(10) UNSIGNED NOT NULL,
  `utilisateur_id` int(10) UNSIGNED DEFAULT NULL,
  `compte_id` int(10) UNSIGNED DEFAULT NULL,
  `profil_id` int(10) UNSIGNED DEFAULT NULL,
  `type_compte_id` int(10) UNSIGNED DEFAULT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `inactif` tinyint(1) DEFAULT 0,
  `fin` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `message` text DEFAULT NULL,
  `lue` tinyint(1) DEFAULT 0,
  `tous` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `utilisateur_id` int(10) UNSIGNED DEFAULT NULL,
  `admin_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id`, `message`, `lue`, `tous`, `created_at`, `updated_at`, `utilisateur_id`, `admin_id`) VALUES
(1, 'Félicitations Jerry Tkp, votre abonnement a été effectué avec succès le 28/03/2025 à 15:56.\n\n\nCompte: userj@exampole.com\nMot de passe: password12bfbhcjbdc3\nProfil: AJOM0001\nPIN:  0001\nDate de début: 28/03/2025\nDate de fin: 27/04/2025\n\n\nVous pouvez télécha', 0, 0, '2025-03-28 14:56:38', '2025-03-28 14:56:38', 26, NULL),
(2, 'Félicitations Jerry Tkp, votre abonnement a été effectué avec succès le 28/03/2025 à 15:58.\n\nVos comptes :\n\nNetflix:\nEmail: userj@exampole.com\nMot de passe: password12bfbhcjbdc3\nProfil: AJOM0002\nPIN:  0002\nDate de début: 28/03/2025\nDate de fin: 27/04/2025', 0, 0, '2025-03-28 14:58:52', '2025-03-28 14:58:52', 26, NULL),
(3, 'Félicitations Jerry Tkp, votre abonnement a été effectué avec succès le 28/03/2025 à 16:37.\n\n\nCompte: userj@exampole.com\nMot de passe: password12bfbhcjbdc3\nProfil: AJOM0005\nPIN:  0005\nDate de début: 28/03/2025\nDate de fin: 27/04/2025\n\n\nVous pouvez télécharger le PDF de vos informations en cliquant ici : /pdfs/abonnement_26_20250328163755.pdf', 0, 0, '2025-03-28 15:37:57', '2025-03-28 15:37:57', 26, NULL),
(4, 'Félicitations Jerry Tkp, votre abonnement a été effectué avec succès le 28/03/2025 à 16:43.\n\nVos comptes :\n\nNetflix:\nEmail: userj@exampole.com\nMot de passe: password12bfbhcjbdc3\nProfil: AJOM0001\nPIN:  0001\nDate de début: 28/03/2025\nDate de fin: 27/05/2025\n\nPrime video:\nEmail: primevideo@example.com\nMot de passe: password123\nProfil: AJOM0004\nPIN:  0004\nDate de début: 28/03/2025\nDate de fin: 27/05/2025\n\n\nVous pouvez télécharger le PDF de vos informations en cliquant ici : /pdfs/abonnement_26_20250328164317.pdf', 0, 0, '2025-03-28 15:43:18', '2025-03-28 15:43:18', 26, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `profils`
--

CREATE TABLE `profils` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom_profil` varchar(255) NOT NULL,
  `pin` varchar(255) NOT NULL,
  `nb_abonnes` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `compte_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `profils`
--

INSERT INTO `profils` (`id`, `nom_profil`, `pin`, `nb_abonnes`, `created_at`, `updated_at`, `compte_id`) VALUES
(1, 'AJOM0001', ' 0001', 2, '2025-03-25 16:21:22', '2025-03-28 15:43:17', 1),
(2, 'AJOM0002', ' 0002', 1, '2025-03-25 16:21:36', '2025-03-28 14:58:50', 1),
(3, 'AJOM0003', ' 0003', 1, '2025-03-25 16:21:50', '2025-03-26 16:04:07', 1),
(4, 'AJOM0004', ' 0004', 1, '2025-03-25 16:22:08', '2025-03-26 15:04:31', 1),
(5, 'AJOM0005', ' 0005', 1, '2025-03-25 16:22:19', '2025-03-28 15:37:55', 1),
(6, 'AJOM0001', ' 0001', 1, '2025-03-26 08:46:48', '2025-03-26 14:53:43', 4),
(7, 'AJOM0002', ' 0002', 1, '2025-03-26 08:47:03', '2025-03-26 15:03:41', 4),
(8, 'AJOM0003', ' 0003', 1, '2025-03-26 08:47:16', '2025-03-26 15:23:13', 4),
(9, 'AJOM0004', ' 0004', 1, '2025-03-26 08:47:26', '2025-03-28 15:43:17', 4),
(10, 'AJOM0005', ' 0005', 0, '2025-03-26 08:47:41', '2025-03-26 09:17:11', 4),
(11, 'AJOM0001', ' 0001', 1, '2025-03-26 08:48:00', '2025-03-26 15:03:25', 5),
(12, 'AJOM0002', ' 0002', 1, '2025-03-26 08:48:18', '2025-03-26 15:04:31', 5),
(13, 'AJOM0003', ' 0003', 1, '2025-03-26 08:48:32', '2025-03-28 14:58:50', 5),
(14, 'AJOM0004', ' 0004', 0, '2025-03-26 08:48:42', '2025-03-26 09:17:08', 5),
(15, 'AJOM0005', ' 0005', 0, '2025-03-26 08:48:49', '2025-03-26 09:17:13', 5);

-- --------------------------------------------------------

--
-- Structure de la table `type_comptes`
--

CREATE TABLE `type_comptes` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prix` int(11) NOT NULL,
  `nombre_ecran` int(11) NOT NULL,
  `plateforme` varchar(255) NOT NULL,
  `image` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `composition` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `type_comptes`
--

INSERT INTO `type_comptes` (`id`, `nom`, `prix`, `nombre_ecran`, `plateforme`, `image`, `description`, `created_at`, `updated_at`, `composition`) VALUES
(1, 'Netflix 1/2 mois 1 ecran ', 1500, 1, 'Netflix', 'uploads/1742903973781_ajom digital.png', 'Un produit de test', '2025-03-25 10:44:27', '2025-03-25 10:59:33', NULL),
(2, 'Netflix 1 ecran', 2300, 1, 'Netflix', 'uploads/1742903177894_Kawasaki Z1000 R 2017.jpg', 'Un produit de test', '2025-03-25 10:46:17', '2025-03-25 10:46:17', NULL),
(3, 'Netflix 2 ecrans', 4500, 2, 'Netflix', 'uploads/1742903204515_Kawasaki Z1000 R 2017.jpg', 'Un produit de test', '2025-03-25 10:46:44', '2025-03-25 10:46:44', NULL),
(7, 'Prime 1/2', 2000, 1, 'Prime video', 'uploads/1742981010930_41f14cab-2ea5-4b84-aa6c-29084739bb33.jpeg', 'Un produit de test', '2025-03-26 08:23:30', '2025-03-26 08:23:30', NULL),
(8, 'Prime 1', 3000, 1, 'Prime video', 'uploads/1742981030296_41f14cab-2ea5-4b84-aa6c-29084739bb33.jpeg', 'Un produit de test', '2025-03-26 08:23:50', '2025-03-26 08:23:50', NULL),
(9, 'Prime 2', 5500, 1, 'Prime video', 'uploads/1742981044203_41f14cab-2ea5-4b84-aa6c-29084739bb33.jpeg', 'Un produit de test', '2025-03-26 08:24:04', '2025-03-26 08:24:04', NULL),
(10, 'Prime 3', 7500, 3, 'Prime video', 'uploads/1742981685407_ajom digital.png', 'Un produit de test', '2025-03-26 08:24:19', '2025-03-26 08:34:45', NULL),
(11, 'Prime 4', 5500, 4, 'Prime video', 'uploads/1742981071859_41f14cab-2ea5-4b84-aa6c-29084739bb33.jpeg', 'Un produit de test', '2025-03-26 08:24:31', '2025-03-26 08:24:31', NULL),
(12, 'Prime 5', 13500, 5, 'Prime video', 'uploads/1742981106092_41f14cab-2ea5-4b84-aa6c-29084739bb33.jpeg', 'Un produit de test', '2025-03-26 08:25:06', '2025-03-26 08:25:06', NULL),
(13, 'Pack standard', 5000, 1, 'pack', 'uploads/1742994276422_ajom digital bon.png', 'Un produit de test', '2025-03-26 12:04:36', '2025-03-26 12:04:36', 'Netflix,Prime video');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `telephone`, `created_at`, `updated_at`) VALUES
(12, 'John Doe', 'john.doe@example.com', '+2250123456789', '2025-03-25 16:36:24', '2025-03-25 16:36:24'),
(15, 'Jerry Tkp Test', 'tokponjerrytest@gmail.com', '+22967357728', '2025-03-26 09:16:30', '2025-03-26 14:42:18'),
(18, 'Jerry Tkp Test', 'tokponjerry@gmail.com', '+229673577228', '2025-03-26 15:03:25', '2025-03-26 15:03:25'),
(25, 'Jerry to Tkp', 'tokponjerry@gmaililpllllo.com', '+22967357728', '2025-03-26 15:23:13', '2025-03-26 15:23:13'),
(26, 'Jerry Tkp', 'torba@gmail.com', '+22967357728', '2025-03-26 15:33:12', '2025-03-26 15:33:12');

-- --------------------------------------------------------

--
-- Structure de la table `verifications`
--

CREATE TABLE `verifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `utilise` tinyint(1) DEFAULT 0,
  `expire_a` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `abonnements`
--
ALTER TABLE `abonnements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `abonnements_utilisateur_id_foreign` (`utilisateur_id`),
  ADD KEY `abonnements_compte_id_foreign` (`compte_id`),
  ADD KEY `abonnements_type_compte_id_foreign` (`type_compte_id`),
  ADD KEY `abonnements_profil_id_foreign` (`profil_id`);

--
-- Index pour la table `access_tokens`
--
ALTER TABLE `access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `access_tokens_token_unique` (`token`),
  ADD KEY `access_tokens_utilisateur_id_foreign` (`utilisateur_id`),
  ADD KEY `access_tokens_admin_id_foreign` (`admin_id`);

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Index pour la table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `adonis_schema_versions`
--
ALTER TABLE `adonis_schema_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `comptes`
--
ALTER TABLE `comptes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `comptes_email_compte_unique` (`email_compte`);

--
-- Index pour la table `historique_abonnements`
--
ALTER TABLE `historique_abonnements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `historique_abonnements_utilisateur_id_foreign` (`utilisateur_id`),
  ADD KEY `historique_abonnements_compte_id_foreign` (`compte_id`),
  ADD KEY `historique_abonnements_profil_id_foreign` (`profil_id`),
  ADD KEY `historique_abonnements_type_compte_id_foreign` (`type_compte_id`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_utilisateur_id_foreign` (`utilisateur_id`),
  ADD KEY `notifications_admin_id_foreign` (`admin_id`);

--
-- Index pour la table `profils`
--
ALTER TABLE `profils`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profils_compte_id_foreign` (`compte_id`);

--
-- Index pour la table `type_comptes`
--
ALTER TABLE `type_comptes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type_comptes_nom_unique` (`nom`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `utilisateurs_email_unique` (`email`);

--
-- Index pour la table `verifications`
--
ALTER TABLE `verifications`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `abonnements`
--
ALTER TABLE `abonnements`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pour la table `access_tokens`
--
ALTER TABLE `access_tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `comptes`
--
ALTER TABLE `comptes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `historique_abonnements`
--
ALTER TABLE `historique_abonnements`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `profils`
--
ALTER TABLE `profils`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `type_comptes`
--
ALTER TABLE `type_comptes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `verifications`
--
ALTER TABLE `verifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `abonnements`
--
ALTER TABLE `abonnements`
  ADD CONSTRAINT `abonnements_compte_id_foreign` FOREIGN KEY (`compte_id`) REFERENCES `comptes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `abonnements_profil_id_foreign` FOREIGN KEY (`profil_id`) REFERENCES `profils` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `abonnements_type_compte_id_foreign` FOREIGN KEY (`type_compte_id`) REFERENCES `type_comptes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `abonnements_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `access_tokens`
--
ALTER TABLE `access_tokens`
  ADD CONSTRAINT `access_tokens_admin_id_foreign` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `access_tokens_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `historique_abonnements`
--
ALTER TABLE `historique_abonnements`
  ADD CONSTRAINT `historique_abonnements_compte_id_foreign` FOREIGN KEY (`compte_id`) REFERENCES `comptes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historique_abonnements_profil_id_foreign` FOREIGN KEY (`profil_id`) REFERENCES `profils` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historique_abonnements_type_compte_id_foreign` FOREIGN KEY (`type_compte_id`) REFERENCES `type_comptes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historique_abonnements_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_admin_id_foreign` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `profils`
--
ALTER TABLE `profils`
  ADD CONSTRAINT `profils_compte_id_foreign` FOREIGN KEY (`compte_id`) REFERENCES `comptes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
