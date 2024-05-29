export class NodeUtil {
  static toMs = {
    sec: (sec: number): number => sec * 1000,
    min: (min: number): number => min * 60000
  };

  static sleep = async (timeout: number) => { return new Promise(res => setTimeout(res, timeout)); };

  static wrapAsync = async <FN extends (...args: any) => any>(fn: FN, ...args: Parameters<FN>): Promise<ReturnType<FN>> => {
    return new Promise((res, reject) => { // await the fn call, no need for unnecessary awaits in inner
      try {
        return res(fn(...args));
      } catch (err) { return reject(err); }
    });
  };

  static extractErrorMessage = (err: Error): string => { return err.message; };
}