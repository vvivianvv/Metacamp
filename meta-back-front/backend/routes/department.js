const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const departmentService = require('../service/departmentService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`(department.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name) {
      // const err = new Error('Not allowed null (name)');
      // logger.error(err.toString());
      // res.status(500).json({ err: err.toString() });
      throw new Error('Not allowed null (name)');
    }
    // 비즈니스 로직 호출
    const result = await departmentService.reg(params);
    logger.info(`(department.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    logger.error(err.toString());
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
