const {
    Car
} = require("../models");
const CarController = require("../controllers/CarController");

describe("CarController", () => {
    // describe("#handleListCars", () => {
    //     it("should call res.status(201) and res.json with car instance", async () => {
    //         const name = "Hello";
    //         const price = 100000;
    //         const size = "Small";
    //         const image = "contoh.png";

    //         const mockRequest = {
    //             body: {
    //                 name,
    //                 price,
    //                 size,
    //                 image,
    //                 isCurrentlyRented: false,
    //             },
    //         };

    //         const car = new Car({
    //             name,
    //             price,
    //             size,
    //             image
    //         });
    //         const mockCarModel = {
    //             findAll: jest.fn().mockReturnValue(car)
    //         };

    //         const mockResponse = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn().mockReturnThis(),
    //         };

    //         const carController = new CarController({
    //             carModel: mockCarModel
    //         });

    //         await carController.handleListCars(mockRequest, mockResponse);

    //         expect(mockCarModel.findAll).toHaveBeenCalled();
    //         expect(mockResponse.status).toHaveBeenCalledWith(201);
    //         expect(mockResponse.json).toHaveBeenCalledWith(car);
    //     });

    //     it("should call res.status(404) and res.json with car instance", async () => {
    //         const err = new Error("Something");
    //         const name = "Hello";
    //         const price = 100000;
    //         const size = "Small";
    //         const image = "contoh.png";

    //         const mockRequest = {
    //             body: {
    //                 name,
    //                 price,
    //                 size,
    //                 image,
    //                 isCurrentlyRented: false,
    //             },
    //         };

    //         const mockCarModel = {
    //             findAll: jest.fn().mockReturnValue(Promise.reject(err)),
    //         };

    //         const mockResponse = {
    //             status: jest.fn().mockReturnThis(),
    //             json: jest.fn().mockReturnThis(),
    //         };

    //         const carController = new CarController({
    //             carModel: mockCarModel
    //         });

    //         await carController.handleListCars(mockRequest, mockResponse);

    //         expect(mockCarModel.findAll).toHaveBeenCalledWith({
    //             name,
    //             price,
    //             size,
    //             image,
    //             isCurrentlyRented: false,
    //         });
    //         expect(mockResponse.status).toHaveBeenCalledWith(422);
    //         expect(mockResponse.json).toHaveBeenCalledWith({
    //             error: {
    //                 name: err.name,
    //                 message: err.message,
    //             },
    //         });
    //     });
    // });

    // yg udah berhasil  
    describe("#handleCreateCar", () => {
        it("should call res.status(201) and res.json with car instance", async () => {
            const name = "Honda Jazz";
            const price = 154000;
            const size = "Medium";
            const image = "hondajazz.png";

            const mockRequest = {
                body: {
                    name,
                    price,
                    size,
                    image,
                    isCurrentlyRented: false,
                },
            };

            const car = new Car({
                name,
                price,
                size,
                image
            });
            const mockCarModel = {
                create: jest.fn().mockReturnValue(car)
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const carController = new CarController({
                carModel: mockCarModel
            });

            await carController.handleCreateCar(mockRequest, mockResponse);

            expect(mockCarModel.create).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(car);
        });

        it("should call res.status(422) and res.json with car instance", async () => {
            const err = new Error("Something");
            const name = "Honda Jazz";
            const price = 154000;
            const size = "Medium";
            const image = "hondajazz.png";

            const mockRequest = {
                body: {
                    name,
                    price,
                    size,
                    image,
                    isCurrentlyRented: false,
                },
            };

            const mockCarModel = {
                create: jest.fn().mockReturnValue(Promise.reject(err)),
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const carController = new CarController({
                carModel: mockCarModel
            });

            await carController.handleCreateCar(mockRequest, mockResponse);

            expect(mockCarModel.create).toHaveBeenCalledWith({
                name,
                price,
                size,
                image,
                isCurrentlyRented: false,
            });
            expect(mockResponse.status).toHaveBeenCalledWith(422);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: {
                    name: err.name,
                    message: err.message,
                },
            });
        });
    });
});