-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2024 at 01:48 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `usermanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(10) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'employee',
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `role`, `username`, `email`, `password`, `profile`) VALUES
(1, 'admin', 'mrudani_songade', 'mrudanisongade@gmail.com', 'Admin@123', 'faceoff.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `company_employee`
--

CREATE TABLE `company_employee` (
  `id` int(10) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'employee',
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company_employee`
--

INSERT INTO `company_employee` (`id`, `role`, `username`, `email`, `password`, `profile`) VALUES
(1, 'employee', 'emp_1', 'emp_1@gmail.com', 'Emp_1@123', 'cats.jpg'),
(2, 'employee', 'Emp_2', 'emp_2@gmail.com', 'Emp_2@123', NULL),
(3, 'employee', 'Emp_3', 'emp_3@gmail.com', 'Emp_3@comp', NULL),
(4, 'employee', 'Emp_4', 'emp_4@gmail.com', 'Emp_4@1123', NULL),
(8, 'employee', 'Emp_5', 'emp_5@gmail.com', 'Emp_5@123', NULL),
(9, 'employee', 'Emp_6', 'emp_6@gmail.com', 'Emp_6@comp', NULL),
(10, 'employee', 'Emp_10', 'xyz@gmail.com', 'Emp_10@comp', NULL),
(11, 'employee', 'Emp_11', 'xyz@gmail.com', 'Emp_2@comp', NULL),
(14, 'employee', 'Emp_3', 'nc23@gmail.com', 'Admin@123', NULL),
(15, 'employee', 'Emp_3', 'xyz@gmail.com', 'dtujd@J3', NULL),
(16, 'employee', 'Emp_20', 'emp20@gmail.com', 'Emp_20@123', 'bears.jpg'),
(17, 'employee', 'Emp_21', 'emp21@gmail.com', 'Emp_21@345', 'slap.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `company_hr`
--

CREATE TABLE `company_hr` (
  `id` int(100) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'hr',
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company_hr`
--

INSERT INTO `company_hr` (`id`, `role`, `username`, `email`, `password`, `profile`) VALUES
(1, 'hr', 'hr1_company', 'hr.company@gmail.com', 'Hr_company@123', 'gg2.jpg'),
(2, 'hr', 'hr_2', 'hr.2comp@gmail.com', 'Hr_2@123', 'mushroom.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` int(100) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobno` varchar(10) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `hobbies` varchar(100) NOT NULL,
  `country` varchar(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `status` varchar(8) NOT NULL DEFAULT 'Inactive',
  `role` varchar(20) NOT NULL DEFAULT 'User',
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `fname`, `lname`, `email`, `mobno`, `gender`, `hobbies`, `country`, `address`, `status`, `role`, `password`) VALUES
(1, 'mrudani', 'songade', 'mrudanisongade@gmail.com', '9173837900', 'Female', 'Racing,Dancing,Painting,Sketching', 'Germany', 'hjkiygbnkkgvvhj', 'Active', 'admin', 'Admin@123'),
(2, 'tyuu', 'cxgf', 'jjj@gmail.com', '5568545698', 'Male', 'Dancing,Painting', 'Germany', 'fgsdfhsfghdg', 'Inactive', 'User', 'Admin@123'),
(3, 'jeel', 'patel', 'jp2304@gmail.com', '5897641236', 'Female', 'Racing,Painting,Sketching', 'Mexico', 'gdsfhsdfhsdfh', 'Inactive', 'User', 'sfdg@45O'),
(4, 'nupoor', 'chauhan', 'nc23@gmail.com', '8944521265', 'Female', 'Painting,Sketching', 'Cuba', 'jghjhvnvnvm', 'Inactive', 'user', 'Admin@123'),
(5, 'Amisha', 'chauhan', 'ach@gmail.com', '2147483647', 'Female', 'Sketching', 'Vietnam', 'fgdsghdsghfgjhdfgj', 'Active', 'User', ''),
(6, 'Mark', 'Zukerburg', 'markkyy@gmail.com', '1254639878', 'Male', 'Racing,Pottery', 'Germany', 'ghjghjdfhjbvnv ', 'Inactive', 'User', ''),
(7, 'klp', 'jki', 'iop23@hfjl.com', '2147483647', 'Male', 'Dancing,Painting', 'Germany', 'sfgsdfghsdfh', 'Active', 'User', ''),
(8, 'yuii', 'kiii', 'yk@gmail.cim', '2147483647', 'Female', 'Dancing', 'Vietnam', 'hngjgkjgb', 'Inactive', 'User', ''),
(9, 'popo', 'eer', 'poer@gmail.com', '2147483647', 'Male', 'Racing', 'Switzerland', 'egdfhggfhdgh', 'Active', 'User', ''),
(15, 'chrer', 'chrer', 'xcgvsdf@hgfjh.jhk', '2147483647', 'Female', 'Painting,Sketching', 'Germany', 'ftgrtfhdfbxcvbxcbxcvbxcvbxc', 'Inactive', 'User', ''),
(16, 'sioo', 'rtert', 'asdfa@gmail.com', '2147483647', 'Female', 'Dancing,Painting', 'Switzerland', 'rgyerthdfhdfgh', 'Inactive', 'User', '123456'),
(18, 'fdgdfg', 'fdgsdfg', 'sdfasd@gmsh.fhg', '6541884525', 'Male', 'Racing,Painting', 'Germany', 'asdfasdf', 'Active', 'User', 'asdgfsadg'),
(19, 'daisy', 'woopsy', 'dwoop@gmail.com', '6974512421', 'Female', 'Dancing,Sketching', 'Germany', 'asdfgsgdsfg', 'Active', 'user', 'i23oo@fPvbb'),
(22, 'xyz', 'xyz', 'xyz@gmail.com', '8974564112', 'Male', 'Racing,Dancing,Painting', 'Germany', 'hsdfghsdfhsfdh', 'Inactive', 'user', 'sfdg@45O'),
(23, 'test', 'test', 'xyz12@gmail.com', '9856746223', 'Male', 'Racing,Dancing', 'Germany', 'dfgsdfghsdfh', 'Inactive', 'user', 'dtujd@J3'),
(24, 'fdg', 'dgfg', 'fdgf@dfssd.com', '4534534543', 'Male', 'Dancing', 'Switzerland', 'fgdfg', 'Inactive', 'user', 'Admin@123');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `f_name` varchar(20) NOT NULL,
  `l_name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `mobno` varchar(10) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `hobbies` varchar(100) NOT NULL,
  `country` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `status` varchar(8) NOT NULL DEFAULT 'Inactive',
  `photofile` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `f_name`, `l_name`, `email`, `mobno`, `gender`, `hobbies`, `country`, `address`, `status`, `photofile`) VALUES
(2, 'Mrudani', 'Songade', 'mrudanisongade@gmail.com', '9173837900', 'female', 'writing', 'India', '135/2 Anywhere World!', 'Inactive', ''),
(6, 'Shaliee', 'Bhradvaj', 'sbj@gmail.com', '9876894579', 'female', 'writing,speaking', 'Canada', 'paldiiiol', 'Active', ''),
(58, 'nupoor', 'chauhan', 'nc23@gmail.com', '4566282656', 'female', 'reading,writing', 'India', 'hathijan', 'Active', ''),
(83, 'ffgytfdy', 'uiui', 'jjj@gmail.com', '5645656456', 'female', 'writing,speaking', 'America', 'fdgfdgsdfg', 'Inactive', ''),
(84, 'xyz', 'xyz', 'xyz@gmail.com', '2343253465', 'female', 'reading,writing', 'Canada', 'gdhfghghdfg', 'Inactive', ''),
(87, 'walter', 'doe', 'wdoe@gmail.com', '1696528623', 'male', 'reading,writing', 'America', 'This is waler doe residence\r\n', 'Active', ''),
(88, 'jkl', 'jkjl', 'hkjk@gmail.com', '1596552565', 'female', 'writing', 'India', 'dfgsdfrgsdf', 'Inactive', ''),
(89, 'kl', 'ghh', 'fg@gmail.com', '2342356789', 'male', 'reading', 'Canada', 'dghdfgdfgh', 'Inactive', ''),
(90, 'nex', 'aldoi', 'adafg@gmail.com', '1458452232', 'male', 'reading,writing', 'America', 'gsdfghsfhsghsf', 'Inactive', ''),
(91, 'create', 'user', 'cuser@gmail.com', '5546443133', 'male', 'reading,writing', 'Canada', 'asdfasdfgafg', 'Inactive', ''),
(92, 'user', 'xyv', 'uxy@gmail.com', '4556969745', 'male', 'reading,writing', 'Canada', 'user updatesin sdhgsgh', 'Inactive', ''),
(93, 'ioopp', 'ppoi', 'pioo@gmail.com', '4156544525', 'male', 'reading,writing', 'Canada', 'this is in canada near america', 'Inactive', ''),
(94, 'amisha', 'chauhan', 'ach@gmail.com', '9856752232', 'female', 'writing,speaking', 'America', 'fgsfdsghfh', 'Inactive', ''),
(95, 'test', 'test', 'tsete@gmil.com', '4655422525', 'male', 'writing,speaking', 'India', 'dasgsdfgsdfh', 'Inactive', ''),
(96, 'useri', 'test', 'tesst@gmail.com', '8556155220', 'female', 'reading,writing', 'America', 'asdfsadgsadfg', 'Inactive', ''),
(97, 'yii', 'hkjhh', 'yuyt@gmail.com', '4569742246', 'Male', 'reading', 'India', 'gjgjhghjggjvnnv ', 'Inactive', 'xyz.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_employee`
--
ALTER TABLE `company_employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_hr`
--
ALTER TABLE `company_hr`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `company_employee`
--
ALTER TABLE `company_employee`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `company_hr`
--
ALTER TABLE `company_hr`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
