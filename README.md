<div align="center">

<img src="./img/quicksearch-logo.png" alt="QuickSearch logo" width="500" />

# QuickSearch Billing Management System

**A full-stack billing system I designed and built solo for Quickcon Internet Installation Services.**

![C++](https://img.shields.io/badge/C%2B%2B-00599C?logo=cplusplus&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?logo=mariadb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

</div>

---

## At a Glance

| | |
|---|---|
| **Role** | Sole developer: backend, database, frontend, and deployment |
| **Duration** | 3 months |
| **Used by** | Quickcon staff, for daily bill payment processing |
| **Stack** | C++ (custom backend), MariaDB, vanilla HTML/CSS/JavaScript |

## The Problem

Quickcon billed 1,400 internet subscribers using Google spreadsheets. with only 3 staffs Looking up a customer, confirming who had paid, and producing a bill thru microsoft word was slow and easy to get wrong.

## What I Built

A web app that puts the whole billing cycle in one place. Staff can find a customer, record a payment, review their payment history, and print a bill generated automatically from the customer's record. Bills stay editable, so staff can make adjustments when a case needs it.

- **Instant customer search** across hundreds of records
- **Payment tracking** with `paid`, `pending`, and `overdue` statuses
- **Payment history** for every customer account
- **Automatic bill generation and printing** from stored customer data
- **Staff login** with hashed passwords and token-based sessions

## Screenshots

<table>
  <tr>
    <td align="center"><img src="./img/login.png" alt="Login page" /><br /><sub><b>Staff login</b></sub></td>
    <td align="center"><img src="./img/bill-gen.png" alt="Bill generator" /><br /><sub><b>Bill generator</b></sub></td>
  </tr>
  <tr>
    <td align="center"><img src="./img/cinfo.png" alt="Customer information" /><br /><sub><b>Customer information</b></sub></td>
    <td align="center"><img src="./img/payment_processing.png" alt="Payment processing" /><br /><sub><b>Payment processing</b></sub></td>
  </tr>
</table>

## Technical Highlights

- **Custom C++ backend.** I wrote the server, request handling, authentication, and database layer myself in C++ instead of using a web framework due to the lack of proper hardware. Code is split into separate modules for accounts, tokens, and database access.
- **Secure authentication.** Passwords are hashed with libsodium, and sessions use JWTs.
- **Security Audit.** I used burpsuite to conduct security test especially user athentication and authorization
- **Relational data model.** MariaDB tables for users, customer records, and payment history, accessed through MariaDB Connector/C++.
- **No frontend frameworks.** The UI is plain HTML, CSS, and JavaScript, which keeps it fast and easy for non-technical staff to use.
- **Debugging at the network level.** I used Wireshark to inspect and debug client-server traffic during development.

## Challenges & What I Learned

- **[Challenge 1]:** e.g. "Keeping bills to get made and print much faster, which i solved by providing a template in the browser thru html and css and printed directly from it"
- **[Challenge 2]:** e.g. "Keeping multiple users from breaking data when accessed at the same time, which i solved by utilizing mutex in concurrency concept"

- Lessons learned: 

## Impact



---

<sub>Source code is private to respect the client's customer data. Happy to walk through the code and architecture in an interview.</sub>