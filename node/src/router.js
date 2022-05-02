import { Router } from "express";
import { databaseClient } from "./database";

const router = Router();

router.get('/tb01', async (req, res) => {
  try {
    const databaseQuery = 'SELECT * FROM tb01 ORDER BY col_dt DESC LIMIT 10;';
    const { rows, rowCount } = await databaseClient.query(databaseQuery);

    return res.status(200).json({ data: rows, dataLength: rowCount, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', status: 500 });
  }
});

export { router }
