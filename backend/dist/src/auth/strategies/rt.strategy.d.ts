import { Strategy } from 'passport-jwt';
declare const RtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class RtStrategy extends RtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        sub: any;
        email: any;
        role: any;
    }>;
}
export {};
