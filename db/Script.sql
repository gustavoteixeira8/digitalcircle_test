CREATE TABLE TB01 (
	id SERIAL PRIMARY KEY,
	col_text TEXT,
	col_dt TIMESTAMP
);

insert into tb01 (col_text, col_dt) values ('Olá mundo 2', now());

select * from tb01 t;

delete from tb01 where tb01.id = 2;