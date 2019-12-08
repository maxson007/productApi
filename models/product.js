const mongoose= require('mongoose');

    /**
     * name : le nom du produit, de type String
     * description : la description du produit, de type String
     * price : le prix du produit, de type Number
     * inStock : si le produit est en stock, de type Boolean
     */
const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
});

module.exports=mongoose.model('Product', productSchema);