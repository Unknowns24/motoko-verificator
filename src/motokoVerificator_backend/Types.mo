import Result "mo:base/Result";

module {
  public type StudentProfile = {
    name : Text;
    team : Text;
    graduate : Bool;
  };

  public type SubmitsResult = {
    day1 : Nat;
    day2 : Nat;
    day3 : Nat;
    day4 : Nat;
  };


  public type TestResult = Result.Result<(), TestError>;
  public type TestError = {
    #UnexpectedValue : Text;
    #UnexpectedError : Text;
  };
};
