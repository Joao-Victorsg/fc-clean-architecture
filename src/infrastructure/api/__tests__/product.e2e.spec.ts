import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true});
    })


afterAll(async () => {
    await sequelize.close();
});

it("should create a product",async () => {
    const response = await request(app)
        .post("/product")
        .send({
            type: "a",
            name: "Product1",
            price: 123,
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product1");
        expect(response.body.price).toBe(123);
});

it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product1",
    });
    expect(response.status).toBe(500);
  });

it("shoulçd list all products",async () => {
    
    const response = await request(app)
        .post("/product")
        .send({
            type: "a",
            name: "Product1",
            price: 123,
        });

    expect(response.status).toBe(200);
    
    const response2 = await request(app)
        .post("/product")
        .send({
            type: "a",
            name: "Product2",
            price: 321
        });
    expect(response.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product1");
    expect(product.price).toBe(123);

    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product2");
    expect(product2.price).toBe(321);

    const listResponseXML = await request(app)
    .get("/product")
    .set("Accept","application/xml")
    .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product1</name>`);
    expect(listResponseXML.text).toContain(`<price>123</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product2</name>`);
    expect(listResponseXML.text).toContain(`<price>321</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
});

});