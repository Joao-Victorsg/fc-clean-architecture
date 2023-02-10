import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";
const Product1 = ProductFactory.create("a","producta",123);

const Product2 = ProductFactory.create("b","productb",321);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([Product1, Product2])),
  };
};

describe("Unit test for listing Product use case", () => {
  it("should list a Product", async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(Product1.id);
    expect(output.products[0].name).toBe(Product1.name);
    expect(output.products[0].price).toBe(Product1.price);
    expect(output.products[1].id).toBe(Product2.id);
    expect(output.products[1].name).toBe(Product2.name);
    expect(output.products[1].price).toBe(Product2.price);
  });
});
