/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: return all coffee
 *     parameters:
 *          - in: query
 *            name: coffee
 *            type: array
 *     responses:
 *       200:
 *         description: find seccess!
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: 핫 아메리카노
 *                          kcal:
 *                              type: int
 *                              example: 5
 */