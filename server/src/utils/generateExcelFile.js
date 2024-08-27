import ExcelJs from "exceljs";

export const generateExcelFile = async (products) => {
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet("Products");

  worksheet.columns = [
    {
      header: "ID",
      key: "_id",
      width: "30",
    },
    {
      header: "Name",
      key: "name",
      width: "30",
    },
    {
      header: "Image URL",
      key: "image",
      width: "50",
    },
    {
      header: "Price",
      key: "price",
      width: "30",
    },
    {
      header: "Category",
      key: "category",
      width: "30",
    },
  ];

  products.forEach((product) => {
    worksheet.addRow({
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return buffer;
};
