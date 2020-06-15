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
  it("Should be a program", async () => {
    const program = mockProgram();
    let externalPromise: any;

    programsServiceMock.getAllPrograms.mockImplementation(
      () =>
        new Promise((res) => {
          externalPromise = res;
        })
    );

    programsStore = new ProgramsStore(programsServiceMock);

    expect(programsStore.isLoading).toBe(false);

    const response = programsStore.fetchAll();

    expect(programsStore.isLoading).toBe(true);

    externalPromise([program]);

    expect(programsServiceMock.getAllPrograms).toBeCalledTimes(1);
    expect(await response).toStrictEqual([program]);
    expect(programsStore.isLoading).toBe(false);
  });
});
