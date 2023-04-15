/**
 * @swagger
 * /users:
 *   get:
 *     summary: return all user's data
 *     parameters:
 *          - in: query
 *            name: user's data
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
 *                          email:
 *                              type: string
 *                              example: 111@gmail.com
 *                          name:
 *                              type: string
 *                              example: 작성자1
 *                          phone:
 *                              type: string
 *                              example: 010-1111-1111
 *                          personal:
 *                              type: string
 *                              example: 220110-1111111
 *                          prefer:
 *                              type: string
 *                              example: https://naver.com/1
 */