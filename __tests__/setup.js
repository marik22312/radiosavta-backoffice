jest.setTimeout(30000);

global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });

  Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
	  matches: false,
	  media: query,
	  onchange: null,
	  addListener: jest.fn(), // deprecated
	  removeListener: jest.fn(), // deprecated
	  addEventListener: jest.fn(),
	  removeEventListener: jest.fn(),
	  dispatchEvent: jest.fn(),
	})),
  });

  global.URL.createObjectURL = jest.fn(() => "details");