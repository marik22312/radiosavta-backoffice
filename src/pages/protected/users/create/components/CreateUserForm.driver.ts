import { fireEvent, RenderResult, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";

class InputDriver {
  constructor(
    private readonly opts: { wrapper: RenderResult; testId: string }
  ) {}

  private get baseElement() {
    return this.opts.wrapper.getByTestId(this.opts.testId) as HTMLInputElement;
  }

  public setValue(value: string) {
    return fireEvent.input(this.baseElement, {
      target: {
        value,
      },
    });
  }

  public getValue() {
    return this.baseElement.value;
  }
}

export class CreateUserFormDriver {
  constructor(private readonly container: RenderResult) {}

  public get nameInput() {
    const driver = new InputDriver({
      wrapper: this.container,
      testId: "name-input",
    });

    return {
      setValue: (value: string) => {
        return driver.setValue(value);
      },
      getValue: () => driver.getValue(),
    };
  }
  public get emailInput() {
    const driver = new InputDriver({
      wrapper: this.container,
      testId: "email-input",
    });

    return {
      setValue: (value: string) => {
        return driver.setValue(value);
      },
      getValue: () => driver.getValue(),
    };
  }
  public get locationInput() {
    const driver = new InputDriver({
      wrapper: this.container,
      testId: "location-input",
    });

    return {
      setValue: (value: string) => {
        return driver.setValue(value);
      },
      getValue: () => driver.getValue(),
    };
  }
  public get streamerUsername() {
    const driver = new InputDriver({
      wrapper: this.container,
      testId: "streamer-username-input",
    });

    return {
      setValue: (value: string) => {
        return driver.setValue(value);
      },
      getValue: () => driver.getValue(),
    };
  }

  public get submitButton() {
    const driver = this.container.getByTestId("submit-button");
    return {
      click: () => driver.click(),
    };
  }

  public get imageInput() {
    const driver = this.container.getByTestId("picture-input");

    return {
      selectFile: async (file: File) => {
        act(() => {
          userEvent.upload(driver, file);
        });
        await waitFor(() => this.container.getByTestId("profile-image"));
      },
    };
  }

  public debug() {
    this.container.debug();
  }
}
