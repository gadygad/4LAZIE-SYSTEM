-- =============================================
-- SCRIPT YA KUTENGENEZA DATABASE NA USER
-- Endesha kwa: sudo mysql < setup_mysql.sql
-- =============================================

-- 1. Tengeneza database
CREATE DATABASE IF NOT EXISTS `4lazie_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- 2. Tengeneza user maalum (salama, sio root)
CREATE USER IF NOT EXISTS '4lazie_user'@'localhost' IDENTIFIED BY '4lazie_pass_2024';

-- 3. Weka ruhusa
GRANT ALL PRIVILEGES ON `4lazie_db`.* TO '4lazie_user'@'localhost';

-- 4. Tekeleza mabadiliko
FLUSH PRIVILEGES;

-- 5. Thibitisha
SHOW DATABASES LIKE '4lazie_db';
SELECT User, Host FROM mysql.user WHERE User = '4lazie_user';

SELECT 'DATABASE IMEUNDWA VIZURI!' AS status;
