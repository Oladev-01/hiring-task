import { expect } from "chai";
import sinon from "sinon";
import httpStatus from "http-status";
import { getTodosHandler } from "./todo.controller";
import { todoService } from "../../services";

describe("getTodosHandler", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: {
        uuid: "user-uuid",
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    next = sinon.stub();
  });

  it("should return todos for the user with status 200", async () => {
    const todos = [{ id: 1, title: "Test Todo" }];
    const getTodosStub = sinon.stub(todoService, "getTodosByUserId").resolves(todos);

    await getTodosHandler(req, res, next);

    expect(getTodosStub.calledOnceWith("user-uuid")).to.be.true;
    expect(res.status.calledOnceWith(httpStatus.OK)).to.be.true;
    expect(res.json.calledOnceWith(todos)).to.be.true;

    getTodosStub.restore();
  });

  it("should return 404 if no todos are found", async () => {
    const getTodosStub = sinon.stub(todoService, "getTodosByUserId").resolves(null);

    await getTodosHandler(req, res, next);

    expect(getTodosStub.calledOnceWith("user-uuid")).to.be.true;
    expect(res.status.calledOnceWith(httpStatus.NOT_FOUND)).to.be.true;
    expect(res.json.calledOnceWith({ message: "Todos not found" })).to.be.true;

    getTodosStub.restore();
  });
});