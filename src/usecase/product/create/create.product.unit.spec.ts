import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "a",
    name: "produtoA",
    price: 12
}

const input2 = {
    type: "b",
    name: "produtoB",
    price: 12
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create product use case", () => {
    it("should create a product of type a",async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
                id: expect.any(String),
                name: input.name,
                price: input.price,
            });
    });

    it("should create a product of type b",async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input2);

        expect(output).toEqual({
                id: expect.any(String),
                name: input2.name,
                price: input2.price*2,
            });
    });

    it("should thrown an error when name is missing",async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should thrown an error when price is lesser than zero",async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        
        input.name="productA"
        input.price = -1;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });
    
})