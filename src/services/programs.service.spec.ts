import {
  ProgramsService,
  ValidateRecordedShowResponse,
} from "./programs.service";

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
    const userId = chance.integer();
    apiService.post.mockResolvedValue({
      data: {},
    });
    const programsService = new ProgramsService(apiService);

    await programsService.addUserToShow(programId, userId);

    expect(
      apiService.post
    ).toBeCalledWith(`/admin/programs/${programId}/availableUsers`, { userId });
  });

  it("Should call ValidateRecordedShow api service correctly", async () => {
    const url = chance.url();
    apiService.post.mockResolvedValue({
      data: {},
    });
    const programsService = new ProgramsService(apiService);

    await programsService.ValidateRecordedShow(url);

    expect(
      apiService.post
    ).toBeCalledWith(`/admin/programs/recordings/validate`, { url });
  });

  it("Should call AddRecordedShow api service correctly", async () => {
    const programId = chance.integer({ min: 0 });
    const recordedShow: ValidateRecordedShowResponse = {
      url: chance.url(),
      name: chance.name(),
      recorded_at: chance.string(),
      duration: chance.string(),
      is_displayed: true,
    };
    apiService.post.mockResolvedValue({
      data: {},
    });
    const programsService = new ProgramsService(apiService);

    await programsService.createRecordedShow(programId, recordedShow);

    expect(apiService.post).toBeCalledWith(
      `/admin/programs/${programId}/recordings`,
      recordedShow
    );
  });
});
