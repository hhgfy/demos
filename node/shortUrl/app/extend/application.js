'use strict';

module.exports = {
  errCode: {
    success: { code: 0, msg: 'success' },
    unAuthorized: { code: 401, desc: '需要登录后访问' },
    forbidden: { code: 403, desc: '无访问权限' },
    notFound: { code: 404, desc: '资源不存在' },
    paramError: { code: 422, desc: '参数校验错误' },
    internalServerError: { code: 500, desc: '服务器内部错误' },
  },
};
