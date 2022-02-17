const { Op } = require('sequelize');
const { Department } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Department.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 리스트 조회
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}` }, // like검색, 포함된 걸 다 찾아줘
      };
    }

    // order by 정렬조건
    setQuery.order = [['id', 'ASC']];

    return new Promise((resolve, reject) => {
      Department.findAndCountAll({
        ...setQuery,
      })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 상세정보 조회
};

module.exports = dao;
