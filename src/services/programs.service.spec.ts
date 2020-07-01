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

  it("Shold call getRecordedShow api service correctyly", async () => {
    const name = chance.string();
    const duration = chance.string();
    const url = chance.string();
    const is_displayed = chance.bool();
    const recorded_at = chance.string();

    apiService.get.mockResolvedValue({
      data: {
        name,
        duration,
        url,
        is_displayed,
        recorded_at,
      },
    });
    const programsService = new ProgramsService(apiService);

    const program = await programsService.getRecordedShow(url);

    expect(apiService.get).toBeCalledWith(
      "/admin/programs/recordings/validate"
    );
    expect(name).toBe(name);
  });
});
