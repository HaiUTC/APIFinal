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
	Status bit default(1) 
)

create table Orders(
	OrderId int identity(1,1) primary key,
	Name nvarchar(50),
	Price float,
	UserId int FOREIGN KEY REFERENCES Customer(UserId),
	Fulfillment_Status nvarchar(50) null, 'success', 'pending', 'reject'
	Financial_Status nvarchar(50) default 'pending', 'paid'
	Cancel_Reason nvarchar(250),
	Address nvarchar(200),
	ShipCode nvarchar(50),
)

create table OrderItem(
	OrderItemId int identity(1,1) primary key,
	OrderId int FOREIGN KEY REFERENCES Orders(OrderId),
	ProductId int FOREIGN KEY REFERENCES Product(ProductId),
	Quantity int,
)

create table Transactions(
	TransactionId int identity(1,1) primary key,
	isCapture bit default(0),
	Account_Number nvarchar(50),
	Amount float,
	OrderId int FOREIGN KEY REFERENCES Orders(OrderId),
)


create trigger addOrderItem
on OrderItem
after insert as
	begin
		update Product set Quantity = Product.Quantity - (
			select Quantity from inserted where inserted.ProductId = ProductId 
		) from Product inner join inserted on Product.ProductId = inserted.ProductId
	end

create trigger updateTransaction on Transactions after update as
begin
	update Orders set Fulfillment_Status = 'fulfilled', Financial_Status = 'paid' from Orders inner join inserted on Orders.OrderId = inserted.OrderId
	and inserted.isCapture = 1
end

create trigger updateOrderTransaction on Orders after update as
begin
	update Transactions set isCapture = 1 from Transactions inner join inserted on inserted.OrderId = Transactions.OrderId
	and inserted.Fulfillment_Status like 'fulfilled'
end


create view OrderRender as
select o.OrderId, o.Name as OrderName, o.Cancel_Reason,o.Financial_Status, o.Fulfillment_Status, o.Price, o.UserId, c.Name as UserName, c.PhoneNumber,c.AddressDetail, c.City, c.Province
from Orders o inner join Customer c
on o.UserId = c.UserId

create procedure GetInfoOfOrder @OrderId nvarchar(30) as
select ot.OrderItemId, ot.ProductId, ot.Quantity, p.Name, p.Price
from OrderItem ot inner join Product p
on ot.ProductId = p.ProductId and ot.OrderId = @OrderId

