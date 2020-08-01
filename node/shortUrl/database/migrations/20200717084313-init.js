'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    await queryInterface.createTable('url', {
      shortUrl: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        comment: '短链',
      },
      longUrl: {
        type: STRING(2100),
        allowNull: false,
        comment: '原链接',
      },
      visit: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '访问次数',
      },
      createdAt: {
        type: DATE,
        comment: '创建时间',
      },
      updatedAt: {
        type: DATE,
        comment: '更新时间',
      },
    }, {
      comment: 'url映射表',
      freezeTableName: true,
      timestamps: true,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('url');
  },
};
