export const idlFactory = ({ IDL }) => {
  const StudentProfile = IDL.Record({
    'graduate' : IDL.Bool,
    'name' : IDL.Text,
    'team' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const SubmitsResult = IDL.Record({
    'day1' : IDL.Nat,
    'day2' : IDL.Nat,
    'day3' : IDL.Nat,
    'day4' : IDL.Nat,
  });
  const Result_1 = IDL.Variant({ 'ok' : StudentProfile, 'err' : IDL.Text });
  const Verifier = IDL.Service({
    'addMyProfile' : IDL.Func([StudentProfile], [Result], []),
    'deleteMyProfile' : IDL.Func([], [Result], []),
    'getSubmits' : IDL.Func([], [SubmitsResult], ['query']),
    'imRegistered' : IDL.Func([], [IDL.Bool], []),
    'seeAProfile' : IDL.Func([IDL.Principal], [Result_1], ['query']),
    'seeMyProfile' : IDL.Func([], [Result_1], ['query']),
    'updateMyProfile' : IDL.Func([StudentProfile], [Result], []),
    'verifyWork' : IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
  });
  return Verifier;
};
export const init = ({ IDL }) => { return []; };
