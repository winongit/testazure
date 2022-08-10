# AuctionFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Modules 
- User
    - components
    - services
    - user.module.ts => lazy route
    - user.routing.module.ts
- Auction
    - components
    - services
    - auction.module.ts
    - auction.routing.module.ts
- Bidding
    - components
    - services
    - bidding.module.ts
    - bidding.routing.module.ts
- Shared 
    - models
    - components
    - pipe 
        - custom pipe
    - shared.module.ts
    
- Core 
    - components
        - header 
        - footer
    - gurards
    - interceptors
    - services
    - authentication

    - core.module.ts

- Document Model
    - User
        - _id
        - name
        - email
        - password
        - created_at
    
    - Auction
        - _id
        - title
        - description
        - d
        - category
        - price
        - end_time
        - created_at
        - created_by
            - _id
            - name
            - email
        - modified_at
        - modified_by
            - _id
            - name
            - email
        - status - Pending, Active, Finish, Canceled
        - expired_at
    
    - Bid
        - _id
        - bid_price
        - created_at
        - created_by
            - _id
            - name
            - email
        - auction

    - Auction Results
        - _id
        - auction
        - winner 
        - created_at
        - created_by


- Angular Routings
    /user       - user module
    /auction    - auction module
    /bidding    - bidding module
    /core       - not lazy laoding module
    


UI Design
------
Auction

Left Side
- Auction


- Middle Side
    Bidding
    


# testazure
