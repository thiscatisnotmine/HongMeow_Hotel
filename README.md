# HongMeow Hotel 

A simple hotel room booking management system for customers to check room availability, make reservations, and manage their bookings.  
This project is developed as part of a learning project in database CS251.

## Features

* **Admin Panel**:
    * Manage receptionist information.
    * Handles room reservations for customers.
    * Control customer and room data.
* **Receptionist Panel**:
    * Handle customers check-ins and check-outs.
    * View and update room availability.
    * Handles room reservations for customers.
    * Manage customers information.

## Database Structure
* **Employee**: Stores admin and receptionist information.
* **Customer**: Contains customers information.
* **Urgent**: Contains customer emergency contact information.
* **Pet**: Stores information about the customer's pets.
* **Booking**: Records customers’ reservation data.
* **Payment**: Keeps track of customer payments.
* **BookedRoom**: Stores data about each pet’s stay, including the room assigned, room status, and linked customer transactions.
* **Room**: Contains room IDs and tracks room availability (Available / Out-of-Order).
* **RoomType**: Includes 12 types of rooms, with details provided for each.

## Software & Technologies
* **DBMS**: MySQL 
* **Back-end**: Java, Node 
* **Front-end**: HTML, JavaScript, CSS 
* **Environment**: Docker 
* **Version controls**: GitHub 
* **Text Editor**: VScode 
* **Design**: Figma 
* **Project Management**: Discord 

## How to Run  & Contribute as a Developer
1. Clone the repository:
   ```bash
   git clone https://github.com/thiscatisnotmine/HongMeow_Hotel.git
   cd hongmeow-hotel
   ```
   
2. Create your own branch:
    > Developers should create a separate branch for their work to keep development clean and organized.
    ```bash
    git checkout -b develop/your-name
    ```
    
3. Make changes and commit:
    ```bash
    git add .
    git commit -m "Add: Description of your change"
    ```
    
4. Push to remote branch:
    ```bash
    git push origin develop/your-name
    ```
    

## How to install this web application

## Author
Develop by Group11

