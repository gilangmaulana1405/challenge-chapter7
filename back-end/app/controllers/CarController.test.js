const {
    Car
} = require("../models");
const CarController = require("./CarController");

describe("CarController", () => {
    describe("#handleListCars", () => {
        it("should call res.status(200) and res.json with list of task instances", async () => {
            const name = "Honda Jazz";
            const price = 154000;
            const size = "Medium";
            const image = "hondajazz.png";

            const mockRequest = {
                query: {
                    page: 1,
                    pageSize: 10
                }
            };

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
                findAll: jest.fn().mockReturnValue(cars),
                count: jest.fn().mockReturnValue(10)
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const carController = new CarController({
                carModel: mockCarModel
            });

            await carController.handleListCars(mockRequest, mockResponse);

            expect(mockCarModel.findAll).toHaveBeenCalledWith({
                where: {},
                include: {
                    model: undefined,
                    as: 'userCar',
                    required: false
                },
                offset: 0,
                limit: 10,
            });
            expect(mockCarModel.count).toHaveBeenCalledWith({
                where: {},
                include: {
                    model: undefined,
                    as: 'userCar',
                    required: false
                }
            })
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                cars,
                meta: {
                    pagination: {
                        page: 1,
                        pageSize: 10,
                        count: 10,
                        pageCount: 1
                    }
                }
            });
        });
    });

    describe("#handleGetCar", () => {
        it('should call res.status(200) and res.json with car instance', async () => {
            const name = "Honda Jazz";
            const price = 154000;
            const size = "Medium";
            const image = "hondajazz.png";

            const mockRequest = {
                params: {
                    id: 1
                }
            }

            const mockCar = new Car({
                name,
                price,
                size,
                image
            })
            const mockCarModel = {
                findByPk: jest.fn().mockResolvedValue(mockCar)
            }

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }


            const carController = new CarController({
                carModel: mockCarModel
            })
            await carController.handleGetCar(mockRequest, mockResponse)

            expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockCar);
        });
    })

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
            const err = new Error("Something Error Create");

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

        it("should call res.status(422) and res.json with error instance", async () => {
            const err = new Error("Something");

            const mockRequest = {
                body: {},
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };


            const carController = new CarController({});
            carController.getCarFromRequest = jest.fn().mockImplementation(() => {
                throw err
            })
            await carController.handleUpdateCar(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(422);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: {
                    name: err.name,
                    message: err.message,
                },
            });
        });
    });

    describe("#handleDeleteCar", () => {
        it('should call carModel.destroy and res.status(204)', async () => {
            const mockRequest = {
                params: {
                    id: 1
                }
            }

            const mockDestroy = jest.fn()

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                end: jest.fn()
            }

            const carController = new CarController({
                carModel: {
                    destroy: mockDestroy
                }
            })

            await carController.handleDeleteCar(mockRequest, mockResponse)

            expect(mockDestroy).toHaveBeenCalledWith(mockRequest.params.id)
            expect(mockResponse.status).toHaveBeenCalledWith(204)
            expect(mockResponse.end).toHaveBeenCalled()
        })
    })

    describe("getCarFromRequest", () => {
        it("should Get a car by pk", () => {
            const mockCar = new Car({
                id: 1,
                name: "Honda Jazz",
                price: "198000",
                size: "Medium",
                image: "hondajazz.png",
            });

            mockCarModel = {
                findByPk: jest.fn().mockReturnValue(mockCar),
            };

            const mockRequest = {
                params: {
                    id: 1,
                },
            };

            const carController = new CarController({
                carModel: mockCarModel,
            });

            const car = carController.getCarFromRequest(mockRequest);

            expect(car).toEqual(mockCar);
        });
    });
});