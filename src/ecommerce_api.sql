-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 25 juin 2024 à 06:38
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecommerce_api`
--

-- --------------------------------------------------------

--
-- Structure de la table `blog`
--

CREATE TABLE `blog` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` tinytext DEFAULT NULL,
  `image` tinytext DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `content` mediumtext DEFAULT NULL,
  `id_auth` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `blog`
--

INSERT INTO `blog` (`id`, `title`, `image`, `description`, `content`, `id_auth`, `created_at`, `updated_at`) VALUES
(4, 'Chinese Char Siu Inspired Honey Baked Ham', 'post-thumb-1.jpg', 'This year, instead of buying an expensive ready-made one, make your own char siu inspired honey baked ham instead!', 'This year, instead of making the same old same old, make your own mind-blowing char siu inspired honey baked ham instead.\n\nIf you’ve never glazed your own ham before or if you’ve only ever eaten dry ham, you’re probably wondering why I think ham is so delicious. Trust me when I say a perfectly glazed ham is just the right amount of salty balanced with sweet, with full hammy flavor.\n\nHam is everything right in the world, at least at the dinner table. Thanksgiving this year is looking a little different so maybe you’re not making a whole turkey, but who’s to say you can’t make yourself a ham?! Ham comes in all shapes and sizes making it perfect for a little pandemic honey baked ham holiday cheer.', 28, '2019-11-19 07:07:37', '2023-03-07 20:34:40'),
(5, 'Easiest Ever Instant Pot Osso Buco\nitalian foodbeef recipeseasyInstant Pot Recipes', 'post-thumb-2.jpg', 'It doesn’t get any easier than 6 ingredients and 1 hour of cook time.', 'The easiest way to make super tender, fall apart beefy bone marrow-y osso buco.\n\nHow often do you make it past the pasta part of the menu at a good Italian restaurant? We usually never do. But if I see osso buco on the menu, I make room to order it. How can you not love a slow braised, melt in your mouth beef shank in a beefy, bone marrow-y tomato sauce? Sometimes you even get a little spoon for the bone marrow. If its on the menu, it’s usually the best thing on the menu.\n\nBut if it’s not, you can make it at home in an hour on the instant pot. It’s perfect for special occasions but easy enough that you could have it on any given weeknight too.', 19, '2019-11-19 07:08:19', '2023-03-07 20:54:16'),
(6, 'Beef Tenderloin with a Giant Sauce Board', 'post-thumb-3.jpg', 'Beef tenderloin: melt-in-your-mouth buttery, extremely juicy, and deliciously beefy and especially satisfying with a 7-sauce sauce board.', 'This holiday season you should treat yourself. It’s been a rough year and you need something luxurious and show-stopping for your main holiday meal. This year you need a beautifully rosy, fork-tender, juicy beef tenderloin!\n\nYou’re probably thinking, aren’t beef tenderloins giant and serve 8-10 people? The answer is yes. But there are also center cut tenderloins that are mini and serve just 4. That’s perfect for you, your other, and LEFTOVERS. Or maybe just a really, really hearty meal. Either way, if you’re looking to make a large beef tenderloin or a slightly smaller one, here are all the tips and tricks for making the best roast beef in your life, aka roast beef tenderloin.', 23, '2019-11-19 07:08:30', '2019-11-19 07:08:30'),
(7, 'The crispiest, easiest roasted potatoes', 'post-thumb-1.jpg', 'British style roasted potatoes are the best: fluffy and soft on the inside with ultra crispy almost chip-like outsides.', 'So crispy, so potato-ey\nUltra crunchy and crisp outsides, a fluffy and mashed potato inside, and an addictive amount of scallions finished with a generous sprinkle of flaky sea salt.\n\nBest potatoes for roasting\nFirst off, for the best roasted potatoes you have to use the best roasting potatoes. The best potatoes for roasting are a combination of waxy and starchy. The waxiness holds its shape so it can develop crusty, caramelized outsides and the starchiness is the creamy, buttery, silky, fluffy inside. The perfect combination of waxy and starchy is the beautifully yellow, sweet and buttery Canadian Yukon gold potato! They are my all-time number one potato choice. But, if you can’t find Yukon golds, you can use russets, which are just a touch more starchy – they tend to not hold their shape as much.', 25, '2019-11-19 07:08:40', '2023-03-07 20:55:27'),
(8, 'The best food-related advent calendars this year\nbuying guide', 'post-thumb-1.jpg', 'If you love food and you love advent calendars, this list is for you.', 'A tomahawk steak is what dreams are made of.\n\nFor a special occasion, it’s a great choice: cheaper than a prime rib, more impressive than a roast. And the best part, you can make a perfect tomahawk at home better than most restaurants you’re likely to find it at only half the cost. Home-cooked steaks are always the best steaks. Here is everything you need to know to buy, cook, or serve a perfect tomahawk steak.', 31, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `city` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `brand`
--

CREATE TABLE `brand` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `brand`
--

INSERT INTO `brand` (`id`, `brand`, `created_at`, `updated_at`) VALUES
(3, 'Owen', '2023-03-07 13:30:49', '2023-03-07 13:30:49'),
(4, 'An Phước Pierre Cardin', '2023-03-07 13:30:54', '2023-03-07 13:30:54'),
(5, 'Việt Tiến', '2023-03-07 13:31:06', '2023-03-07 13:31:06'),
(6, 'Top4man', '2023-03-07 13:31:17', '2023-03-07 13:31:17');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `category`, `created_at`, `updated_at`) VALUES
(1, 'Vegetable', '2023-03-07 13:16:20', '2023-03-07 13:16:20'),
(2, 'Breads', '2023-03-07 13:16:25', '2023-03-07 13:16:25'),
(3, 'Fruit Juices', '2023-03-07 13:16:32', '2023-03-07 13:16:32'),
(4, 'Beverages', '2023-03-07 13:16:32', '2023-03-07 13:16:25'),
(5, 'Meet Products', '2023-03-07 13:16:32', '2023-03-07 13:16:25'),
(6, 'Sweets', '2023-03-07 13:16:32', '2023-03-07 13:16:28'),
(7, 'Fruits', '2023-03-07 13:16:32', '2023-03-07 13:16:28');

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_blog` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name_user` varchar(191) NOT NULL,
  `id_comment` int(11) NOT NULL,
  `comment` varchar(191) NOT NULL,
  `image_user` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `id_blog`, `id_user`, `name_user`, `id_comment`, `comment`, `image_user`, `created_at`, `updated_at`) VALUES
(1, 4, 4, 'Huy Tran', 0, 'Hello Mọi người', 'reviewer-1.jpg', '2023-09-17 19:11:00', '2023-09-17 19:11:00');

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `link` varchar(191) DEFAULT NULL,
  `description` varchar(191) DEFAULT NULL,
  `content` varchar(191) DEFAULT NULL,
  `id_auth` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `country`
--

CREATE TABLE `country` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `country`
--

INSERT INTO `country` (`id`, `name`) VALUES
(1, 'vietnam'),
(2, 'japan'),
(3, 'china');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(5, '2019_07_05_023908_create_coutry_table', 4),
(7, '2019_07_09_074327_create_one_page_table', 6),
(8, '2019_07_09_075141_create_one_page_table', 7),
(9, '2019_07_11_063331_create_products_table', 8),
(10, '2019_07_16_071709_create_products_table', 9),
(11, '2019_07_17_063714_create_contact_table', 10),
(12, '2019_07_17_065934_add_content__contact', 10),
(13, '2019_07_17_110748_create_blog_table', 10),
(14, '2019_07_20_184443_create_comment_table', 10),
(15, '2019_07_24_064652_create_rate_table', 10),
(16, '2019_07_24_114216_create_brand_table', 10),
(17, '2019_07_24_114400_create_category_table', 10),
(18, '2019_07_24_115902_create_product_table', 10),
(26, '2014_10_12_000000_create_users_table', 11),
(27, '2014_10_12_100000_create_password_resets_table', 11),
(28, '2019_07_04_080831_create_users_add_level_table', 11),
(29, '2019_07_05_022318_create_users_add_columns_table', 11),
(30, '2019_07_05_024109_create_country_table', 11),
(31, '2019_07_16_072622_create_category_table', 11),
(32, '2019_07_16_082143_create_brand_table', 11),
(33, '2019_07_16_083621_create_product_table', 11),
(34, '2019_07_27_173558_create_review_product_table', 11),
(35, '2019_07_27_175332_create_rate_product_table', 11),
(36, '2019_07_27_205936_update_change_id_sub_product_table', 11),
(37, '2019_07_28_084904_update_add_avatar_user_review_product_table', 11),
(38, '2019_08_05_041936_create_products_api_table', 12),
(39, '2019_08_05_044250_create_testapi_table', 13),
(40, '2019_07_17_052129_update_product_table', 14),
(41, '2019_08_04_085313_update_highlight_product_table', 15),
(42, '2019_08_15_191715_create_testapi_table', 16),
(43, '2016_06_01_000001_create_oauth_auth_codes_table', 17),
(44, '2016_06_01_000002_create_oauth_access_tokens_table', 17),
(45, '2016_06_01_000003_create_oauth_refresh_tokens_table', 17),
(46, '2016_06_01_000004_create_oauth_clients_table', 17),
(47, '2016_06_01_000005_create_oauth_personal_access_clients_table', 17),
(48, '2019_12_14_000001_create_personal_access_tokens_table', 18),
(49, '2023_03_07_105939_create_blogs_table', 18),
(50, '2023_03_07_110120_update_id_user_blogs_table', 18),
(51, '2023_03_07_132845_create_personal_access_token_table', 18);

-- --------------------------------------------------------

--
-- Structure de la table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(4) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `name` varchar(191) NOT NULL,
  `secret` varchar(100) NOT NULL,
  `redirect` text NOT NULL,
  `personal_access_client` tinyint(4) DEFAULT NULL,
  `password_client` tinyint(4) DEFAULT NULL,
  `revoked` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) NOT NULL,
  `access_token_id` varchar(100) NOT NULL,
  `revoked` tinyint(4) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `one_page`
--

CREATE TABLE `one_page` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `id_auth` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `address`, `created_at`, `description`, `email`, `name`, `phone`, `total`, `updated_at`, `user_id`, `date`, `status`, `payment_method`) VALUES
(1, 'Hòa Sơn, Hòa Vang, Đà Nẵng', NULL, 'VNQR0777408164', 'tnh2045@gmail.com', 'Trần Ngọc Huy ', '0777408164', 3000, NULL, 31, '2024-06-10 11:03:43.000000', 'Payment', 'QR VN PAY'),
(3, 'Đà Nẵng', NULL, 'VNQR0918207976', 'tn2222@gmail.com', 'Huy Trần', '0918207976', 5000, NULL, 19, '2024-06-10T12:17:07.292Z', 'payment', 'QR VNPay'),
(4, 'Đà Nẵng', NULL, 'VNQR0918207976', 'tn2222@gmail.com', 'Huy Trần', '0918207976', 9000, NULL, 19, '2024-06-10T12:17:07.292Z', 'payment', 'QR VNPay'),
(5, 'Đà Nẵng', NULL, 'VNQR0918207976', 'tn2222@gmail.com', 'Huy Trần', '0918207976', 3000, NULL, 19, '2024-06-10T12:30:48.692Z', 'payment', 'QR VNPay'),
(6, 'Đà Nẵng', NULL, 'VNQR0918207976', 'tn2222@gmail.com', 'Huy Trần', '0918207976', 3000, NULL, 19, '2024-06-10T12:30:48.692Z', 'payment', 'QR VNPay');

-- --------------------------------------------------------

--
-- Structure de la table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `order_detail`
--

INSERT INTO `order_detail` (`id`, `created_at`, `order_id`, `product_id`, `quantity`, `updated_at`) VALUES
(1, NULL, 1, 2, 1, NULL),
(3, NULL, 1, 4, 1, NULL),
(4, NULL, 3, 5, 1, NULL),
(5, NULL, 3, 4, 1, NULL),
(6, NULL, 3, 4, 1, NULL),
(7, NULL, 4, 7, 1, NULL),
(8, NULL, 4, 5, 1, NULL),
(9, NULL, 5, 2, 1, NULL),
(10, NULL, 6, 2, 1, NULL),
(11, NULL, 5, 4, 1, NULL),
(12, NULL, 6, 4, 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `order_detail_products`
--

CREATE TABLE `order_detail_products` (
  `order_detail_entity_id` bigint(20) NOT NULL,
  `products_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_token`
--

CREATE TABLE `personal_access_token` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `abilities` varchar(255) NOT NULL,
  `tokenable_id` varchar(255) NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_category` int(11) NOT NULL,
  `id_brand` int(11) NOT NULL,
  `id_user` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `image` varchar(191) NOT NULL,
  `web_id` varchar(191) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `sale` int(11) DEFAULT NULL,
  `condition` varchar(191) DEFAULT NULL,
  `detail` text NOT NULL,
  `company_profile` varchar(191) NOT NULL,
  `highlight` tinyint(4) DEFAULT 0,
  `active` tinyint(4) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `id_category`, `id_brand`, `id_user`, `name`, `image`, `web_id`, `price`, `status`, `sale`, `condition`, `detail`, `company_profile`, `highlight`, `active`, `created_at`, `updated_at`) VALUES
(2, 2, 5, '19', 'Love Corn', '[\"product-large-1.jpg\",\"product-large-2.jpg\",\"product-large-3.jpg\",\"product-large-4.jpg\",\"product-large-5.jpg\"]', '2', 1000, 0, NULL, '0', 'test', 'test', 0, 0, '2023-03-07 18:17:29', '2023-03-07 18:17:43'),
(4, 7, 3, '19', 'Avocado', '[\"thumb-avocado.png\",\"thumb-avocado.png\",\"thumb-avocado.png\",\"thumb-avocado.png\",\"thumb-avocado.png\"]', '1', 2000, 1, 30, '0', 'huy', '3', 0, 0, '2023-03-07 18:55:35', '2023-10-04 12:45:36'),
(5, 7, 3, '22', 'Bananas', '[\"thumb-bananas.png\",\"thumb-bananas.png\",\"thumb-bananas.png\",\"thumb-bananas.png\",\"thumb-bananas.png\"]', '2', 3000, 0, NULL, '1', 'Áo thun nam đen có họa tiết phối màu', 'LocalBrand', 0, 0, '2023-10-02 20:25:32', '2023-10-02 20:25:32'),
(7, 6, 3, '23', 'Biscuits', '[\"thumb-biscuits.png\",\"thumb-biscuits.png\",\"thumb-biscuits.png\",\"thumb-biscuits.png\",\"thumb-biscuits.png\"]', '3', 6000, 0, NULL, '1', 'Màu đen', 'LocalBrand', 0, 0, '2023-10-05 23:32:37', '2023-10-05 23:32:37'),
(8, 1, 4, '23', 'Cucumber', '[\"thumb-cucumber.png\",\"thumb-cucumber.png\",\"thumb-cucumber.png\",\"thumb-cucumber.png\",\"thumb-cucumber.png\"]', '1', 9000, 1, 20, NULL, 'Sandal Nữ', 'Local', 0, 0, '2023-10-06 02:16:49', '2023-10-06 02:16:49'),
(9, 1, 6, '23', 'Herb', '[\"thumb-herb.jpg\",\"thumb-herb.jpg\",\"thumb-herb.jpg\",\"thumb-herb.jpg\",\"thumb-herb.jpg\"]', NULL, 52200, 0, NULL, NULL, 'MỚI 100% FULLBOX BẢO HÀNH 12 THÁNG lỗi 1 đổi 1', 'Local', 0, 0, '2023-10-06 02:20:44', '2023-10-06 02:20:44'),
(10, 6, 3, '23', 'Honey', '[\"thumb-honey.jpg\",\"thumb-honey.jpg\",\"thumb-honey.jpg\",\"thumb-honey.jpg\",\"thumb-honey.jpg\"]', NULL, 54000, 0, NULL, NULL, 'FS LED Dây Cao Su Mặt Vuông Dành Cho Nam Và Nữ (Màu Sắc Tùy Chọn)', 'Local', 0, 0, '2023-10-06 02:24:34', '2023-10-06 02:24:34'),
(11, 2, 3, '23', 'Junk', '[\"thumb-junk.jpg\",\"thumb-junk.jpg\",\"thumb-junk.jpg\",\"thumb-junk.jpg\",\"thumb-junk.jpg\"]', NULL, 9000, 0, NULL, NULL, 'ấm áp ban đêm thích hợp làm quà tặng sinh nhật', '4', 0, 0, '2023-10-06 02:32:55', '2023-10-06 02:42:40'),
(12, 4, 4, '23', 'Milk', '[\"thumb-milk.png\",\"thumb-milk.png\",\"thumb-milk.png\",\"thumb-milk.png\",\"thumb-milk.png\"]', NULL, 67000, 1, 30, NULL, 'chất cotton khô 3158 in chữ AVENTEN phối bò phong cách Hàn Quốc CAMASTORE M928', '3', 0, 0, '2023-10-06 02:35:54', '2023-10-06 18:23:50'),
(13, 3, 3, '23', 'Orange Juice', '[\"thumb-orange-juice.png\",\"thumb-orange-juice.png\",\"thumb-orange-juice.png\",\"thumb-orange-juice.png\",\"thumb-orange-juice.png\"]', NULL, 3000, 1, NULL, '0', '100% detail', 'Local Brand', 0, 0, NULL, NULL),
(14, 7, 3, '19', 'Raspberries', '[\"thumb-raspberries.png\",\"thumb-raspberries.png\",\"thumb-raspberries.png\",\"thumb-raspberries.png\",\"thumb-raspberries.png\"]', NULL, 3000, 1, 10, '0', '100% Natural', 'Local', 0, 0, NULL, NULL),
(17, 1, 3, '19', 'Tomatoes', '[\"thumb-tomatoes.png\",\"thumb-tomatoes.png\",\"thumb-tomatoes.png\",\"thumb-tomatoes.png\",\"thumb-tomatoes.png\"]', NULL, 520, 1, NULL, '0', 'huy', 'Local', 0, 0, NULL, NULL),
(18, 5, 3, '19', 'Tuna', '[\"thumb-tuna.jpg\",\"thumb-tuna.jpg\",\"thumb-tuna.jpg\",\"thumb-tuna.jpg\",\"thumb-tuna.jpg\"]', NULL, 899, 0, 20, '0', '1436', 'test', 0, 0, NULL, NULL),
(19, 3, 3, '19', 'Orange Juice', '[\"thumb-orange-juice.png\",\"thumb-orange-juice.png\",\"thumb-orange-juice.png\",\"thumb-orange-juice.png\",\"thumb-orange-juice.png\"]', NULL, 520, 1, NULL, '0', 'h', 'test', 0, 0, NULL, NULL),
(20, 5, 3, '19', 'Tuna', '[\"thumb-tuna.jpg\",\"thumb-tuna.jpg\",\"thumb-tuna.jpg\",\"thumb-tuna.jpg\",\"thumb-tuna.jpg\"]', NULL, 899, 0, 20, '0', '1436', 'test', 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `products_api`
--

CREATE TABLE `products_api` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `availability` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rate`
--

CREATE TABLE `rate` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `rate`
--

INSERT INTO `rate` (`id`, `user_id`, `blog_id`, `rate`, `created_at`, `updated_at`) VALUES
(1, 3, 4, 4, '2020-01-17 19:33:22', '2020-01-17 19:33:22'),
(2, 3, 4, 5, '2023-03-07 19:10:03', '2023-03-07 19:10:03'),
(3, 4, 4, 2, '2023-09-17 19:08:54', '2023-09-17 19:08:54'),
(4, 31, 4, 4, '2023-10-09 22:12:51', '2023-10-09 22:12:51'),
(5, 31, 5, 4, '2023-10-09 22:13:09', '2023-10-09 22:13:09');

-- --------------------------------------------------------

--
-- Structure de la table `rate_product`
--

CREATE TABLE `rate_product` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `review_product`
--

CREATE TABLE `review_product` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name_user` varchar(191) NOT NULL,
  `avatar_user` varchar(191) NOT NULL,
  `id_sub` int(11) DEFAULT NULL,
  `review` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `testapi`
--

CREATE TABLE `testapi` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `availability` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `country` varchar(250) DEFAULT NULL,
  `avatar` varchar(191) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `level` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1:admin 0:member',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `phone`, `address`, `country`, `avatar`, `remember_token`, `level`, `created_at`, `updated_at`) VALUES
(19, 'Huy Trần', 'tn2222@gmail.com', NULL, '452002', '0918207976', 'Đà Nẵng', 'Việt Nam', 'reviewer-1.jpg', NULL, 2, '2023-09-30 02:07:41', '2023-10-06 18:23:18'),
(23, 'Trần Ngọc Huy', 'tnh4522@gmail.com', NULL, '452002', '0777408164', 'Danang', 'Vietnam', 'reviewer-1.jpg', NULL, 0, '2023-10-02 21:06:52', '2023-10-03 11:10:24'),
(31, 'Trần Ngọc Huy ', 'tnh2045@gmail.com', NULL, '452002', '0777408164', 'Hòa Sơn, Hòa Vang, Đà Nẵng', 'Việt Nam', 'avatar.jpg', NULL, 1, '2023-10-06 20:10:08', '2023-10-09 22:12:10'),
(41, 'Huy Trần', 'tnh2057@gmail.com', NULL, '452002', '0777408164', 'Danang', 'Vietnam', 'reviewer-3.jpg', NULL, 1, '2023-10-31 05:05:43', '2023-10-31 05:05:44'),
(43, 'Trần Ngọc Huy ', 'tnh4545@gmail.com', NULL, '452002', '0918207976', 'Hoa Son, Hoa Vang, Da Nang', NULL, 'reviewer-2.jpg', NULL, 0, NULL, NULL),
(44, 'Tran Ngoc Huy', 'huy.tran@gmail.com', NULL, 'Ngochuy4522', '0777408164', 'Da Nang', NULL, 'reviewer-1.jpg', NULL, 0, NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Index pour la table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Index pour la table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_personal_access_clients_client_id_index` (`client_id`);

--
-- Index pour la table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Index pour la table `one_page`
--
ALTER TABLE `one_page`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `order_detail_products`
--
ALTER TABLE `order_detail_products`
  ADD UNIQUE KEY `UK_a2d2f248frxrjxi17r1st002m` (`products_id`),
  ADD KEY `FKjhj4oe0ymt69d4wk7s1k5gout` (`order_detail_entity_id`);

--
-- Index pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Index pour la table `personal_access_token`
--
ALTER TABLE `personal_access_token`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `products_api`
--
ALTER TABLE `products_api`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rate_product`
--
ALTER TABLE `rate_product`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `review_product`
--
ALTER TABLE `review_product`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `testapi`
--
ALTER TABLE `testapi`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `country`
--
ALTER TABLE `country`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT pour la table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `one_page`
--
ALTER TABLE `one_page`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `personal_access_token`
--
ALTER TABLE `personal_access_token`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `products_api`
--
ALTER TABLE `products_api`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `rate`
--
ALTER TABLE `rate`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `rate_product`
--
ALTER TABLE `rate_product`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `review_product`
--
ALTER TABLE `review_product`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `testapi`
--
ALTER TABLE `testapi`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `order_detail_products`
--
ALTER TABLE `order_detail_products`
  ADD CONSTRAINT `FKjhj4oe0ymt69d4wk7s1k5gout` FOREIGN KEY (`order_detail_entity_id`) REFERENCES `order_detail` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
