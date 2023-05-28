const {
    Car
} = require("../models");
const CarController = require("../controllers/CarController");

describe("CarController", () => {
    describe("#handleListCars", () => {
        it("should call res.status(200) and res.json with list of task instances", async () => {
            const name = "Honda Jazz";
            const price = 154000;
            const size = "Medium";
            const image = "hondajazz.png";

            const mockRequest = {};

            const cars = [];

            for (let i = 0; i < 10; i++) {
                const car = new Car({
                    name,
                    price,
                    size,
                    image
                });
                cars.push(car);
            }

            const mockCarModel = {
                findAll: jest.fn().mockReturnValue(cars)
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const carController = new CarController({
                carModel: mockCarModel
            });

            await carController.handleListCars(mockRequest, mockResponse);

            expect(mockCarModel.findAll).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(cars);
        });
    });

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

    describe("#handleUpdateCar", () => {
        it("should call res.status(200) and res.json with Car instance", async () => {
            const name = "Toyota Rush";
            const price = 650000;
            const size = "Large";
            const image = "rush.png";

            const mockRequest = {
                params: {
                    id: 1,
                },
                body: {
                    name,
                    price,
                    size,
                    image,
                    isCurrentlyRented: false,
                },
            };

            const mockCar = new Car({
                name,
                price,
                size,
                image
            });
            mockCar.update = jest.fn().mockReturnThis();

            const mockCarModel = {};
            mockCarModel.findByPk = jest.fn().mockReturnValue(mockCar);

            const mockResponse = {};
            mockResponse.status = jest.fn().mockReturnThis();
            mockResponse.json = jest.fn().mockReturnThis();

            const carController = new CarController({
                carModel: mockCarModel
            });
            await carController.handleUpdateCar(mockRequest, mockResponse);

            expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
            expect(mockCar.update).toHaveBeenCalledWith({
                name,
                price,
                size,
                image,
                isCurrentlyRented: false,
            });
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockCar);
        });

        // it("should call res.status(422) and res.json with error instance", async () => {
        //     const err = new Error("Something");
        //     const name = "Toyota Rush";
        //     const price = 650000;
        //     const size = "Large";
        //     const image = "rush.png";

        //     const mockRequest = {
        //         params: {
        //             id: 2,
        //         },
        //         body: {
        //             name,
        //             price,
        //             size,
        //             image
        //         },
        //     };

        //     const mockCarModel = {

        //         findByPk : jest.fn(() => Promise.reject(err))
        //     };

        //     const mockResponse = {
        //         status : jest.fn().mockReturnThis(),
        //         json : jest.fn().mockReturnThis()
        //     };
            

        //     const carController = new CarController({
        //         carModel: mockCarModel
        //     });
        //     await carController.handleUpdateCar(mockRequest, mockResponse);

        //     expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
        //     expect(mockResponse.status).toHaveBeenCalledWith(422);
        //     expect(mockResponse.json).toHaveBeenCalledWith({
        //         error: {
        //             name: err.name,
        //             message: err.message,
        //         },
        //     });
        // });
    });
});