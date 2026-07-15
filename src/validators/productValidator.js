import Joi from 'joi';

const productSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(3).max(300).required(),
    price: Joi.number().min(0).max(1000000).required(),
    category: Joi.string().valid('electronics', 'clothing', 'kitchen', 'beauty', 'books', 'sports', 'toys', 'grocery', 'other').required() 
});

const updateProductSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    description: Joi.string().min(3).max(300),
    price: Joi.number().min(0).max(1000000),
    category: Joi.string().valid('electronics', 'clothing', 'kitchen', 'beauty', 'books', 'sports', 'toys', 'grocery', 'other')
});

export { productSchema, updateProductSchema };