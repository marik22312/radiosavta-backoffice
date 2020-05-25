	import Chance from "chance";

	import { mockUser } from "../../__tests__/mocks/data.mock";
	import {
	UsersServiceMock
	} from "../../__tests__/mocks/services/base.service.mock";
	import UsersStore from "./users.store";

	describe("Users Store", () => {
	const chance = Chance();

	describe("User", () => {
		it("Should be a user", async () => {
			
		const user = mockUser();
		let externalPromise: any;

		const usersServiceMock = new UsersServiceMock();
		usersServiceMock.getAllUsers.mockImplementation(() => new Promise(res => {
			externalPromise = res;
		}));

		const usersStore = new UsersStore(usersServiceMock);

		expect(usersStore.isLoading).toBe(false);

		const response = usersStore.fetchAllUsers();

		expect(usersStore.isLoading).toBe(true);

		externalPromise([user]);
		
		expect(usersServiceMock.getAllUsers).toBeCalledTimes(1);
		expect(await response).toStrictEqual([user]);
		expect(usersStore.isLoading).toBe(false);
		});
	});
	});
