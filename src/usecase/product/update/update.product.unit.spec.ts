import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";
const product = ProductFactory.create(
  "a","producta",123
);

const input = {
  id: product.id,
  name: "product Updated",
  price: 413  
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for Product update use case", () => {
  it("should update a Product", async () => {
    const ProductRepository = MockRepository();
    const ProductUpdateUseCase = new UpdateProductUseCase(ProductRepository);

    const output = await ProductUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
