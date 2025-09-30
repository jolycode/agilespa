-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Сен 30 2025 г., 19:55
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `freelance_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `freelancers`
--

CREATE TABLE `freelancers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `avatar` text DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `about` text DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `freelancers`
--

INSERT INTO `freelancers` (`id`, `name`, `city`, `age`, `avatar`, `email`, `phone`, `about`, `rating`, `created_at`) VALUES
(1, 'Anna Petrova', 'Kyiv', 28, 'https://i.pinimg.com/736x/65/21/08/6521082d186b9accd916445f2565097b.jpg', 'anna.petrova@email.com', '+380 67 123 45 67', 'Experienced frontend developer with 5 years in building modern web applications. Passionate about creating beautiful and intuitive user interfaces.', 4.8, '2025-09-30 16:39:37'),
(2, 'Dmitry Ivanov', 'Kharkiv', 32, 'https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg', 'dmitry.ivanov@email.com', '+380 93 456 78 90', 'Backend specialist focused on scalable architecture and database optimization. Strong experience with microservices.', 4.9, '2025-09-30 16:39:37'),
(3, 'Elena Smirnova', 'Mykolaiv', 26, 'https://i.pinimg.com/736x/68/c7/07/68c707ec3630f06d4765d6747921de45.jpg', 'elena.smirnova@email.com', '+380 50 987 65 43', 'Full-stack developer with ML expertise. Love solving complex problems with elegant solutions.', 4.7, '2025-09-30 16:39:37'),
(4, 'Alexey Volkov', 'Kherson', 30, 'https://i.pinimg.com/736x/7e/46/c6/7e46c6d2798eff446b365c5246f4c9ca.jpg', 'alexey.volkov@email.com', '+380 96 112 23 34', 'Creative frontend developer specializing in Vue ecosystem. Building responsive and performant web apps.', 4.6, '2025-09-30 16:39:37'),
(5, 'Maria Sokolova', 'Kropyvnytskyi', 29, 'https://i.pinimg.com/736x/7c/64/af/7c64afa557cf85d000cfd2d97513c30e.jpg', 'maria.sokolova@email.com', '+380 99 445 66 77', 'Mobile development expert with cross-platform expertise. Published 15+ apps on both stores.', 5.0, '2025-09-30 16:39:37'),
(6, 'Sergey Kuznetsov', 'Chernihiv', 35, 'https://i.pinimg.com/1200x/f3/d6/35/f3d63548db2633e513e312cb33c41239.jpg', 'sergey.kuznetsov@email.com', '+380 32 567 89 01', 'Cloud architect and API specialist. Helping startups scale their infrastructure efficiently.', 4.8, '2025-09-30 16:39:37');

-- --------------------------------------------------------

--
-- Структура таблицы `freelancer_skills`
--

CREATE TABLE `freelancer_skills` (
  `id` int(11) NOT NULL,
  `freelancer_id` int(11) NOT NULL,
  `skill` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `freelancer_skills`
--

INSERT INTO `freelancer_skills` (`id`, `freelancer_id`, `skill`) VALUES
(1, 1, 'React'),
(2, 1, 'TypeScript'),
(3, 1, 'UI/UX Design'),
(4, 2, 'Node.js'),
(5, 2, 'PostgreSQL'),
(6, 2, 'Docker'),
(7, 3, 'Python'),
(8, 3, 'Django'),
(9, 3, 'Machine Learning'),
(10, 4, 'Vue.js'),
(11, 4, 'Nuxt'),
(12, 4, 'TailwindCSS'),
(13, 5, 'React Native'),
(14, 5, 'iOS'),
(15, 5, 'Android'),
(16, 6, 'GraphQL'),
(17, 6, 'Apollo'),
(18, 6, 'AWS'),
(19, 4, 'React'),
(20, 2, 'React'),
(21, 3, 'React'),
(22, 5, 'React'),
(23, 6, 'React');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `freelancers`
--
ALTER TABLE `freelancers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_freelancer_email` (`email`);

--
-- Индексы таблицы `freelancer_skills`
--
ALTER TABLE `freelancer_skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_skill_freelancer_id` (`freelancer_id`),
  ADD KEY `idx_skill_name` (`skill`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `freelancers`
--
ALTER TABLE `freelancers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `freelancer_skills`
--
ALTER TABLE `freelancer_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `freelancer_skills`
--
ALTER TABLE `freelancer_skills`
  ADD CONSTRAINT `freelancer_skills_ibfk_1` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
