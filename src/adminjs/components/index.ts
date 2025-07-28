import { ComponentLoader } from "adminjs";

export const componentLoader = new ComponentLoader();

export const Components = {
  ProductImagesShow: componentLoader.add('ProductImagesShow', './ProductImagesShow'),
  ProductImagesEdit: componentLoader.add('ProductImagesEdit', './ProductImagesEdit')
}
