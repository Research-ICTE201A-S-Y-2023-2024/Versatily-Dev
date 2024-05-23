CREATE DATABASE IF NOT EXISTS db_feedbacksystem;

-- drop database db_feedbacksystem;

USE db_feedbacksystem;

CREATE TABLE IF NOT EXISTS tbl_fs_forms (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    form_name VARCHAR(512),
    msforms_form_id VARCHAR(512),
    INDEX idx_msforms_form_id (msforms_form_id) 
);

CREATE TABLE IF NOT EXISTS tbl_fs_formresponses (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    msforms_form_id VARCHAR(512),
    msforms_response_id INT,
    submit_timestamp DATETIME,
    submit_respondent_email VARCHAR(512),
    submit_response_questions JSON,
    FOREIGN KEY (msforms_form_id) REFERENCES tbl_fs_forms(msforms_form_id)
);

-- DELETE FROM tbl_fs_forms;
-- ALTER TABLE tbl_fs_forms AUTO_INCREMENT = 1;
-- DELETE FROM tbl_fs_formresponses;
-- ALTER TABLE tbl_fs_formresponses AUTO_INCREMENT = 1;
