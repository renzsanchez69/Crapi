-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2019 at 06:01 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `contact_no` varchar(20) NOT NULL,
  `email_address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `fullname`, `password`, `firstname`, `middlename`, `lastname`, `address`, `contact_no`, `email_address`) VALUES
(1, 'Anuar Delabahan 2', '', 'Wang1', 'Dels', 'Wangz', 'Mandaue City Cebu', '09123456789', 'wadel1s@gmail.com'),
(3, 'Anuar Delabahan 3', '', 'Wang2', 'Dels', 'Wangz', 'Mandaue City Cebu', '09123456789', 'wadel2s@gmail.com'),
(4, 'Anuar Delabahan 4', '', 'Wang3', 'Dels', 'Wangz', 'Mandaue City Cebu', '09123456789', 'wadel3s@gmail.com'),
(5, 'Anuar Delabahan 5', '', 'Wang4', 'Dels', 'Wangz', 'Mandaue City Cebu', '09123456789', 'wadel4s@gmail.com'),
(6, 'Anuar Delabahan 6', '', 'Wang5', 'Dels', 'Wangz', 'Mandaue City Cebu', '09123456789', 'wadel5s@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `food_name` varchar(50) DEFAULT NULL,
  `description` text,
  `price` int(20) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `food_name`, `description`, `price`, `created_date`) VALUES
(22, 'Potchero', 'test', 200, '2019-04-06 04:26:41'),
(23, 'Adobo Baboy', 'Testing Description', 300, '2019-04-06 04:26:34');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_hash` text NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_hash`, `product_id`, `customer_id`, `created_date`) VALUES
(1, 'fsdfsdfsdf', 1, 1, '2019-04-03 14:38:44'),
(2, 'xcvxgsdgdfg', 2, 2, '2019-04-01 07:58:23'),
(3, 'xcvxcfg', 3, 3, '2019-04-01 07:58:20'),
(4, 'assdfxxxv', 4, 4, '2019-04-01 07:58:19'),
(5, 'werwet', 5, 5, '2019-04-01 07:58:14');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `food_name` varchar(50) NOT NULL,
  `qty` int(15) NOT NULL,
  `price` tinyint(4) NOT NULL,
  `description` text,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `food_name`, `qty`, `price`, `description`, `created_date`) VALUES
(1, 'Adobo', 60, 50, 'Adobong Baboy', '2019-04-02 15:39:20'),
(2, 'Afpritada', 70, 80, 'Adobong Baboy', '2019-04-02 15:39:29'),
(3, 'Snugba', 900, 100, 'Adobong Baboy', '2019-04-02 15:39:35'),
(4, 'Adobo Baki', 50, 90, NULL, '2019-04-03 14:38:01'),
(5, 'Adobo Isda', 50, 100, NULL, '2019-04-03 14:38:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_name` (`product_id`,`customer_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
