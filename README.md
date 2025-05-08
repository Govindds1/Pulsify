# PulseGym Database Project

## Overview
PulseGym is a relational database designed to manage a gym's operations, including user accounts, memberships, trainers, workout sessions, equipment, payments, and attendance. The database is implemented in MySQL and includes 10 tables with well-defined relationships to support gym management tasks. This project includes SQL scripts for schema creation, data insertion, and a LaTeX-based Entity-Relationship (ER) diagram to visualize the database structure.

## Features
- **User Management**: Tracks users (admins, trainers, members) with roles and contact details.
- **Membership Management**: Supports various membership plans with durations and prices.
- **Workout Sessions**: Schedules sessions with trainers, equipment, and participant tracking.
- **Equipment Tracking**: Manages gym equipment with status and maintenance records.
- **Payments and Attendance**: Records member payments and gym check-ins/check-outs.
- **Trainer Assignments**: Assigns trainers to members for personalized training.
- **ER Diagram**: Provides a visual representation of the database schema using LaTeX.

## Database Schema
The PulseGym database consists of 10 tables with the following relationships:

### Tables
1. **Users**: Stores user information (user_id, first_name, last_name, email, password, role, phone, created_at).
2. **Memberships**: Defines membership plans (membership_id, type, duration, price).
3. **Members**: Links users to memberships and stores fitness goals (member_id, user_id, membership_id, membership_start_date, membership_end_date, emergency_contact, fitness_goals).
4. **Trainers**: Stores trainer details (trainer_id, user_id, specialty, certification, years_experience, available_days).
5. **Equipment**: Tracks gym equipment (equipment_id, name, type, purchase_date, last_maintenance, status).
6. **Workout_Sessions**: Schedules workout sessions (session_id, trainer_id, equipment_id, title, description, session_date, start_time, end_time, max_participants).
7. **Session_Participants**: Tracks session attendance (participant_id, session_id, member_id, attendance_status).
8. **Trainer_Assignments**: Assigns trainers to members (assignment_id, trainer_id, member_id, start_date, end_date, session_type, notes).
9. **Attendance**: Records gym check-ins (attendance_id, member_id, check_in, check_out, duration_minutes).
10. **Payments**: Tracks member payments (payment_id, member_id, amount, payment_date, method, status, invoice_number).

### Relationships
- **One-to-One**:
  - Users → Members (user_id)
  - Users → Trainers (user_id)
- **One-to-Many**:
  - Memberships → Members (membership_id)
  - Members → Attendance (member_id)
  - Members → Payments (member_id)
  - Trainers → Workout_Sessions (trainer_id)
  - Equipment → Workout_Sessions (equipment_id)
  - Members → Session_Participants (member_id)
  - Workout_Sessions → Session_Participants (session_id)
  - Trainers → Trainer_Assignments (trainer_id)
  - Members → Trainer_Assignments (member_id)
- **Many-to-Many**:
  - Members ↔ Workout_Sessions (via Session_Participants)
  - Trainers ↔ Members (via Trainer_Assignments)

## Prerequisites
- **MySQL**: Version 5.7 or later for database setup.
- **MySQL Client**: MySQL Workbench, DBeaver, or command-line client to execute SQL scripts.
- **LaTeX**: A LaTeX distribution (e.g., MiKTeX, TeX Live) or Overleaf for rendering the ER diagram.
- **LaTeX Packages**: Requires `tikz-er2` for ER diagram rendering.

## Installation and Setup
1. **Clone or Download the Project**
   - Download the project files, including SQL scripts and the LaTeX ER diagram code.
   - Alternatively, clone the repository (if hosted):  
     ```bash
     git clone <repository-url>
     ```

2. **Set Up MySQL Database**
   - Start your MySQL server.
   - Create the PulseGym database by running the schema SQL script:
     ```sql
     SOURCE PulseGym_Schema.sql;
     ```
     - This script creates the database and all 10 tables with foreign key constraints.
     - Ensure tables are created in the order specified to avoid foreign key errors.

3. **Populate the Database**
   - Insert sample data (50 records per table) using the INSERT SQL script:
     ```sql
     SOURCE PulseGym_Insert_Queries.sql;
     ```
     - The script includes 500 INSERT queries, ensuring foreign key consistency.
     - Execute after the schema is created to avoid dependency issues.
     - Note: Replace placeholder passwords (`hashed_passwordX`) with actual hashed passwords (e.g., using bcrypt) in a production environment.

4. **Render the ER Diagram**
   - Copy the LaTeX code from `PulseGym_ER_Diagram.tex` into a LaTeX editor (e.g., Overleaf).
   - Compile with PDFLaTeX to generate the ER diagram PDF.
   - Requirements:
     - LaTeX distribution with `tikz-er2` package.
     - No additional fonts or packages needed.
   - The diagram visualizes all tables, attributes, and relationships with crow's foot notation.

## Project Structure
