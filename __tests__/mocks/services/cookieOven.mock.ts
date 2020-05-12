import { ICookieOven } from "../../../src/services/CookieOven";

export const CookieOvenMock = (): ICookieOven => ({
  clear: jest.fn(),
  bakeCookie: jest.fn(),
  eatCookie: jest.fn(),
});
