


create database APIFinal

create table Admin(
	AdminId int identity(1,1) primary key,
	UserName varchar(50),
	Password varchar(100),
	Email varchar(50),
)

create table Customer(
	UserId int identity(1,1) primary key,
	Name nvarchar(50),
	Email varchar(50),
	PhoneNumber varchar(50),
	City nvarchar(50),
	Province nvarchar(50),
	AddressDetail nvarchar(50),
	Active int default(1),
)

create table Product(
	ProductId int identity(1,1) primary key,
	Name nvarchar(50),
	Price float,
	Quantity tinyint,
	Description nvarchar(50),
)