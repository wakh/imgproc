import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption
} from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.JasmineDoneInfo;

/** Class representing a Custom Processor */
class CustomProcessor extends DisplayProcessor {
  /**
   * Display Logs Result
   * @param {SuiteInfo} info - Information about the full Jasmine suite
   * @param {string} log - Results
   * @return {string} Return results
   */
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor]
  }) as jasmine.CustomReporter
);
