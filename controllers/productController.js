let DummyDataCache = [];

export const initCache = (data) => {
  DummyDataCache = data;
};

export const searchProducts = (req, res) => {
  try {
    let { q = "", limit = 10 } = req.query;
    q = q.toLowerCase();
    limit = parseInt(limit);

    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    }
    const searchData = DummyDataCache.filter((item) =>
      item.productName?.toLowerCase().includes(q)
    ).slice(0, limit);

    res.status(200).json({
      success: true,
      data: searchData,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process search request",
    });
  }
};

export const getAllProducts = (req, res) => {
  try {
    let { limit = 10 } = req.query;
    limit = parseInt(limit);

    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    }
    const products = DummyDataCache.slice(0, limit);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Data fetch error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch data",
    });
  }
};

export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const item = DummyDataCache.find((item) => item.id === id);
    if (!item) {
      return res.status(404).json({
        success: false,
        error: "Item not found",
      });
    }
    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error("Item fetch error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch item",
    });
  }
};

export const getTags = (req, res) => {
  try {
    const searchData = DummyDataCache.map((item) => item.tags);
    const categories = [...new Set(searchData)];
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Item fetch error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch tags",
    });
  }
};
