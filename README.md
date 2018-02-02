Single Page Product management (CRUD operations) dashboard using React & Redux.

Dependancies:

Node (v7.6.0) 
MongoDB (v3.4.4)
yarn (v0.23.4)

How to run: (MongoDB needs to be running)

yarn install
yarn start(developement mode)
yarn bs(production mode)

Features:

1.Create a single page React (with redux) app for Product management (CRUD operations) dashboard.
	1.Login Screen
	2.Form to add a new product (name, code, quantity, expiry date).
	3.Display the list in a table.
	4.Inline edit of each product item.
	5.Color the quantity cell with 
		1.red color when the amount is less than 10
		2.orange if less than 30
		3.in all other cases green.
2.Create a Node JS server exposing the APIs for the dashboard.
3.All the APIs should be authenticated. A login API should return auth token up on success which should be used to authenticate all the APIs
4.Use MongoDB to store the products
