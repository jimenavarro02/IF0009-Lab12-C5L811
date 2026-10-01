# Laboratorio 12: Proyecto Full-Stack Autónomo (Expansión TechConf)

## Información General
* **Curso:** IF0009 - Desarrollo de Software IV[cite: 1]
* **Institución:** Universidad de Costa Rica - Sede del Atlántico (Recinto Paraíso)[cite: 1]
* **Semestre:** II-2026[cite: 1]
* **Profesor:** Mag. Jonathan Granados C.[cite: 1]

---

## Descripción del Proyecto
Este proyecto consiste en la expansión full-stack del sistema de gestión de conferencias **TechConf**[cite: 1]. La plataforma permite administrar charlas y registrar asistentes mediante una arquitectura distribuida compuesta por un backend en Spring Boot y un frontend en Angular con formularios reactivos y validaciones personalizadas[cite: 1, 2, 3].

---

## Tecnologías Utilizadas

* **Back-End:** Java 17+, Spring Boot, Spring Data JPA, H2 Database[cite: 1]
* **Front-End:** Angular CLI 18+, Reactive Forms, RxJS[cite: 1, 2]
* **Control de Versiones:** Git & GitHub[cite: 1]

---

## Estructura del Proyecto

```text
├── expresofast-backend/
│   ├── src/main/java/com/expresofast/
│   │   ├── controller/      # Endpoints REST (CharlaController)
│   │   ├── model/           # Entidades JPA (Charla, Asistente)
│   │   └── repository/      # Repositorios Spring Data JPA
│   └── src/main/resources/
│       ├── application.properties
│       └── data.sql         # Carga inicial de datos
├── expresofast-frontend/
│   ├── src/app/
│   │   ├── components/      # Componentes UI (CharlaList)
│   │   ├── models/          # Interfaces TypeScript
│   │   ├── services/        # Consumo de API REST
│   │   └── validators/      # Validador personalizado (>18 años)
└── docs/
    └── error_recursion.png  # Captura de pantalla de la traza de error