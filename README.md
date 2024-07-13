### Cycle Control Hub Backend

### Project Objective
This is a Cycle Controller Hub project that I am using TypeScript, Express.js and Object Data Modeling (ODM) and Validation Library Mongoose for MongoDB.

- [x] Project Setup:
  - [x] Create a Node.js Express project.
  - [x] Use TypeScript for development.
- [x] Database Integration:
  - [x] Set up MongoDB with Mongoose.
- [x] Data Models:
  - [x] Define Mongoose models for User, bikeManagement, buyerManagement, bikeServiceCategory, coupon, and bikeService data.
  - [x] Implement data types and validations based on the provided structure.
  - [x] Implement user authentication, authorization, and user-related information.
- [x] Validation:
  - [x] Use Zod for enforcing data validation rules.
- [x] Error Handling:
  - [x] Handling Zod errors.
  - [x] Handling Cast error.
  - [x] Handle better way to error for using AppError.
  - [x] Handling mongoose error and duplicate error.

### Project Features
- [x] Auth/User Management:
  - [x] User Registration or Create a User
  - [x] Login a User
  - [x] Retrieve all users

- [x] Admin can
  - [x] Bike Management Functionality:
    - [x] Add new bike
    - [x] View all seals bike
    - [x] Delete, update the bike
    - [x] View sales history categorized by:
      - [x] Weekly
      - [x] Daily
      - [x] Monthly
      - [x] Yearly
  - [x] User Management Functionality:
    - [x] Change users role and delete users
  - [x] Coupon Management Functionality:
    - [x] Create coupon for offering price in service
    - [x] Coupon Management (update, and delete coupon)
  - [x] Service Management Functionality:
    - [x] Create Service Category for bike servicing
    - [x] In service category assign coupon, delete coupon and delete service category
    - [x] All service management(confirm and denied service) for bike servicing

- [x] Seller can
  - [x] Seals Management Functionality where seller can sell bikes
  - [x] Bike Management Functionality:
    - [x] Add new bike
    - [x] View all my bike and manage bike(Delete, update the bike)
    - [x] Bulk delete bikes where seller can delete his bike
    - [x] View sales history categorized by:
      - [x] Weekly
      - [x] Daily
      - [x] Monthly
      - [x] Yearly
  - [x] Maintenance and Servicing Management Functionality:
    - [x] Services Management (where seller can confirm or denied a service)
    - [x] View all his all bikes services history

- [x] Buyer can
  - [x] View available bikes where buyer can buy and search bikes
  - [x] Sales Management Functionality:
    - [x] Confirmed purchased bike where buyer can confirm or cancel purse bike
    - [x] Purchase history where buyer show his confirmed purchased bikes history
  - [x] Maintenance and Servicing Management Functionality:
     - [x] Request For Maintenance where buyer can request for maintenance bikes
    - [x] Service Management where buyer can update, pay, delete service and add coupon for get offer price service
    - [x] Service History where buyer can view his all services history
 
### Getting Started

#### Setup

1. Clone the repo

2. Run the development server:

```bash
npm run start:dev
```


#### Hosting site Link: https://cycle-control-hub-server.vercel.app/