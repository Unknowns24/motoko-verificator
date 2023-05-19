import Result "mo:base/Result";

module {
  public type StudentProfile = {
    name : Text;
    team : Text;
    graduate : Bool;
    progress : Nat;
  };

  public type SubmitsResult = {
    day1 : Nat;
    day2 : Nat;
    day3 : Nat;
    day4 : Nat;
  };

  public type WorkProgressArgs = {
    day1 : [StudentProfile];
    day2 : [StudentProfile];
    day3 : [StudentProfile];
    day4 : [StudentProfile];
  };

  public type WorkProgress = {
    graduate: Bool;
    progress: Nat;
  };

  public type TestResult = Result.Result<(), TestError>;
  public type TestError = {
    #UnexpectedValue : Text;
    #UnexpectedError : Text;
  };
};
