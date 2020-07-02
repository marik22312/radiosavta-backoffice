import Chance from "chance";

import { mockProgram } from "../../__tests__/mocks/data.mock";
import { ProgramsServiceMock } from "../../__tests__/mocks/services/base.service.mock";
import ProgramsStore from "./programs.store";

const chance = Chance();

describe("Program", () => {
  let programsServiceMock: any;
  let programsStore: ProgramsStore;
  beforeEach(() => {
    programsServiceMock = ProgramsServiceMock();
  });

  it("Should call fetchAll correctly", async () => {
    const program = mockProgram();

    programsServiceMock.getAllPrograms.mockResolvedValue([program]);

    programsStore = new ProgramsStore(programsServiceMock);

    const response = await programsStore.fetchAll();

    expect(programsServiceMock.getAllPrograms).toBeCalledTimes(1);
    expect(response).toStrictEqual([program]);
  });

  it("Should call fetchById correctly", async () => {
    const program = mockProgram();
    const programId = chance.guid();

    programsServiceMock.getProgramById.mockResolvedValue(program);

    programsStore = new ProgramsStore(programsServiceMock);

    const response = await programsStore.fetchById(programId);

    expect(programsServiceMock.getProgramById).toBeCalledTimes(1);
    expect(response).toStrictEqual(program);
  });

  it("Should get available users for program correctly", async () => {
    const programId = chance.guid();
    const userId = chance.guid();
    const users = [{ id: userId }];

    programsServiceMock.getAvailableUsersFor.mockResolvedValue({
      users,
    });

    programsStore = new ProgramsStore(programsServiceMock);

    const response = await programsStore.getAvailableUsers(programId);

    expect(programsServiceMock.getAvailableUsersFor).toBeCalledTimes(1);
    expect(response).toStrictEqual({ users });
  });
});
