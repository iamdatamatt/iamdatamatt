CREATE TABLE unsubscribe_feedback (
    ip_address varchar(256),
    timestamp_utc timestamp,
    unsubscribe_reason varchar(256),
    other_feedback varchar(2048)
);