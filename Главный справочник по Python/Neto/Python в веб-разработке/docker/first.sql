CREATE TABLE IF NOT EXISTS first (
  id SERIAL PRIMARY KEY,
  fld VARCHAR(255),
  mark VARCHAR(255),
  nil VARCHAR(255)
);

INSERT INTO first (fld, mark, nil)
SELECT 'data', 'id', 'X20'
WHERE NOT EXISTS (SELECT 1 FROM first WHERE id = 20);
