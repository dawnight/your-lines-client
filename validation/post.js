import Joi from 'joi';

export default {
  postLines: {
    options: {
      allowUnknownBody: true,
      body: {
        nameOrigin: Joi.string().required().regex(/{1, 20}/),
        nameCn: Joi.string().required().regex(/{1, 20}/),
        areaId: Joi.string().required().regex(/{1, 20}/),
        linesLangId: Joi.string().required().regex(/{1, 20}/),
        linesText: Joi.string().required().regex(/{1, 1024}/),
        transLangId: Joi.string().required().regex(/{1, 20}/),
        transText: Joi.string().required().regex(/{1, 1024}/),
      }
    }
  }
};
