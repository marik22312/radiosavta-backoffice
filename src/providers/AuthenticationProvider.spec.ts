import { renderHook } from "@testing-library/react-hooks";
import { stubLoginV3 } from "../api/Auth.api.mock";
import {
  AuthenticaitonProvider,
  useAuthContext,
} from "./AuthenticationProvider";
import { chance } from "../../__tests__/chance";
import { LoginProvider } from "../domain/Auth";

describe.skip("AuthenticationProvider", () => {
  beforeEach(() => {
    stubLoginV3();
  });

  it("Should call loginV3 with correct credentials when preforming login", async () => {
    const { result } = renderHook(() => useAuthContext(), {
      wrapper: AuthenticaitonProvider,
    });

    const email = chance.email();
    const provider = chance.pickone(Object.values(LoginProvider));
    const spy = stubLoginV3();

    await result.current.login({
      email,
      provider,
    });

    expect(spy).toHaveBeenCalledWith({
      email,
      provider,
    });
  });
});
