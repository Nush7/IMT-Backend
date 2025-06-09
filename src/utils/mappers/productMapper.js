/**
 * Converts a Mongoose Product document to API response DTO
 * @param {Object} productDocument - Mongoose Product document
 * @returns {Object|null} - Product response DTO
 */
exports.toProductResponseDTO = (productDocument) => {
    if (!productDocument) {
        return null;
    }

    return {
        id: productDocument._id.toString(),
        name: productDocument.name,
        type: productDocument.type,
        sku: productDocument.sku,
        imageUrl: productDocument.image_url, // Rename for consistent camelCase
        description: productDocument.description,
        quantity: productDocument.quantity,
        price: productDocument.price,
        createdAt: productDocument.createdAt?.toISOString(),
        updatedAt: productDocument.updatedAt?.toISOString(),
    };
};

/**
 * Converts array of Mongoose Product documents to API response DTOs
 * @param {Array} productDocuments - Array of Mongoose Product documents
 * @returns {Array} - Array of Product response DTOs
 */
exports.toProductListResponseDTO = (productDocuments) => {
    if (!productDocuments || !Array.isArray(productDocuments)) {
        return [];
    }

    return productDocuments
        .filter(doc => doc != null) // Filter out any null/undefined documents
        .map(doc => exports.toProductResponseDTO(doc))
        .filter(dto => dto != null); // Filter out any failed mappings
};

/**
 * Prepares request data for creating/updating Product model
 * @param {Object} requestDTO - Request data from API
 * @returns {Object} - Data ready for Mongoose operations
 */
exports.toProductModelData = (requestDTO) => {
    const modelData = {
        name: requestDTO.name,
        type: requestDTO.type,
        sku: requestDTO.sku,
        description: requestDTO.description,
        quantity: requestDTO.quantity || 0,
        price: requestDTO.price,
    };

    // Handle imageUrl -> image_url conversion
    if (requestDTO.imageUrl) {
        modelData.image_url = requestDTO.imageUrl;
    } else if (requestDTO.image_url) {
        modelData.image_url = requestDTO.image_url;
    }

    return modelData;
};
