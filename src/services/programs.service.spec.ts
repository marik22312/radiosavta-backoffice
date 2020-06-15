import { ProgramsService } from "./programs.service";

import Chance from "chance";

const chance = new Chance();

const apiServiceMock = () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
});

describe("Programs Service Tests", () => {
  let apiService: any;
  beforeEach(() => {
    apiService = apiServiceMock();
  });
  it("Should call base api service correctly", async () => {
    const programId = chance.integer();
    apiService.put.mockResolvedValue({
      data: {
        id: programId,
      },
    });
    const programsService = new ProgramsService(apiService);

    const program = await programsService.updateProgramById(programId, {});

    expect(apiService.put).toBeCalledWith(`/programs/${programId}`, {});
    expect(program.id).toBe(programId);
  });

  it("Should call disableProgram api service correctly", async () => {
    const programId = chance.integer();
    apiService.delete.mockResolvedValue({
      data: {
        id: programId,
      },
    });
    const programsService = new ProgramsService(apiService);

    const program = await programsService.disableProgram(programId);

    expect(apiService.delete).toBeCalledWith(`/programs/${programId}`);
    expect(program.id).toBe(programId);
  });

  it("Should call getAvailableUsersForProgram api service correctly", async () => {
    const programId = chance.guid();
    apiService.get.mockResolvedValue({
      data: {
        users: [{ id: programId }],
      },
    });
    const programsService = new ProgramsService(apiService);

    const program = await programsService.getAvailableUsersFor(programId);

    expect(apiService.get).toBeCalledWith(
      `/admin/programs/${programId}/availableUsers`
    );
    expect(program.users).toStrictEqual([{ id: programId }]);
  });
});
