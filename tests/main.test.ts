import { RunRequest, ScriptModules } from "firebot-custom-scripts-types";
import { ArgumentsOf } from "ts-jest/dist/utils/testing";
import customScript from "../src/main";
test("main default export is the custom script", () => {
  expect(customScript).not.toBeUndefined();
  expect(customScript.run).not.toBeUndefined();
  expect(customScript.getScriptManifest).not.toBeUndefined();
  expect(customScript.getDefaultParameters).not.toBeUndefined();
});

test("run() calls logger.info with the message", async () => {
  const mockInfoLog = jest.fn<
    void,
    ArgumentsOf<ScriptModules["logger"]["info"]>
  >();
  const expectedMessage = "foobar";
  const runRequest = ({
    parameters: { message: expectedMessage },
    modules: { logger: { info: mockInfoLog } },
  } as unknown) as RunRequest<any>;

  await customScript.run(runRequest);

  expect(mockInfoLog.mock.calls.length).toBe(1);
  expect(mockInfoLog.mock.calls[0][0]).toBe(expectedMessage);
});
