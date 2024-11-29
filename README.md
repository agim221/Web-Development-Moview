# Moview

## Project Description

Moview merupakan sebuah website yang didesain untuk membantu user mencari, menilai, dan mengomentari film. Terinspirasi dari IMDb, Moview memungkinkan user untuk mencari film, meninggalkan komentar, dan menambahkan film ke dalam daftar tontonan. Platform ini mendukung dua roles, yaitu:

- **Admin**: Dapat mengatur data film, data aktor, data negara, data award, dan data user.
- **User**: Dapat mencari film, memposting sebuah film, menambahkan film ke dalam daftar tontonan, dan memberi komentar.

## Installation

Untuk penginstalan aplikasi ini terdapat dua versi, yaitu penginstalan versi lokal dan versi Docker. Klik [di sini](https://github.com/agim221/Web-Development-Moview) untuk penginstalan versi lokal. Ikuti instruksi di bawah ini untuk penginstalan versi Docker:

### 1. Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)
- Laravel (v11) with passport installed
- PostgreSQL
- Python
- Docker

### 2. Create folder for project

- `mkdir moview`
- `cd moview`

### 3. Install Frontend

- Make sure you're in the folder project
- Clone Repository <br>
  `git clone https://github.com/agim221/Web-Development-Moview` <br>
  `cd Web-Development-Moview`
- Build image react
  `docker build -t react-app`

### 4. Install Backend

- Make sure you're in the folder project
- Clone Repository <br>
  `git clone https://github.com/agim221/Web-Development-Moview-Back-End` <br>
  `cd Web-Development-Moview-Back-End`
- Create environment <br>
  `cp .env.example .env`
- Configure your oauth and database settings in the .env file
- Build and run docker compose
  `docker-compose up --build -d`
- Enter bash laravel app
  `docker exec -it laravel-app bash`
- run laravel
  `php artisan serve --host:0.0.0.0`

## Features

1. Register and Login:
   - User dapat membuat akun dan melakukan login.
2. Mencari Film:
   - Gunakan bar pencarian untuk mencari film.
   - Gunakan filter bar untuk mencari film dengan spesifikasi tertentu.
3. Komentar:
   - Menambahkan komentar ke sebuah film.
4. Menambah Film:
   - User dapat menambahkan sebuah film dengan mengisi form "Add Movie".
5. Content Management System:
   - Admin dapat mengatur data-data film.
   - Admin dapat mengatur akun user.

## Credit

Author: Agim, Zahran

## References

- [Install docker]()
- [Setting OAuth](https://youtu.be/r8sVXy7lSTM?si=DGc_rI0c2GrWHTHD)
- [Setting env for database](https://medium.com/@erlandmuchasaj/laravel-env-5fe7f88bd256)
