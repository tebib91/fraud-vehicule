const app = require("../server");
const supertest = require("supertest");

describe("arnaque api", () => {
    test("POST /api/arnaque correct listing", async () => {
        const vehicule = {
            contacts: {
                firstName: "Christophe",
                lastName: "Dupont",
                email: "restdepot77****@yopmail.fr"

            },
            price: 37000,
            vehicule: {
                "registerNumber": "AA123AAa"
            }
        };

        await supertest(app).post("/api/arnaque")
            .send(vehicule)
            .expect(200)
            .then((response) => {
                expect(typeof response.body === "object").toBeTruthy();
                expect(Object.keys(response.body).length).toEqual(3);
            });
    });

    test("POST /api/arnaque bad price", async () => {
        const vehicule = {
            contacts: {
                firstName: "Christophe",
                lastName: "Dupont",
                email: "restdepot77****@yopmail.fr"

            },
            price: 17000,
            vehicule: {
                "registerNumber": "AA123AAa"
            }
        };

        await supertest(app).post("/api/arnaque")
            .send(vehicule)
            .expect(200)
            .then((response) => {
                expect(typeof response.body === "object").toBeTruthy();
                expect(Object.keys(response.body).length).toEqual(3);
                expect(response.body.rules).toContain('rule::price::quotation_rate');
            });
    });

    test("POST /api/arnaque bad immatriculation", async () => {
        const vehicule = {
            contacts: {
                firstName: "Christophe",
                lastName: "Dupont",
                email: "restdepot77****@yopmail.fr"

            },
            price: 37000,
            vehicule: {
                "registerNumber": "AA123AA"
            }
        };

        await supertest(app).post("/api/arnaque")
            .send(vehicule)
            .expect(200)
            .then((response) => {
                expect(typeof response.body === "object").toBeTruthy();
                expect(Object.keys(response.body).length).toEqual(3);
                expect(response.body.rules).toContain('rule::registernumber::blackList');
            });
    });

    test("POST /api/arnaque bad firstname and lastName", async () => {
        const vehicule = {
            contacts: {
                firstName: "C",
                lastName: "D",
                email: "restdepot77****@yopmail.fr"

            },
            price: 37000,
            vehicule: {
                "registerNumber": "AA123AAa"
            }
        };

        await supertest(app).post("/api/arnaque")
            .send(vehicule)
            .expect(200)
            .then((response) => {
                expect(typeof response.body === "object").toBeTruthy();
                expect(Object.keys(response.body).length).toEqual(3);
                expect(response.body.rules).toContain('rule::firstname::length');
                expect(response.body.rules).toContain('rule::lastname::length');
            });
    });

    test("POST /api/arnaque bad alpha rate", async () => {
        const vehicule = {
            contacts: {
                firstName: "Ccccc",
                lastName: "Dddddd",
                email: "r*******@yopmail.fr"

            },
            price: 37000,
            vehicule: {
                "registerNumber": "AA123AAa"
            }
        };

        await supertest(app).post("/api/arnaque")
            .send(vehicule)
            .expect(200)
            .then((response) => {
                expect(typeof response.body === "object").toBeTruthy();
                expect(Object.keys(response.body).length).toEqual(3);
                expect(response.body.rules).toContain('rule::alpha_rate');
            });
    });

    test("POST /api/arnaque bad number rate", async () => {
        const vehicule = {
            contacts: {
                firstName: "C",
                lastName: "D",
                email: "r33333@yopmail.fr"

            },
            price: 37000,
            vehicule: {
                "registerNumber": "AA123AAa"
            }
        };

        await supertest(app).post("/api/arnaque")
            .send(vehicule)
            .expect(200)
            .then((response) => {
                expect(typeof response.body === "object").toBeTruthy();
                expect(Object.keys(response.body).length).toEqual(3);
                expect(response.body.rules).toContain('rule::number_rate');
            });
    });
})
