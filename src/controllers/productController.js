import Product from '../models/Product.js';
import { AppError } from '../utils/AppError.js';
import cloudinary from '../config/cloudinary.js';

const addProduct = async (req, res, next) => {
    try {   
        const productImage = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'productImages' },
                (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(req.file.buffer);
        });

        const { name, description, price, category } = req.body;
        const product = new Product({ name, description, price, category, createdBy: req.user.userId });

        product.image = {
            url: productImage.secure_url,
            publicId: productImage.public_id
        };

        await product.save();

        return res.status(201).json({
            message: 'Product added',
            product
        });
    }
    catch(error) {
        next(error);
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);

        const totalDocs = await Product.countDocuments();

        return res.status(200).json({
            totalDocs,
            page,
            totalPages: Math.ceil(totalDocs/limit),
            products
        });
    }
    catch(error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if(!product) {
            throw new AppError(`No product with ID: ${id}`, 404);
        }

        return res.status(200).json(product);
    }
    catch(error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existingProduct = await Product.findById(id);

        if(!existingProduct) {
            throw new AppError(`No product with ID: ${id}`, 404);
        }

        const updateData = { ...req.body };

        if(req.file) {
            const productImage = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'productImages' }, 
                    (error, result) => {
                        if(error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer);
            });

            if(existingProduct.image?.publicId) {
                await cloudinary.uploader.destroy(existingProduct.image.publicId);
            }

            updateData.image = {
                url: productImage.secure_url,
                publicId: productImage.public_id
            };
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { returnDocument: 'after', runValidators: true });

        return res.status(200).json({
            message: 'Product updated successfully', 
            product: updatedProduct
        });
    }
    catch(error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if(!product) {
            throw new AppError(`No product with ID: ${id}`, 404);
        }

        if(product.image?.publicId) {
            await cloudinary.uploader.destroy(product.image.publicId);
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Product deleted successfully',
            product
        });
    }
    catch(error) {
        next(error);
    }
};

export { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
