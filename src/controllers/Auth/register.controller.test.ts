import { expect } from "chai";
import sinon from "sinon";
import httpStatus from "http-status";
import { registerController } from "./register.controller";
import { userService } from "../../services";
import { encryptPassword } from "../../utils/encrypt";

describe("registerController", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      },
    };
    res = {
      json: sinon.stub().returnsThis(),
      status: sinon.stub().returnsThis(),
    };
    next = sinon.stub();
  });

  it("should create a new user and return 201 status", async () => {
    const hashPasswordStub = sinon.stub(encryptPassword, "encryptPassword").resolves("hashedPassword");
    const createUserStub = sinon.stub(userService, "createUser").resolves({
      id: 1,
      username: "testuser",
      email: "test@example.com",
      password: "hashedPassword",
    });

    await registerController(req, res, next);

    expect(hashPasswordStub.calledOnceWith("password123")).to.be.true;
    expect(createUserStub.calledOnceWith({
      username: "testuser",
      email: "test@example.com",
      password: "hashedPassword",
    })).to.be.true;
    expect(res.status.calledOnceWith(httpStatus.CREATED)).to.be.true;
    expect(res.json.calledOnceWith({
      user: {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: "hashedPassword",
      },
    })).to.be.true;

    hashPasswordStub.restore();
    createUserStub.restore();
  });
});