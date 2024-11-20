import request from "supertest";
import server from "../../server";

/*describe("Post /api/products", () => {
it("should create a new producto", async () => {
  const response = await request(server).post("/api/products/").send({
    name: "Mouse-testing",
    price: 29.8,
    units: 28,
  });

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("data");
  expect(response.body).not.toHaveProperty("msg");
});
it("should display error for add a new producto", async () => {
  const response = await request(server).post("/api/products/").send({});

  expect(response.status).toBe(400);
  expect(response.status).not.toBe(201);

  expect(response.body).not.toHaveProperty("data");
  expect(response.body).toHaveProperty("errors");
  expect(response.body.errors).toHaveLength(7);
  expect(response.body.errors).not.toHaveLength(5);
});
it("should display error fewer than 0 in units and negative price or cero for add a new producto", async () => {
  const response = await request(server).post("/api/products/").send({
    name: "Mouse-testing",
    price: 0,
    units: -200,
  });

  expect(response.status).toBe(400);
  expect(response.status).not.toBe(201);

  expect(response.body).not.toHaveProperty("data");
  expect(response.body).toHaveProperty("errors");
  expect(response.body.errors).toHaveLength(2);
  expect(response.body.errors).not.toHaveLength(5);
});
});*/
describe("GET /api/products", () => {
  it("GET a JSON reponse with products", async () => {
    const response = await request(server).get("/api/products/");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toHaveProperty("msg");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(6);
    expect(response.body.data).not.toHaveLength(2);
  });
});
describe("GET /api/products/:id", () => {
  it("Should retunr a 404 for products non-exist", async () => {
    const id = 20002;
    const response = await request(server).get(`/api/products/${id}`);

    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("msg");
  });
  it("Should return a error  for id invalid", async () => {
    const id = "hola";
    const response = await request(server).get(`/api/products/${id}`);

    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toHaveProperty("data");
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("Id inválido");

    //
  });
  it("Should return a product for id valid", async () => {
    const id = "hola";
    const response = await request(server).get(`/api/products/1`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    //
  });
});
describe("PUT /api/products/:id", () => {
  it("Should display validation error message when updating a product", async () => {
    const id = 20002;
    const response = await request(server).put(`/api/products/${id}`).send({});

    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toHaveProperty("data");
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(8);
    expect(response.body.errors).toBeTruthy();
    expect(response.status).not.toBe(404);
  });
  it("Should display validation error message when price is zero or negative", async () => {
    const id = 1;
    const response = await request(server).put(`/api/products/${id}`).send({
      name: "sss",
      price: -300,
      units: 28,
      availabity: true,
    });

    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toHaveProperty("data");
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors[0].msg).toBe("El precio debe ser mayor a cero");
  });
  it("Should display validation error message when url non-valide", async () => {
    const id = "hola";
    const response = await request(server).put(`/api/products/${id}`).send({
      name: "sss",
      price: 300,
      units: 28,
      availabity: true,
    });

    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toHaveProperty("data");
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors[0].msg).toBe("Id inválido");
  });
  it("Should display validation error message when id doesnt exist", async () => {
    const id = 2000;
    const response = await request(server).put(`/api/products/${id}`).send({
      name: "sss",
      price: 300,
      units: 28,
      availabity: true,
    });

    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).not.toHaveProperty("errors");

    expect(response.body.data).toHaveProperty("msg");

    expect(response.body.data.msg).toBe("Producto no encontrado");
  });
  it("Should display products when update rigth", async () => {
    const id = 1;
    const response = await request(server).put(`/api/products/${id}`).send({
      name: "sss",
      price: 300,
      units: 28,
      availabity: true,
    });

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).not.toHaveProperty("errors");

    expect(response.body.data).toHaveProperty("msg");

    expect(response.body.data.msg).toBe("Producto actualizado");
  });
});

describe("Delete /api/products/:id", () => {
  it("Validation doenst exist id", async () => {
    const id = 20002;
    const response = await request(server).delete(`/api/products/${id}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("msg");
    expect(response.body.data.msg).toBe("Producto no encontrado");
  });
  it("Validation  id", async () => {
    const id = "hola";
    const response = await request(server).delete(`/api/products/${id}`);
    expect(response.status).toBe(400);
    expect(response.body).not.toHaveProperty("data");
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("Id inválido");
  });
  it("Delete product", async () => {
    const id = 4;
    const response = await request(server).delete(`/api/products/${id}`);
    console.log(response.status);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).not.toHaveProperty("errors");
    expect(response.body.data).toHaveProperty("msg");
    expect(response.body.data.msg).toBe("Producto eliminado");
  });
});
