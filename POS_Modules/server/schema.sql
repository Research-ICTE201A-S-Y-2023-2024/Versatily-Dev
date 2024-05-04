CREATE DATABASE pointofsaleDB;

CREATE TABLE IF EXISTS `workbench` (
    `id` INTEGER auto_increment,
    `workbenchID` VARCHAR(255) NOT NULL,
    `status` TINYINT(1),
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `product` (
    `id` INTEGER auto_increment , 
    `image` VARCHAR(255) NOT NULL, 
    `url` VARCHAR(255) NOT NULL, 
    `name` VARCHAR(255) NOT NULL, 
    `category` VARCHAR(255) NOT NULL, 
    `price` INTEGER NOT NULL, 
    `quantity` INTEGER NOT NULL, 
    `outOfStock` TINYINT(1), 
    `description` VARCHAR(255) NOT NULL, 
    `createdDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL, 
    PRIMARY KEY (`id`)
)