import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "product",123);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a Product", async () => {
    const ProductRepository = MockRepository();
    const usecase = new FindProductUseCase(ProductRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "product",
      price: 123,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a Product", async () => {
    const ProductRepository = MockRepository();
    ProductRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(ProductRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
