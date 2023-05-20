import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : StudentProfile } |
  { 'err' : string };
export interface StudentProfile {
  'cli' : string,
  'graduate' : boolean,
  'name' : string,
  'team' : string,
  'progress' : bigint,
}
export interface SubmitsResult {
  'day1' : bigint,
  'day2' : bigint,
  'day3' : bigint,
  'day4' : bigint,
}
export interface Verifier {
  'addMyProfile' : ActorMethod<[StudentProfile], Result>,
  'deleteMyProfile' : ActorMethod<[], Result>,
  'getDaysSubmits' : ActorMethod<[], SubmitsResult>,
  'imRegistered' : ActorMethod<[], boolean>,
  'seeAProfile' : ActorMethod<[Principal], Result_1>,
  'seeMyProfile' : ActorMethod<[], Result_1>,
  'updateMyProfile' : ActorMethod<[StudentProfile], Result>,
  'verifyWork' : ActorMethod<[string, bigint], Result>,
}
export interface _SERVICE extends Verifier {}
