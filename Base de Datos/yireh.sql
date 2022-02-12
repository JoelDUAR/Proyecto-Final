-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-02-2022 a las 01:42:35
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `yireh`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concepto`
--

CREATE TABLE `concepto` (
  `id_concepto` int(11) NOT NULL,
  `concepto` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `concepto`
--

INSERT INTO `concepto` (`id_concepto`, `concepto`) VALUES
(1, 'Ingreso Mensual'),
(2, 'Ingreso  semanal'),
(3, 'Ingreso diario'),
(4, 'Comida'),
(5, 'Combustible'),
(6, 'Games'),
(7, 'Lectura'),
(8, 'Tecnología'),
(9, 'Alquiler'),
(10, 'Impuestos'),
(11, 'Servicios'),
(12, 'Tarjetas de Credito'),
(13, 'Prestamo'),
(14, 'Rodados'),
(15, 'Seguro'),
(16, 'Transporte'),
(17, 'Matrícula'),
(18, 'Aportes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresos`
--

CREATE TABLE `egresos` (
  `id_egreso` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `descripcion` varchar(60) NOT NULL,
  `id_concepto` int(11) DEFAULT NULL,
  `monto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `egresos`
--

INSERT INTO `egresos` (`id_egreso`, `fecha`, `descripcion`, `id_concepto`, `monto`) VALUES
(1, '2022-01-04', 'Pago de servicios', 11, -18000),
(2, '2022-01-04', 'Pago de Impuestos', 10, -12000),
(3, '2022-01-04', 'Pago de Tarjetas', 12, -10000),
(4, '2022-01-05', 'Pago de Matrícula', 17, -10000),
(5, '2022-01-06', 'Pago de Aportes', 18, -10000),
(6, '2022-01-07', 'Supermercado', 4, -14000),
(7, '2022-01-08', 'Combustible', 5, -4300),
(8, '2022-01-18', 'Combustible', 5, -4300),
(9, '2022-01-25', 'Seguro', 15, -4300),
(10, '2022-02-02', 'Pago de servicios', 11, -18000),
(11, '2022-02-02', 'Pago de Impuestos', 10, -14000),
(12, '2022-02-02', 'Pago de Tarjetas', 12, -10000),
(13, '2022-02-03', 'Pago de Matrícula', 17, -10000),
(14, '2022-02-04', 'Pago de Aportes', 18, -10000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos`
--

CREATE TABLE `ingresos` (
  `id_ingreso` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `descripcion` varchar(60) NOT NULL,
  `id_concepto` int(11) DEFAULT NULL,
  `monto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ingresos`
--

INSERT INTO `ingresos` (`id_ingreso`, `fecha`, `descripcion`, `id_concepto`, `monto`) VALUES
(4, '2022-02-01', 'Acreditacion de Haberes', 1, 100500),
(19, '2022-01-12', 'Ingreso Enero', 1, 150000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `usuario` varchar(15) DEFAULT NULL,
  `contrasenia` varchar(60) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `edad`, `usuario`, `contrasenia`, `image`) VALUES
(11, 'Joel Ruben', 'Dupraz Ardiles', 30, 'Joeldupraz', '12345', 'hym2kdjlhcmyqfhebc7l');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `concepto`
--
ALTER TABLE `concepto`
  ADD PRIMARY KEY (`id_concepto`);

--
-- Indices de la tabla `egresos`
--
ALTER TABLE `egresos`
  ADD PRIMARY KEY (`id_egreso`);

--
-- Indices de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD PRIMARY KEY (`id_ingreso`),
  ADD KEY `FK_Ingreso_Concepto` (`id_concepto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `concepto`
--
ALTER TABLE `concepto`
  MODIFY `id_concepto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `egresos`
--
ALTER TABLE `egresos`
  MODIFY `id_egreso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  MODIFY `id_ingreso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `egresos`
--
ALTER TABLE `egresos`
  ADD CONSTRAINT `FK_Egresos_Concepto` FOREIGN KEY (`id_egreso`) REFERENCES `concepto` (`id_concepto`);

--
-- Filtros para la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD CONSTRAINT `FK_Ingreso_Concepto` FOREIGN KEY (`id_concepto`) REFERENCES `concepto` (`id_concepto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
