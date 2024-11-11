const Product=require("./../db/product")

async function AddProduct(model) {
    let product=new Product({
        ...model
    })
    await product.save()
    return product.toObject()
}
async function updateProduct(id,model){
    await Product.findOneAndUpdate({_id:id},model)
    return;
}
async function deleteProduct(id){
    await Product.findByIdAndDelete(id)
    return;
}
async function getProducts(){
    let product= await Product.find()
     return product.map(c=>c.toObject());
 }
 async function getProductByid(id){
     let product= await Product.findById(id)
      return product.toObject();
  }
async function getNewProduct() {
    let newProducts= await Product.find({
        isNew:true
    })
    return newProducts.map(x=>x.toObject())
}
async function getFeaturedProduct() {
    let featuredProducts= await Product.find({
        isfeatured:true
    })
    return featuredProducts.map(x=>x.toObject())
}

async function getProductForListing(searchTerm, categoryId, brandId, sortBy, sortOrder, page, pageSize) {
    
    let queryFilter = {};

    // Add search term filter
    if (searchTerm) {
        queryFilter.$or = [
            { name: { $regex: searchTerm, $options: 'i' } },
            { shortDescription: { $regex: searchTerm, $options: 'i' } }
        ];
    }

    // Add category filter
    if (categoryId) {
        queryFilter.categoryId = categoryId; // Ensure this matches your schema
    }

    // Add brand filter
    if (brandId) {
        queryFilter.brandId = brandId; // Ensure this matches your schema
    }

    try {
        const sort = {};
        sort[sortBy] = sortOrder === 'price' ? -1 : 1; // Adjust sort based on sortOrder

        const products = await Product.find(queryFilter)
            .sort(sort) // Use the constructed sort object
            .skip((+page - 1) * +pageSize) // Pagination
            .limit(+pageSize)
            .exec();

        return products.map(product => product.toObject()); // Convert to plain object if using Mongoose
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
}




module.exports={AddProduct,updateProduct,deleteProduct,getProducts,getProductByid,getNewProduct,getFeaturedProduct,getProductForListing}