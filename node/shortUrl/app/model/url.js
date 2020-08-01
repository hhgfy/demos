'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  const Url = app.model.define('url', {
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
  }, {
    comment: 'url映射表',
    freezeTableName: true,
    underscored: false,
  });

  return Url;
};
